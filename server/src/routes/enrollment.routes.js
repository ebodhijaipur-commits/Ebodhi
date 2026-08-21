import { Router } from 'express';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/:courseId', protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    let enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: course._id,
    });

    if (!enrollment) {
      enrollment = await Enrollment.create({
        user: req.user._id,
        course: course._id,
      });
      await Course.updateOne({ _id: course._id }, { $inc: { students: 1 } });
    }

    res.status(201).json({ enrollment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my', protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate({ path: 'course', populate: { path: 'instructor', select: 'name' } })
      .sort({ createdAt: -1 });
    res.json({ enrollments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id/progress', protect, async (req, res) => {
  try {
    const progress = Math.max(0, Math.min(100, Number(req.body.progress) || 0));
    const enrollment = await Enrollment.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { progress },
      { new: true }
    );
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.json({ enrollment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
