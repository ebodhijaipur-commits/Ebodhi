const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const items = await Mentor.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', protect, requireRole('admin'), async (req, res) => {
  try {
    const item = await Mentor.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const item = await Mentor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const item = await Mentor.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
