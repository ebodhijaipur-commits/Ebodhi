const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const { protect, requireRole } = require('../middleware/auth');
const { lmsProgressPercent, pathComplete, buildOutline } = require('../utils/lms');
const { LMS_BY_SLUG } = require('../data/lmsCatalog');

const TRACKS = ['shared', 'react', 'next', 'backend'];

const makeChapterId = (title, track) => {
  const base = String(title || 'chapter')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 24) || 'chapter';
  const rand = crypto.randomBytes(2).toString('hex');
  return `${track || 'ch'}-${base}-${rand}`;
};

const normalizeChapter = (raw, fallbackOrder = 1) => {
  const track = TRACKS.includes(raw.track) ? raw.track : 'shared';
  const questions = Array.isArray(raw.quiz?.questions)
    ? raw.quiz.questions.map((q) => ({
      prompt: String(q.prompt || '').trim(),
      options: Array.isArray(q.options) ? q.options.map((o) => String(o)) : [],
      answerIndex: Number.isInteger(q.answerIndex) ? q.answerIndex : 0,
      explanation: String(q.explanation || '')
    })).filter((q) => q.prompt && q.options.length >= 2)
    : [];

  const id = String(raw.id || '').trim() || makeChapterId(raw.title, track);

  const tryIt = Array.isArray(raw.tryIt)
    ? raw.tryIt.map((t, i) => ({
      id: String(t.id || `try-${i}`),
      title: String(t.title || 'Try it yourself'),
      description: String(t.description || ''),
      html: String(t.html || ''),
      css: String(t.css || ''),
      js: String(t.js || '')
    })).filter((t) => t.html || t.css || t.js)
    : [];

  return {
    id,
    title: String(raw.title || 'Untitled chapter').trim(),
    order: Number(raw.order) > 0 ? Number(raw.order) : fallbackOrder,
    track,
    summary: String(raw.summary || ''),
    content: String(raw.content || ''),
    keyPoints: Array.isArray(raw.keyPoints)
      ? raw.keyPoints.map((k) => String(k)).filter(Boolean)
      : [],
    tryIt,
    localBuild: {
      goal: String(raw.localBuild?.goal || ''),
      commands: Array.isArray(raw.localBuild?.commands)
        ? raw.localBuild.commands.map((c) => String(c)).filter(Boolean)
        : [],
      expectedUrl: String(raw.localBuild?.expectedUrl || ''),
      checklist: Array.isArray(raw.localBuild?.checklist)
        ? raw.localBuild.checklist.map((c) => String(c)).filter(Boolean)
        : []
    },
    example: {
      title: String(raw.example?.title || ''),
      code: String(raw.example?.code || ''),
      explanation: String(raw.example?.explanation || '')
    },
    quiz: {
      passScore: Number(raw.quiz?.passScore) > 0 ? Number(raw.quiz.passScore) : 70,
      questions
    }
  };
};

const loadCourse = async (slugOrId) => {
  let course = await Course.findOne({ slug: slugOrId });
  if (!course && /^[a-f\d]{24}$/i.test(slugOrId)) {
    course = await Course.findById(slugOrId);
  }
  return course;
};

const courseSummary = (course) => ({
  _id: course._id,
  title: course.title,
  slug: course.slug,
  category: course.category,
  chapterCount: Array.isArray(course.chapters) ? course.chapters.length : 0,
  tracks: TRACKS.map((t) => ({
    track: t,
    count: (course.chapters || []).filter((c) => c.track === t).length
  })),
  hasLms: Array.isArray(course.chapters) && course.chapters.length > 0
});

// All LMS admin routes require admin
router.use(protect, requireRole('admin'));

// GET /api/lms/courses — catalog with LMS meta
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().select('title slug category chapters').sort({ title: 1 });
    res.json(courses.map(courseSummary));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/lms/courses/:slug — full curriculum
router.get('/courses/:slug', async (req, res) => {
  try {
    const course = await loadCourse(req.params.slug);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    const chapters = [...(course.chapters || [])].sort((a, b) => a.order - b.order);
    res.json({
      ...courseSummary(course),
      chapters
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/lms/courses/:slug/chapters — replace entire curriculum
router.put('/courses/:slug/chapters', async (req, res) => {
  try {
    const course = await loadCourse(req.params.slug);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const incoming = Array.isArray(req.body.chapters) ? req.body.chapters : null;
    if (!incoming) return res.status(400).json({ message: 'chapters array required' });

    const seen = new Set();
    const chapters = incoming.map((ch, i) => {
      const normalized = normalizeChapter(ch, i + 1);
      let id = normalized.id;
      while (seen.has(id)) id = makeChapterId(normalized.title, normalized.track);
      seen.add(id);
      return { ...normalized, id };
    }).sort((a, b) => a.order - b.order);

    course.chapters = chapters;
    await course.save();
    res.json({
      ...courseSummary(course),
      chapters: course.chapters
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/lms/courses/:slug/chapters — add one chapter
router.post('/courses/:slug/chapters', async (req, res) => {
  try {
    const course = await loadCourse(req.params.slug);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const maxOrder = (course.chapters || []).reduce((m, c) => Math.max(m, c.order || 0), 0);
    const chapter = normalizeChapter(req.body, maxOrder + 1);
    if ((course.chapters || []).some((c) => c.id === chapter.id)) {
      chapter.id = makeChapterId(chapter.title, chapter.track);
    }

    course.chapters.push(chapter);
    course.chapters.sort((a, b) => a.order - b.order);
    await course.save();
    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/lms/courses/:slug/chapters/:chapterId
router.put('/courses/:slug/chapters/:chapterId', async (req, res) => {
  try {
    const course = await loadCourse(req.params.slug);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const idx = (course.chapters || []).findIndex((c) => c.id === req.params.chapterId);
    if (idx < 0) return res.status(404).json({ message: 'Chapter not found' });

    const prev = course.chapters[idx];
    const merged = normalizeChapter(
      { ...prev.toObject?.() || prev, ...req.body, id: prev.id },
      prev.order
    );
    course.chapters[idx] = merged;
    course.markModified('chapters');
    course.chapters.sort((a, b) => a.order - b.order);
    await course.save();
    res.json(merged);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/lms/courses/:slug/chapters/:chapterId
router.delete('/courses/:slug/chapters/:chapterId', async (req, res) => {
  try {
    const course = await loadCourse(req.params.slug);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const before = course.chapters?.length || 0;
    course.chapters = (course.chapters || []).filter((c) => c.id !== req.params.chapterId);
    if (course.chapters.length === before) {
      return res.status(404).json({ message: 'Chapter not found' });
    }
    await course.save();
    res.json({ message: 'Chapter deleted', chapterCount: course.chapters.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/lms/courses/:slug/seed-default — load packaged default curriculum
router.post('/courses/:slug/seed-default', async (req, res) => {
  try {
    const course = await loadCourse(req.params.slug);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    const pack = LMS_BY_SLUG[course.slug];
    if (!pack) {
      return res.status(400).json({
        message: 'No packaged default curriculum for this course'
      });
    }
    if (course.chapters?.length && !req.body?.force) {
      return res.status(400).json({
        message: 'Course already has chapters. Pass { force: true } to replace.'
      });
    }
    course.chapters = pack.chapters;
    course.lmsVersion = pack.version;
    await course.save();
    res.json({
      ...courseSummary(course),
      chapters: course.chapters
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/lms/courses/:slug/clear — remove all LMS chapters
router.post('/courses/:slug/clear', async (req, res) => {
  try {
    const course = await loadCourse(req.params.slug);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    course.chapters = [];
    await course.save();
    res.json(courseSummary(course));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/lms/courses/:slug/progress — student LMS progress
router.get('/courses/:slug/progress', async (req, res) => {
  try {
    const course = await loadCourse(req.params.slug);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const enrollments = await Enrollment.find({
      course: course._id,
      status: { $ne: 'revoked' }
    })
      .populate('student', 'name email phone')
      .sort({ enrolledAt: -1 });

    const rows = enrollments.map((e) => ({
      _id: e._id,
      student: e.student,
      status: e.status,
      trackChoice: e.trackChoice || null,
      progressPercent: lmsProgressPercent(course, e),
      pathComplete: pathComplete(course, e),
      certificateId: e.certificateId || '',
      certificateIssuedAt: e.certificateIssuedAt,
      enrolledAt: e.enrolledAt,
      outline: buildOutline(course, e)
    }));

    res.json({
      course: courseSummary(course),
      enrollments: rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/lms/enrollments/:id/reset — reset LMS progress for a student
router.post('/enrollments/:id/reset', async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    enrollment.progress = [];
    enrollment.trackChoice = undefined;
    enrollment.certificateId = '';
    enrollment.certificateIssuedAt = null;
    enrollment.status = 'active';
    enrollment.markModified('trackChoice');
    enrollment.markModified('progress');
    await enrollment.save();
    await enrollment.populate('student', 'name email phone');
    await enrollment.populate('course', 'title slug');

    res.json({
      message: 'LMS progress reset',
      enrollment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
