const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protect, requireRole } = require('../middleware/auth');

// @route   POST /api/inquiries
// @desc    Submit a user inquiry / callback request
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, phone, courseId, message } = req.body;

  try {
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      courseId: courseId || null,
      message: message || ''
    });

    const savedInquiry = await newInquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully', data: savedInquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/inquiries
// @desc    Get all student leads / inquiries (populated with course info)
// @access  Private
router.get('/', protect, requireRole('admin'), async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('courseId', 'title category')
      .sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/inquiries/:id
// @desc    Update inquiry status or notes
// @access  Private
router.put('/:id', protect, requireRole('admin'), async (req, res) => {
  const { status, notes } = req.body;

  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    if (status) {
      inquiry.status = status;
    }
    if (notes !== undefined) {
      inquiry.notes = notes;
    }

    const updatedInquiry = await inquiry.save();
    res.json(updatedInquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/inquiries/:id
// @desc    Delete a lead
// @access  Private
router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    await Inquiry.deleteOne({ _id: req.params.id });
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
