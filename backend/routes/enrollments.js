const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const { protect, requireRole } = require('../middleware/auth');

const progressPercent = (enrollment, moduleCount) => {
  if (!moduleCount) return 0;
  const completed = (enrollment.progress || []).filter((p) => p.completed).length;
  return Math.round((completed / moduleCount) * 100);
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
      const moduleCount = e.course?.syllabus?.length || 0;
      return {
        ...e.toObject(),
        progressPercent: progressPercent(e, moduleCount)
      };
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/enrollments/mine/:slug
router.get('/mine/:slug', protect, requireRole('student'), async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollment = await Enrollment.findOne({
      student: req.user.id,
      course: course._id,
      status: { $ne: 'revoked' }
    }).populate('course');

    if (!enrollment) {
      return res.status(404).json({ message: 'You are not enrolled in this course' });
    }

    res.json({
      ...enrollment.toObject(),
      progressPercent: progressPercent(enrollment, course.syllabus?.length || 0)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/enrollments/mine/:slug/progress
router.put('/mine/:slug/progress', protect, requireRole('student'), async (req, res) => {
  const { moduleIndex, completed } = req.body;

  try {
    if (moduleIndex === undefined) {
      return res.status(400).json({ message: 'moduleIndex is required' });
    }

    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollment = await Enrollment.findOne({
      student: req.user.id,
      course: course._id,
      status: 'active'
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Active enrollment not found' });
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
    const done = enrollment.progress.filter((p) => p.completed).length;
    if (done >= moduleCount && moduleCount > 0) {
      enrollment.status = 'completed';
    }

    await enrollment.save();
    await enrollment.populate('course');

    res.json({
      ...enrollment.toObject(),
      progressPercent: progressPercent(enrollment, moduleCount)
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

// @route   GET /api/enrollments/students  (admin list students)
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

// @route   POST /api/enrollments  (admin assign)
router.post('/', protect, requireRole('admin'), async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    if (!studentId || !courseId) {
      return res.status(400).json({ message: 'studentId and courseId are required' });
    }

    const student = await User.findOne({ _id: studentId, role: 'student' });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) {
      if (existing.status === 'revoked') {
        existing.status = 'active';
        existing.progress = [];
        existing.enrolledAt = new Date();
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

// @route   PUT /api/enrollments/:id  (admin update)
router.put('/:id', protect, requireRole('admin'), async (req, res) => {
  const { studentId, courseId, status } = req.body;

  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

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

// @route   DELETE /api/enrollments/:id  (admin revoke)
router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    enrollment.status = 'revoked';
    await enrollment.save();
    res.json({ message: 'Enrollment revoked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
