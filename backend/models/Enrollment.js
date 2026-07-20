const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  // Legacy syllabus module progress
  moduleIndex: { type: Number },
  // LMS chapter progress
  chapterId: { type: String },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
  quizScore: { type: Number, default: null },
  quizPassed: { type: Boolean, default: false },
  attempts: { type: Number, default: 0 }
});

const EnrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  trackChoice: {
    type: String,
    enum: ['react', 'next'],
    default: undefined
  },
  progress: [ProgressSchema],
  status: {
    type: String,
    enum: ['active', 'completed', 'revoked'],
    default: 'active'
  },
  certificateId: { type: String, default: '' },
  certificateIssuedAt: { type: Date, default: null },
  enrolledAt: {
    type: Date,
    default: Date.now
  }
});

EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
