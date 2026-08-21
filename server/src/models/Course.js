import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: Number, default: 10 },
    videoUrl: { type: String, default: '' },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    audience: {
      type: String,
      enum: ['school', 'college', 'professionals'],
      default: 'college',
      index: true,
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    price: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    students: { type: Number, default: 0 },
    thumbnail: { type: String, default: '' },
    outcomes: [{ type: String }],
    lessons: [lessonSchema],
    keywords: [{ type: String }],
    searchText: { type: String, index: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

courseSchema.statics.buildSearchText = function (doc) {
  const raw = [doc.title, doc.description, doc.category, doc.level, ...(doc.keywords || [])]
    .join(' ')
    .toLowerCase();
  return raw.replace(/[^a-z0-9]/g, '');
};

courseSchema.pre('save', function (next) {
  this.searchText = this.constructor.buildSearchText(this);
  next();
});

export default mongoose.model('Course', courseSchema);
