const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const { protect, requireRole } = require('../middleware/auth');
  const {
  hasFrontendTracks,
  lmsProgressPercent,
  isChapterUnlocked,
  canPickTrack,
  pathComplete,
  issueCertificateId,
  sanitizeChapter,
  buildOutline,
  sharedComplete
} = require('../utils/lms');

const legacyProgressPercent = (enrollment, moduleCount) => {
  if (!moduleCount) return 0;
  const completed = (enrollment.progress || []).filter((p) => p.completed && p.moduleIndex != null).length;
  return Math.round((completed / moduleCount) * 100);
};

const loadStudentEnrollment = async (userId, slug) => {
  const course = await Course.findOne({ slug });
  if (!course) return { error: { status: 404, message: 'Course not found' } };

  const enrollment = await Enrollment.findOne({
    student: userId,
    course: course._id,
    status: { $ne: 'revoked' }
  }).populate('course');

  if (!enrollment) {
    return { error: { status: 404, message: 'You are not enrolled in this course' } };
  }

  return { course, enrollment };
};

const enrollmentPayload = (enrollment, course) => {
  const hasLms = Array.isArray(course.chapters) && course.chapters.length > 0;
  const percent = hasLms
    ? lmsProgressPercent(course, enrollment)
    : legacyProgressPercent(enrollment, course.syllabus?.length || 0);

  const base = {
    ...enrollment.toObject(),
    progressPercent: percent,
    hasLms,
    canPickTrack: hasLms ? canPickTrack(course, enrollment) : false,
    sharedComplete: hasLms ? sharedComplete(course, enrollment) : false,
    pathComplete: hasLms ? pathComplete(course, enrollment) : false,
    hasFrontendTracks: hasLms ? hasFrontendTracks(course) : false
  };

  if (hasLms) {
    base.outline = buildOutline(course, enrollment);
    // Strip heavy chapter quiz answers from course populate
    if (base.course) {
      base.course = {
        ...base.course,
        chapters: undefined,
        chapterCount: course.chapters.length
      };
    }
  }

  return base;
};

// @route   GET /api/enrollments/mine
router.get('/mine', protect, requireRole('student'), async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user.id,
      status: { $ne: 'revoked' }
    })
      .populate('course')
      .sort({ enrolledAt: -1 });

    const data = enrollments.map((e) => {
      const course = e.course || {};
      const hasLms = Array.isArray(course.chapters) && course.chapters.length > 0;
      const percent = hasLms
        ? lmsProgressPercent(course, e)
        : legacyProgressPercent(e, course.syllabus?.length || 0);
      const obj = e.toObject();
      if (obj.course?.chapters) delete obj.course.chapters;
      return {
        ...obj,
        progressPercent: percent,
        hasLms,
        pathComplete: hasLms ? pathComplete(course, e) : false
      };
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/enrollments/mine/:slug/track
router.post('/mine/:slug/track', protect, requireRole('student'), async (req, res) => {
  const { track } = req.body;
  try {
    if (!['react', 'next'].includes(track)) {
      return res.status(400).json({ message: 'track must be react or next' });
    }

    const loaded = await loadStudentEnrollment(req.user.id, req.params.slug);
    if (loaded.error) return res.status(loaded.error.status).json({ message: loaded.error.message });
    const { course, enrollment } = loaded;

    if (!course.chapters?.length) {
      return res.status(400).json({ message: 'This course has no LMS tracks' });
    }
    if (!canPickTrack(course, enrollment)) {
      return res.status(400).json({
        message: enrollment.trackChoice
          ? 'Track is locked after you started track chapters'
          : 'Finish all shared foundation chapters before choosing a track'
      });
    }

    enrollment.trackChoice = track;
    await enrollment.save();
    await enrollment.populate('course');

    res.json(enrollmentPayload(enrollment, course));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/enrollments/mine/:slug/chapters/:chapterId
router.get('/mine/:slug/chapters/:chapterId', protect, requireRole('student'), async (req, res) => {
  try {
    const loaded = await loadStudentEnrollment(req.user.id, req.params.slug);
    if (loaded.error) return res.status(loaded.error.status).json({ message: loaded.error.message });
    const { course, enrollment } = loaded;

    const chapter = (course.chapters || []).find((c) => c.id === req.params.chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    if (!isChapterUnlocked(course, enrollment, chapter.id)) {
      return res.status(403).json({ message: 'Chapter is locked' });
    }

    const prog = (enrollment.progress || []).find((p) => p.chapterId === chapter.id);

    res.json({
      chapter: sanitizeChapter(chapter, { includeAnswers: false }),
      progress: prog || null,
      trackChoice: enrollment.trackChoice,
      progressPercent: lmsProgressPercent(course, enrollment)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/enrollments/mine/:slug/chapters/:chapterId/quiz
router.post('/mine/:slug/chapters/:chapterId/quiz', protect, requireRole('student'), async (req, res) => {
  const { answers } = req.body; // array of selected indexes aligned to question order

  try {
    const loaded = await loadStudentEnrollment(req.user.id, req.params.slug);
    if (loaded.error) return res.status(loaded.error.status).json({ message: loaded.error.message });
    const { course, enrollment } = loaded;

    if (enrollment.status === 'revoked') {
      return res.status(403).json({ message: 'Enrollment revoked' });
    }

    const chapter = (course.chapters || []).find((c) => c.id === req.params.chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    if (!isChapterUnlocked(course, enrollment, chapter.id)) {
      return res.status(403).json({ message: 'Chapter is locked' });
    }

    const questions = chapter.quiz?.questions || [];
    if (!Array.isArray(answers) || answers.length !== questions.length) {
      return res.status(400).json({ message: 'answers must match quiz length' });
    }

    let correct = 0;
    const review = questions.map((q, i) => {
      const selected = Number(answers[i]);
      const isCorrect = selected === q.answerIndex;
      if (isCorrect) correct += 1;
      return {
        index: i,
        prompt: q.prompt,
        options: q.options,
        selected,
        answerIndex: q.answerIndex,
        correct: isCorrect,
        explanation: q.explanation || ''
      };
    });

    const score = questions.length ? Math.round((correct / questions.length) * 100) : 0;
    const passScore = chapter.quiz?.passScore ?? 70;
    const passed = score >= passScore;

    let prog = enrollment.progress.find((p) => p.chapterId === chapter.id);
    if (!prog) {
      prog = { chapterId: chapter.id, completed: false, attempts: 0 };
      enrollment.progress.push(prog);
      prog = enrollment.progress[enrollment.progress.length - 1];
    }
    prog.attempts = (prog.attempts || 0) + 1;
    prog.quizScore = score;
    prog.quizPassed = passed;
    if (passed) {
      prog.completed = true;
      prog.completedAt = new Date();
    }

    if (pathComplete(course, enrollment)) {
      enrollment.status = 'completed';
      if (!enrollment.certificateId) {
        enrollment.certificateId = issueCertificateId();
        enrollment.certificateIssuedAt = new Date();
      }
    } else if (enrollment.status === 'completed') {
      // keep completed if already done
    } else {
      enrollment.status = 'active';
    }

    await enrollment.save();

    res.json({
      score,
      passed,
      passScore,
      review,
      progressPercent: lmsProgressPercent(course, enrollment),
      canPickTrack: canPickTrack(course, enrollment),
      pathComplete: pathComplete(course, enrollment),
      certificateId: enrollment.certificateId || null,
      outline: buildOutline(course, enrollment)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/enrollments/mine/:slug/certificate
router.get('/mine/:slug/certificate', protect, requireRole('student'), async (req, res) => {
  try {
    const loaded = await loadStudentEnrollment(req.user.id, req.params.slug);
    if (loaded.error) return res.status(loaded.error.status).json({ message: loaded.error.message });
    const { course, enrollment } = loaded;

    if (!pathComplete(course, enrollment)) {
      return res.status(403).json({ message: 'Complete all required chapters to unlock the certificate' });
    }

    if (!enrollment.certificateId) {
      enrollment.certificateId = issueCertificateId();
      enrollment.certificateIssuedAt = new Date();
      enrollment.status = 'completed';
      await enrollment.save();
    }

    const student = await User.findById(req.user.id).select('name email');

    res.json({
      certificateId: enrollment.certificateId,
      issuedAt: enrollment.certificateIssuedAt,
      studentName: student?.name || 'Learner',
      studentEmail: student?.email || '',
      courseTitle: course.title,
      courseSlug: course.slug,
      track: enrollment.trackChoice || null,
      trackLabel: enrollment.trackChoice === 'next'
        ? 'Next.js'
        : enrollment.trackChoice === 'react'
          ? 'React'
          : null
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/enrollments/mine/:slug
router.get('/mine/:slug', protect, requireRole('student'), async (req, res) => {
  try {
    const loaded = await loadStudentEnrollment(req.user.id, req.params.slug);
    if (loaded.error) return res.status(loaded.error.status).json({ message: loaded.error.message });
    const { course, enrollment } = loaded;
    res.json(enrollmentPayload(enrollment, course));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/enrollments/mine/:slug/progress  (legacy syllabus checklist)
router.put('/mine/:slug/progress', protect, requireRole('student'), async (req, res) => {
  const { moduleIndex, completed } = req.body;

  try {
    if (moduleIndex === undefined) {
      return res.status(400).json({ message: 'moduleIndex is required' });
    }

    const loaded = await loadStudentEnrollment(req.user.id, req.params.slug);
    if (loaded.error) return res.status(loaded.error.status).json({ message: loaded.error.message });
    const { course, enrollment } = loaded;

    if (enrollment.status !== 'active' && enrollment.status !== 'completed') {
      return res.status(404).json({ message: 'Active enrollment not found' });
    }

    if (course.chapters?.length) {
      return res.status(400).json({ message: 'This course uses chapter quizzes for progress' });
    }

    if (moduleIndex < 0 || moduleIndex >= (course.syllabus?.length || 0)) {
      return res.status(400).json({ message: 'Invalid module index' });
    }

    const existing = enrollment.progress.find((p) => p.moduleIndex === moduleIndex);
    if (existing) {
      existing.completed = completed !== false;
      existing.completedAt = existing.completed ? new Date() : null;
    } else {
      enrollment.progress.push({
        moduleIndex,
        completed: completed !== false,
        completedAt: completed !== false ? new Date() : null
      });
    }

    const moduleCount = course.syllabus.length;
    const done = enrollment.progress.filter((p) => p.completed && p.moduleIndex != null).length;
    if (done >= moduleCount && moduleCount > 0) {
      enrollment.status = 'completed';
    }

    await enrollment.save();
    await enrollment.populate('course');

    res.json({
      ...enrollment.toObject(),
      progressPercent: legacyProgressPercent(enrollment, moduleCount)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/enrollments  (admin)
router.get('/', protect, requireRole('admin'), async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('student', 'name email phone role')
      .populate('course', 'title slug category')
      .sort({ enrolledAt: -1 });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/students/list', protect, requireRole('admin'), async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', protect, requireRole('admin'), async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    if (!studentId || !courseId) {
      return res.status(400).json({ message: 'studentId and courseId are required' });
    }

    const student = await User.findOne({ _id: studentId, role: 'student' });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) {
      if (existing.status === 'revoked') {
        existing.status = 'active';
        existing.progress = [];
        existing.trackChoice = undefined;
        existing.certificateId = '';
        existing.certificateIssuedAt = null;
        existing.enrolledAt = new Date();
        existing.markModified('trackChoice');
        await existing.save();
        await existing.populate('student', 'name email phone');
        await existing.populate('course', 'title slug category');
        return res.json(existing);
      }
      return res.status(400).json({ message: 'Student already enrolled in this course' });
    }

    const enrollment = new Enrollment({
      student: studentId,
      course: courseId,
      progress: [],
      status: 'active'
    });
    await enrollment.save();
    await enrollment.populate('student', 'name email phone');
    await enrollment.populate('course', 'title slug category');
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', protect, requireRole('admin'), async (req, res) => {
  const { studentId, courseId, status } = req.body;

  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    if (studentId) {
      const student = await User.findOne({ _id: studentId, role: 'student' });
      if (!student) return res.status(404).json({ message: 'Student not found' });
      enrollment.student = studentId;
    }

    if (courseId) {
      const course = await Course.findById(courseId);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      enrollment.course = courseId;
    }

    if (status) {
      if (!['active', 'completed', 'revoked'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      enrollment.status = status;
    }

    await enrollment.save();
    await enrollment.populate('student', 'name email phone');
    await enrollment.populate('course', 'title slug category');
    res.json(enrollment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'That student is already enrolled in this course' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    enrollment.status = 'revoked';
    await enrollment.save();
    res.json({ message: 'Enrollment revoked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
