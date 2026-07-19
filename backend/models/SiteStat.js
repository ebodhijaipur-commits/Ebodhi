const mongoose = require('mongoose');

const SiteStatSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('SiteStat', SiteStatSchema);
