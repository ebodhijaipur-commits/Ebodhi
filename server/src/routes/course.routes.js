import { Router } from 'express';
import Course from '../models/Course.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { q, category, audience, limit } = req.query;
    const filter = { published: true };

    if (q) {
      const tokens = String(q)
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean);
      if (tokens.length > 0) {
        filter.$and = tokens.map((t) => ({ searchText: { $regex: t } }));
      }
    }
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (audience && ['school', 'college', 'professionals'].includes(audience)) {
      filter.audience = audience;
    }

    const courses = await Course.find(filter)
      .populate('instructor', 'name')
      .sort({ createdAt: -1 })
      .limit(Number(limit) || 50);

    if (audience === 'school') {
      const gradeRank = (c) => {
        const m = c.slug.match(/grades?-?(\d+)/);
        return m ? Number(m[1]) : 99;
      };
      courses.sort((a, b) => gradeRank(a) - gradeRank(b));
    }

    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'instructor',
      'name email'
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      instructor: req.user._id,
    });
    res.status(201).json({ course });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
