const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const { protect, requireRole } = require('../middleware/auth');

const DEFAULTS = {
  key: 'main',
  logoUrl: '',
  phone: '+91-141-404-5555',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  linkedin: 'https://www.linkedin.com/'
};

const publicSettings = (settings) => ({
  logoUrl: settings.logoUrl || '',
  phone: settings.phone || DEFAULTS.phone,
  instagram: settings.instagram || '',
  facebook: settings.facebook || '',
  linkedin: settings.linkedin || ''
});

const getOrCreate = async () => {
  let settings = await SiteSettings.findOne({ key: 'main' });
  if (!settings) {
    settings = await SiteSettings.create(DEFAULTS);
  }
  return settings;
};

// @route   GET /api/settings
router.get('/', async (req, res) => {
  try {
    const settings = await getOrCreate();
    res.json(publicSettings(settings));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/settings
router.put('/', protect, requireRole('admin'), async (req, res) => {
  const { logoUrl, phone, instagram, facebook, linkedin } = req.body;

  try {
    const $set = {};
    if (logoUrl !== undefined) $set.logoUrl = String(logoUrl).trim();
    if (phone !== undefined) $set.phone = String(phone).trim();
    if (instagram !== undefined) $set.instagram = String(instagram).trim();
    if (facebook !== undefined) $set.facebook = String(facebook).trim();
    if (linkedin !== undefined) $set.linkedin = String(linkedin).trim();

    const settings = await SiteSettings.findOneAndUpdate(
      { key: 'main' },
      Object.keys($set).length ? { $set } : {},
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(publicSettings(settings));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
