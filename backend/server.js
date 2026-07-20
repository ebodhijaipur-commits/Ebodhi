require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { ensureSeeded } = require('./seed');

const authRoutes = require('./routes/auth');
const studentAuthRoutes = require('./routes/studentAuth');
const courseRoutes = require('./routes/courses');
const inquiryRoutes = require('./routes/inquiries');
const testimonialRoutes = require('./routes/testimonials');
const enrollmentRoutes = require('./routes/enrollments');
const masterclassRoutes = require('./routes/masterclasses');
const mentorRoutes = require('./routes/mentors');
const alumniRoutes = require('./routes/alumni');
const resourceRoutes = require('./routes/resources');
const statsRoutes = require('./routes/stats');
const settingsRoutes = require('./routes/settings');
const lmsAdminRoutes = require('./routes/lmsAdmin');

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/students/auth', studentAuthRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/masterclasses', masterclassRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/lms', lmsAdminRoutes);
app.use('/api/applications', require('./routes/applications'));

app.get('/', (req, res) => {
  res.send('eBodhi Course Portal API is running...');
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  try {
    await ensureSeeded();
  } catch (err) {
    console.error('Auto-seed warning:', err.message);
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
