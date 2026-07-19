const mongoose = require('mongoose');

const SyllabusModuleSchema = new mongoose.Schema({
  moduleName: {
    type: String,
    required: true
  },
  topics: [{
    type: String
  }]
});

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  syllabus: [SyllabusModuleSchema],
  imageUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    enum: ['online', 'campus', 'both'],
    default: 'online'
  },
  highlights: [{
    type: String
  }],
  avgSalary: {
    type: String,
    default: ''
  },
  isFree: {
    type: Boolean,
    default: false
  },
  placementAssistance: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);
