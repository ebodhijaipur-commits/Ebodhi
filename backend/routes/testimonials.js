const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect, requireRole } = require('../middleware/auth');

// @route   GET /api/testimonials
// @desc    Get all reviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/testimonials
// @desc    Create a testimonial
// @access  Private
router.post('/', protect, requireRole('admin'), async (req, res) => {
  const { name, courseName, review, rating, imageUrl } = req.body;

  try {
    if (!name || !courseName || !review || !rating) {
      return res.status(400).json({ message: 'Name, course, review, and rating are required' });
    }

    const newTestimonial = new Testimonial({
      name,
      courseName,
      review,
      rating,
      imageUrl: imageUrl || ''
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/testimonials/:id
// @desc    Update a testimonial
// @access  Private
router.put('/:id', protect, requireRole('admin'), async (req, res) => {
  const { name, courseName, review, rating, imageUrl } = req.body;

  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    if (name !== undefined) testimonial.name = name;
    if (courseName !== undefined) testimonial.courseName = courseName;
    if (review !== undefined) testimonial.review = review;
    if (rating !== undefined) testimonial.rating = rating;
    if (imageUrl !== undefined) testimonial.imageUrl = imageUrl;

    const updated = await testimonial.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await Testimonial.deleteOne({ _id: req.params.id });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
