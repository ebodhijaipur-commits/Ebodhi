const mongoose = require('mongoose');

const QuizQuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answerIndex: Number
});

const ResourceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['tutorial', 'quiz', 'compiler', 'free-course'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  meta: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  questions: [QuizQuestionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resource', ResourceSchema);
