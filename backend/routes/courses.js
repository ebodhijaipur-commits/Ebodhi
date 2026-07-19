const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect, requireRole } = require('../middleware/auth');

// Helper function to create slug
const makeSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end
};

// @route   GET /api/courses
// @desc    Get all courses (supports filtering by featured)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { featured, category } = req.query;
    let query = {};
    if (featured === 'true') query.featured = true;
    if (category) query.category = category;

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/courses/:slug
// @desc    Get single course by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private
router.post('/', protect, requireRole('admin'), async (req, res) => {
  const {
    title, category, description, price, duration, syllabus, imageUrl, featured,
    mode, highlights, avgSalary, isFree, placementAssistance
  } = req.body;

  try {
    if (!title || !category || !description || price === undefined || !duration) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const slug = makeSlug(title);
    const existing = await Course.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: 'A course with a similar title already exists' });
    }

    const newCourse = new Course({
      title,
      slug,
      category,
      description,
      price,
      duration,
      syllabus: syllabus || [],
      imageUrl: imageUrl || '',
      featured: featured || false,
      mode: mode || 'online',
      highlights: highlights || [],
      avgSalary: avgSalary || '',
      isFree: !!isFree,
      placementAssistance: placementAssistance !== false
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update an existing course
// @access  Private
router.put('/:id', protect, requireRole('admin'), async (req, res) => {
  const {
    title, category, description, price, duration, syllabus, imageUrl, featured,
    mode, highlights, avgSalary, isFree, placementAssistance
  } = req.body;

  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.title = title || course.title;
    if (title) {
      course.slug = makeSlug(title);
    }
    course.category = category || course.category;
    course.description = description || course.description;
    course.price = price !== undefined ? price : course.price;
    course.duration = duration || course.duration;
    course.syllabus = syllabus || course.syllabus;
    course.imageUrl = imageUrl !== undefined ? imageUrl : course.imageUrl;
    course.featured = featured !== undefined ? featured : course.featured;
    if (mode) course.mode = mode;
    if (highlights) course.highlights = highlights;
    if (avgSalary !== undefined) course.avgSalary = avgSalary;
    if (isFree !== undefined) course.isFree = isFree;
    if (placementAssistance !== undefined) course.placementAssistance = placementAssistance;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete a course
// @access  Private
router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Course.deleteOne({ _id: req.params.id });
    res.json({ message: 'Course removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
