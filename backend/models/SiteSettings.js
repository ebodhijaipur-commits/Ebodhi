const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    default: 'main',
    unique: true
  },
  logoUrl: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: '+91-141-404-5555'
  },
  instagram: {
    type: String,
    default: ''
  },
  facebook: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
