const mongoose = require('mongoose');

const SyllabusModuleSchema = new mongoose.Schema({
  moduleName: { type: String, required: true },
  topics: [{ type: String }]
});

const QuizQuestionSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  options: [{ type: String }],
  answerIndex: { type: Number, required: true },
  explanation: { type: String, default: '' }
}, { _id: false });

const TryItSchema = new mongoose.Schema({
  id: { type: String, default: '' },
  title: { type: String, default: 'Try it yourself' },
  description: { type: String, default: '' },
  html: { type: String, default: '' },
  css: { type: String, default: '' },
  js: { type: String, default: '' }
}, { _id: false });

const ChapterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  order: { type: Number, required: true },
  track: {
    type: String,
    enum: ['shared', 'react', 'next', 'backend'],
    required: true
  },
  summary: { type: String, default: '' },
  content: { type: String, default: '' },
  keyPoints: [{ type: String }],
  tryIt: [TryItSchema],
  localBuild: {
    goal: { type: String, default: '' },
    commands: [{ type: String }],
    expectedUrl: { type: String, default: '' },
    checklist: [{ type: String }]
  },
  example: {
    title: { type: String, default: '' },
    code: { type: String, default: '' },
    explanation: { type: String, default: '' }
  },
  quiz: {
    passScore: { type: Number, default: 70 },
    questions: [QuizQuestionSchema]
  }
}, { _id: false });

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  syllabus: [SyllabusModuleSchema],
  chapters: [ChapterSchema],
  lmsVersion: { type: Number, default: 0 },
  imageUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  mode: { type: String, enum: ['online', 'campus', 'both'], default: 'online' },
  highlights: [{ type: String }],
  avgSalary: { type: String, default: '' },
  isFree: { type: Boolean, default: false },
  placementAssistance: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
