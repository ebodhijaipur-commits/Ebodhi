const express = require('express');
const router = express.Router();
const CourseApplication = require('../models/CourseApplication');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');
const { protect, requireRole } = require('../middleware/auth');

const ensureEnrollment = async (studentId, courseId) => {
  let enrollment = await Enrollment.findOne({ student: studentId, course: courseId });
  if (enrollment) {
    if (enrollment.status === 'revoked') {
      enrollment.status = 'active';
      enrollment.progress = [];
      enrollment.trackChoice = undefined;
      enrollment.certificateId = '';
      enrollment.certificateIssuedAt = null;
      enrollment.enrolledAt = new Date();
      enrollment.markModified('trackChoice');
      await enrollment.save();
    }
    return enrollment;
  }
  enrollment = new Enrollment({
    student: studentId,
    course: courseId,
    progress: [],
    status: 'active'
  });
  await enrollment.save();
  return enrollment;
};

// Student: apply for a course (LMS access after admin approval)
router.post('/', protect, requireRole('student'), async (req, res) => {
  try {
    const { courseId, courseSlug, message } = req.body;
    if (!courseId && !courseSlug) {
      return res.status(400).json({ message: 'courseId or courseSlug is required' });
    }

    const course = courseId
      ? await Course.findById(courseId)
      : await Course.findOne({ slug: String(courseSlug).toLowerCase() });
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const existingEnrollment = await Enrollment.findOne({
      student: req.user.id,
      course: course._id,
      status: { $ne: 'revoked' }
    });
    if (existingEnrollment) {
      return res.status(400).json({
        message: 'You already have access to this course',
        status: 'enrolled',
        enrollmentId: existingEnrollment._id
      });
    }

    const existingApp = await CourseApplication.findOne({
      student: req.user.id,
      course: course._id
    }).sort({ createdAt: -1 });

    if (existingApp?.status === 'pending') {
      return res.status(400).json({
        message: 'You already applied. Waiting for admin approval.',
        application: existingApp
      });
    }

    if (existingApp?.status === 'approved') {
      // Safety: ensure enrollment exists
      await ensureEnrollment(req.user.id, course._id);
      return res.status(400).json({
        message: 'Application already approved — open your portal dashboard',
        status: 'enrolled'
      });
    }

    // Rejected or none → new application (or reopen rejected)
    let application;
    if (existingApp?.status === 'rejected') {
      existingApp.status = 'pending';
      existingApp.message = message || existingApp.message || '';
      existingApp.adminNotes = '';
      existingApp.reviewedAt = null;
      existingApp.reviewedBy = null;
      existingApp.createdAt = new Date();
      await existingApp.save();
      application = existingApp;
    } else {
      application = await CourseApplication.create({
        student: req.user.id,
        course: course._id,
        message: message || '',
        status: 'pending'
      });
    }

    await application.populate('course', 'title slug category imageUrl');
    res.status(201).json({
      message: 'Application submitted. An admin will review and unlock LMS access.',
      application
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Student: my applications
router.get('/mine', protect, requireRole('student'), async (req, res) => {
  try {
    const apps = await CourseApplication.find({ student: req.user.id })
      .populate('course', 'title slug category imageUrl duration')
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Student: status map for catalog buttons
router.get('/mine/status', protect, requireRole('student'), async (req, res) => {
  try {
    const [apps, enrollments] = await Promise.all([
      CourseApplication.find({ student: req.user.id }).select('course status'),
      Enrollment.find({ student: req.user.id, status: { $ne: 'revoked' } }).select('course')
    ]);
    const enrolled = new Set(enrollments.map((e) => String(e.course)));
    const map = {};
    apps.forEach((a) => {
      const id = String(a.course);
      if (enrolled.has(id)) map[id] = 'enrolled';
      else if (!map[id] || a.status === 'pending') map[id] = a.status;
      else if (map[id] !== 'pending' && map[id] !== 'enrolled') map[id] = a.status;
    });
    enrolled.forEach((id) => { map[id] = 'enrolled'; });
    // Also key by slug for fallback course cards
    const courses = await Course.find({ _id: { $in: Object.keys(map) } }).select('slug');
    const bySlug = {};
    courses.forEach((c) => {
      bySlug[c.slug] = map[String(c._id)];
    });
    res.json({ byCourseId: map, bySlug });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: list applications
router.get('/', protect, requireRole('admin'), async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      query.status = status;
    }
    const apps = await CourseApplication.find(query)
      .populate('student', 'name email phone')
      .populate('course', 'title slug category')
      .populate('reviewedBy', 'name username')
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: approve → create enrollment (LMS access)
router.post('/:id/approve', protect, requireRole('admin'), async (req, res) => {
  try {
    const application = await CourseApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    const student = await User.findOne({ _id: application.student, role: 'student' });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const course = await Course.findById(application.course);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const enrollment = await ensureEnrollment(student._id, course._id);

    application.status = 'approved';
    application.reviewedAt = new Date();
    application.reviewedBy = req.user.id;
    if (req.body?.adminNotes) application.adminNotes = req.body.adminNotes;
    await application.save();

    await application.populate('student', 'name email phone');
    await application.populate('course', 'title slug category');
    await enrollment.populate('course', 'title slug category');

    res.json({
      message: 'Approved — student can access the LMS from their portal',
      application,
      enrollment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: reject
router.post('/:id/reject', protect, requireRole('admin'), async (req, res) => {
  try {
    const application = await CourseApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    application.status = 'rejected';
    application.reviewedAt = new Date();
    application.reviewedBy = req.user.id;
    application.adminNotes = req.body?.adminNotes || application.adminNotes || '';
    await application.save();

    await application.populate('student', 'name email phone');
    await application.populate('course', 'title slug category');

    res.json({ message: 'Application rejected', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
