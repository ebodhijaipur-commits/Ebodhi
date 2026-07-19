const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  moduleIndex: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  }
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
  progress: [ProgressSchema],
  status: {
    type: String,
    enum: ['active', 'completed', 'revoked'],
    default: 'active'
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  }
});

EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
