const mongoose = require('mongoose');

const MasterclassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  domain: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  mentor: {
    type: String,
    required: true,
    trim: true
  },
  seats: {
    type: Number,
    default: 50
  },
  imageUrl: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Masterclass', MasterclassSchema);
