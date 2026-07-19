const express = require('express');
const router = express.Router();
const SiteStat = require('../models/SiteStat');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const items = await SiteStat.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:key', protect, requireRole('admin'), async (req, res) => {
  try {
    const item = await SiteStat.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { new: true, upsert: true }
    );
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
