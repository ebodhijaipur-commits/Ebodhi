require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Testimonial = require('./models/Testimonial');
const Masterclass = require('./models/Masterclass');
const Mentor = require('./models/Mentor');
const Alumni = require('./models/Alumni');
const Resource = require('./models/Resource');
const SiteStat = require('./models/SiteStat');
const SiteSettings = require('./models/SiteSettings');
const Enrollment = require('./models/Enrollment');
const { LMS_BY_SLUG } = require('./data/lmsCatalog');

const ensureCourseLms = async (slug) => {
  const pack = LMS_BY_SLUG[slug];
  if (!pack) return false;
  const course = await Course.findOne({ slug });
  if (!course) return false;
  const count = Array.isArray(course.chapters) ? course.chapters.length : 0;
  const version = course.lmsVersion || 0;
  if (count > 0 && version === pack.version) return false;
  course.chapters = pack.chapters;
  course.lmsVersion = pack.version;
  await course.save();
  console.log(`LMS synced ${slug} v${pack.version} (${pack.chapters.length} chapters)`);
  return true;
};

const ensureAllLms = async () => {
  let any = false;
  for (const slug of Object.keys(LMS_BY_SLUG)) {
    // eslint-disable-next-line no-await-in-loop
    if (await ensureCourseLms(slug)) any = true;
  }
  return any;
};

const coursesData = [
  {
    title: 'Full Stack Development',
    slug: 'full-stack-development',
    category: 'Full Stack',
    description: 'Job-ready full stack training covering HTML, CSS, React, Node.js, databases, REST APIs, and modern product workflows. Capstone projects built for internships and placements.',
    price: 20000,
    duration: '12–14 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=60',
    featured: true,
    mode: 'both',
    avgSalary: '₹5–12 LPA',
    placementAssistance: true,
    highlights: ['Capstone projects', 'React + Node', 'Internship support'],
    syllabus: [
      { moduleName: 'Frontend Foundations', topics: ['HTML5 & CSS3', 'Responsive UI', 'JavaScript ES6+', 'Component thinking'] },
      { moduleName: 'React & Client Apps', topics: ['Components & Hooks', 'Routing', 'API integration', 'State patterns'] },
      { moduleName: 'Backend & Databases', topics: ['Node.js & Express', 'MongoDB / SQL basics', 'REST API design', 'Auth with JWT'] },
      { moduleName: 'Deployment & Capstone', topics: ['Git & GitHub', 'Hosting basics', 'Portfolio polish', 'Capstone delivery'] }
    ]
  },
  {
    title: 'Data Science with AI/ML',
    slug: 'data-science-with-ai-ml',
    category: 'Data Science',
    description: 'From EDA and visualization to supervised ML and intro GenAI analytics. Build portfolio projects that mirror industry data problems.',
    price: 25000,
    duration: '12–14 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
    featured: true,
    mode: 'both',
    avgSalary: '₹6–14 LPA',
    highlights: ['EDA to ML pipeline', 'Python & ML', 'Capstone projects'],
    syllabus: [
      { moduleName: 'Python for Data', topics: ['NumPy & Pandas', 'Data cleaning', 'EDA workflows', 'Visualization'] },
      { moduleName: 'Statistics & ML Basics', topics: ['Descriptive stats', 'Regression', 'Classification', 'Model evaluation'] },
      { moduleName: 'Applied ML & AI', topics: ['Decision trees & ensembles', 'Clustering', 'Feature engineering', 'Intro GenAI analytics'] },
      { moduleName: 'Portfolio Studio', topics: ['Case studies', 'Reporting', 'Interview prep', 'Demo day'] }
    ]
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    category: 'Digital Marketing',
    description: 'Practical digital marketing covering SEO, social media, paid ads, content, and analytics — with campaign projects you can show employers.',
    price: 20000,
    duration: '12–14 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop&q=60',
    featured: true,
    mode: 'both',
    avgSalary: '₹3.5–8 LPA',
    highlights: ['SEO & social', 'Ads campaigns', 'Live projects'],
    syllabus: [
      { moduleName: 'Marketing Foundations', topics: ['Funnel basics', 'Brand messaging', 'Buyer personas', 'Content pillars'] },
      { moduleName: 'SEO & Content', topics: ['On-page SEO', 'Keyword research', 'Blogging systems', 'Local SEO'] },
      { moduleName: 'Social & Paid Media', topics: ['Meta / Google ads intro', 'Creative testing', 'Budgets & bidding', 'Retargeting'] },
      { moduleName: 'Analytics Capstone', topics: ['GA basics', 'Campaign reporting', 'ROI storytelling', 'Portfolio case'] }
    ]
  },
  {
    title: 'Data Analytics',
    slug: 'data-analytics',
    category: 'Data Analytics',
    description: 'Excel, SQL, Power BI / Tableau, and business storytelling — turn raw data into decisions with internship-ready dashboards.',
    price: 25000,
    duration: '12–14 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    featured: true,
    mode: 'both',
    avgSalary: '₹4–9 LPA',
    highlights: ['Excel & SQL', 'Power BI dashboards', 'Business cases'],
    syllabus: [
      { moduleName: 'Spreadsheet Mastery', topics: ['Advanced Excel', 'Cleaning data', 'Pivot tables', 'Charts'] },
      { moduleName: 'SQL for Analysts', topics: ['Joins', 'Aggregations', 'Window functions intro', 'Query practice'] },
      { moduleName: 'BI & Visualization', topics: ['Power BI / Tableau', 'Dashboard design', 'KPIs', 'Storytelling'] },
      { moduleName: 'Analytics Capstone', topics: ['Business problem', 'Insights deck', 'Stakeholder demo', 'Interview prep'] }
    ]
  },
  {
    title: 'App Development (Android/iOS)',
    slug: 'app-development-android-ios',
    category: 'App Development',
    description: 'Build mobile apps for Android and iOS with modern frameworks, UI patterns, APIs, and store-ready project workflows.',
    price: 25000,
    duration: '12–14 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60',
    featured: true,
    mode: 'both',
    avgSalary: '₹4–11 LPA',
    highlights: ['Android & iOS', 'API-driven apps', 'Portfolio apps'],
    syllabus: [
      { moduleName: 'Mobile Foundations', topics: ['UI/UX for mobile', 'App architecture', 'State & navigation', 'Debugging'] },
      { moduleName: 'Android Track', topics: ['Kotlin / Flutter basics', 'Layouts', 'Local storage', 'Device APIs'] },
      { moduleName: 'iOS / Cross-platform', topics: ['Swift / Flutter flows', 'Networking', 'Push & media', 'Publishing basics'] },
      { moduleName: 'Ship Capstone', topics: ['Product brief', 'MVP build', 'Testing', 'Demo & store checklist'] }
    ]
  }
];

const testimonialsData = [
  {
    name: 'Satyam Raj',
    courseName: 'Full Stack Development',
    review: 'Hands-on sessions were clear and practical. I finally understood how frontend and backend connect on real projects.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
  },
  {
    name: 'Damini Srivastava',
    courseName: 'Data Science with AI/ML',
    review: 'Learned more in a short intensive than I expected. The projects pushed me to actually build, not just watch videos.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
  },
  {
    name: 'Lalit Agarwal',
    courseName: 'Digital Marketing',
    review: 'Campaign projects and reporting practice made me feel internship-ready. Mentors explained tools the way companies actually use them.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
  }
];

const mentorsData = [
  {
    name: 'Ananya Kapoor',
    title: 'Full Stack & GenAI Mentor',
    bio: 'Builds product UIs and APIs; coaches learners on shipping portfolio apps with modern tooling.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=60',
    domains: ['Full Stack', 'React', 'GenAI']
  },
  {
    name: 'Vikram Singh',
    title: 'Data Science Mentor',
    bio: 'Focuses on applied ML, EDA discipline, and interview storytelling for analytics roles.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=60',
    domains: ['Data Science', 'Python', 'ML']
  },
  {
    name: 'Rohit Sharma',
    title: 'Cloud & DevOps Mentor',
    bio: 'Helps students deploy real stacks on cloud platforms with CI/CD discipline.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=60',
    domains: ['DevOps', 'AWS', 'Docker']
  },
  {
    name: 'Neha Rathore',
    title: 'DSA Interview Coach',
    bio: 'Competitive programmer turned mentor — patterns, mocks, and confidence under time pressure.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=60',
    domains: ['DSA', 'Python', 'Interviews']
  }
];

const alumniData = [
  {
    name: 'Sneha Patel',
    role: 'Junior Software Engineer',
    company: 'Product Startup',
    story: 'Completed the full stack track with GenAI projects and converted an internship into a full-time role.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=60',
    featured: true
  },
  {
    name: 'Kunal Jain',
    role: 'Data Analyst Intern',
    company: 'Analytics Team',
    story: 'Used eBodhi capstones to demonstrate EDA and ML basics during campus interviews.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=60',
    featured: true
  },
  {
    name: 'Meera Joshi',
    role: 'Cloud Support Associate',
    company: 'IT Services',
    story: 'DevOps labs and deployment demos helped clear technical screening rounds.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=60',
    featured: true
  }
];

const resourcesData = [
  {
    type: 'tutorial',
    title: 'Python Problem Solving Basics',
    description: 'Warm-up problems and patterns before you join a full DSA track.',
    meta: 'Beginner · Practice set',
    link: '/practice#tutorials'
  },
  {
    type: 'tutorial',
    title: 'HTML & CSS Mini Projects',
    description: 'Build small UI pieces to strengthen frontend fundamentals.',
    meta: 'Beginner · Projects',
    link: '/practice#tutorials'
  },
  {
    type: 'quiz',
    title: 'Python Fundamentals Quiz',
    description: 'Quick check on syntax and basics.',
    meta: '10 questions',
    questions: [
      { question: 'Which keyword defines a function in Python?', options: ['func', 'def', 'function', 'lambda'], answerIndex: 1 },
      { question: 'What is len([1,2,3])?', options: ['2', '3', '1', 'Error'], answerIndex: 1 },
      { question: 'Which type is immutable?', options: ['list', 'dict', 'tuple', 'set'], answerIndex: 2 }
    ]
  },
  {
    type: 'quiz',
    title: 'Web Basics Quiz',
    description: 'HTML/CSS/JS essentials.',
    meta: '8 questions',
    questions: [
      { question: 'HTML stands for?', options: ['Hyper Text Markup Language', 'HighText Machine Language', 'Hyperlinks Text Mark Language', 'Home Tool Markup Language'], answerIndex: 0 },
      { question: 'Which property sets text color in CSS?', options: ['font-color', 'text-color', 'color', 'foreground'], answerIndex: 2 }
    ]
  },
  {
    type: 'compiler',
    title: 'JS Practice Sandbox',
    description: 'Run JavaScript instantly while learning.',
    meta: 'JavaScript',
    link: '/practice#compiler'
  },
  {
    type: 'free-course',
    title: 'Free Python Starter',
    description: 'Self-paced intro before enrolling in a paid track.',
    meta: 'Free · Self-paced',
    link: '/programs/free-python-starter'
  }
];

const statsData = [
  { key: 'students_trained', label: 'Learners Trained', value: '8,500+', description: 'Students & working learners mentored at eBodhi' },
  { key: 'internships', label: 'Internship Projects', value: '1,200+', description: 'Industrial training & internship-style projects guided' },
  { key: 'mentors', label: 'Industry Mentors', value: '20+', description: 'Practitioners coaching live batches' },
  { key: 'placed', label: 'Career Transitions', value: '650+', description: 'Internships and junior roles supported' },
  { key: 'median_hike', label: 'Avg. Outcome Lift', value: '2.1x', description: 'Reported skill/outcome lift among placed learners' },
  { key: 'highest_package', label: 'Top Package', value: '₹12 LPA', description: 'Highest among recent eBodhi cohorts' }
];

const seedDatabase = async ({ closeConnection = true, exitProcess = true } = {}) => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log('Connecting to database...');
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ebodhi');
    }
    console.log('Connected. Clearing collections...');

    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Testimonial.deleteMany({}),
      Masterclass.deleteMany({}),
      Mentor.deleteMany({}),
      Alumni.deleteMany({}),
      Resource.deleteMany({}),
      SiteStat.deleteMany({}),
      SiteSettings.deleteMany({}),
      Enrollment.deleteMany({})
    ]);

    const adminUser = new User({
      role: 'admin',
      username: 'admin',
      name: 'eBodhi Admin',
      email: 'admin@ebodhi.com',
      password: 'admin123'
    });
    await adminUser.save();

    const student = new User({
      role: 'student',
      name: 'Demo Student',
      email: 'student@ebodhi.com',
      phone: '9876543210',
      password: 'student123'
    });
    await student.save();

    const courses = await Course.insertMany(coursesData);
    await ensureAllLms();
    await Testimonial.insertMany(testimonialsData);
    await Mentor.insertMany(mentorsData);
    await Alumni.insertMany(alumniData);
    await Resource.insertMany(resourcesData);
    await SiteStat.insertMany(statsData);
    await SiteSettings.create({
      key: 'main',
      logoUrl: '',
      phone: '+91-141-404-5555',
      instagram: 'https://www.instagram.com/',
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.linkedin.com/'
    });

    const soon = new Date();
    soon.setDate(soon.getDate() + 7);
    const later = new Date();
    later.setDate(later.getDate() + 14);

    await Masterclass.insertMany([
      {
        title: 'Build & Deploy a Mini Full Stack App',
        domain: 'Full Stack',
        date: soon,
        mentor: 'Ananya Kapoor',
        seats: 80,
        description: 'Weekend workshop: React UI + Express API + deploy checklist for internship portfolios.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60'
      },
      {
        title: 'Data Analytics Dashboard Sprint',
        domain: 'Data Analytics',
        date: later,
        mentor: 'Vikram Singh',
        seats: 60,
        description: 'Hands-on workshop: Excel/SQL cleanup to a Power BI style dashboard for a business case.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60'
      }
    ]);

    const fullstack = courses.find((c) => c.slug === 'full-stack-development');
    if (fullstack) {
      await Enrollment.create({
        student: student._id,
        course: fullstack._id,
        progress: [{ moduleIndex: 0, completed: true, completedAt: new Date() }],
        status: 'active'
      });
    }

    console.log('Seed complete.');
    console.log('Admin: admin / admin123');
    console.log('Student: student@ebodhi.com / student123');
    if (closeConnection) await mongoose.connection.close();
    if (exitProcess) process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    if (exitProcess) process.exit(1);
    throw error;
  }
};

const workshopSeedData = () => {
  const soon = new Date();
  soon.setDate(soon.getDate() + 7);
  const later = new Date();
  later.setDate(later.getDate() + 14);
  return [
    {
      title: 'Build & Deploy a Mini Full Stack App',
      domain: 'Full Stack',
      date: soon,
      mentor: 'Ananya Kapoor',
      seats: 80,
      description: 'Weekend workshop: React UI + Express API + deploy checklist for internship portfolios.',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60'
    },
    {
      title: 'Data Analytics Dashboard Sprint',
      domain: 'Data Analytics',
      date: later,
      mentor: 'Vikram Singh',
      seats: 60,
      description: 'Hands-on workshop: Excel/SQL cleanup to a Power BI style dashboard for a business case.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60'
    }
  ];
};

/** Fill any missing content collections without wiping existing data. */
const ensureSeeded = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ebodhi');
  }

  const [courses, testimonials, workshops, mentors, alumni, resources, stats, settings, admins] = await Promise.all([
    Course.countDocuments(),
    Testimonial.countDocuments(),
    Masterclass.countDocuments(),
    Mentor.countDocuments(),
    Alumni.countDocuments(),
    Resource.countDocuments(),
    SiteStat.countDocuments(),
    SiteSettings.countDocuments(),
    User.countDocuments({ role: 'admin' })
  ]);

  // Fully empty DB → run the full seed once
  if (courses === 0 && testimonials === 0 && workshops === 0) {
    console.log('Empty content database — running full auto-seed…');
    await seedDatabase({ closeConnection: false, exitProcess: false });
    return true;
  }

  let filled = false;

  if (courses === 0) {
    await Course.insertMany(coursesData);
    console.log('Auto-seeded courses');
    filled = true;
  }
  if (testimonials === 0) {
    await Testimonial.insertMany(testimonialsData);
    console.log('Auto-seeded testimonials');
    filled = true;
  }
  if (workshops === 0) {
    await Masterclass.insertMany(workshopSeedData());
    console.log('Auto-seeded workshops');
    filled = true;
  }
  if (mentors === 0) {
    await Mentor.insertMany(mentorsData);
    console.log('Auto-seeded mentors');
    filled = true;
  }
  if (alumni === 0) {
    await Alumni.insertMany(alumniData);
    console.log('Auto-seeded alumni');
    filled = true;
  }
  if (resources === 0) {
    await Resource.insertMany(resourcesData);
    console.log('Auto-seeded resources');
    filled = true;
  }
  if (stats === 0) {
    await SiteStat.insertMany(statsData);
    console.log('Auto-seeded stats');
    filled = true;
  }
  if (settings === 0) {
    await SiteSettings.create({
      key: 'main',
      logoUrl: '',
      phone: '+91-141-404-5555',
      instagram: 'https://www.instagram.com/',
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.linkedin.com/'
    });
    console.log('Auto-seeded site settings');
    filled = true;
  }
  if (admins === 0) {
    await User.create({
      role: 'admin',
      username: 'admin',
      name: 'eBodhi Admin',
      email: 'admin@ebodhi.com',
      password: 'admin123'
    });
    console.log('Auto-seeded admin user');
    filled = true;
  }

  try {
    const lms = await ensureAllLms();
    if (lms) filled = true;
  } catch (err) {
    console.error('LMS seed warning:', err.message);
  }

  if (!filled) console.log('Content collections already populated — skip auto-seed');
  return filled;
};

if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, ensureSeeded, ensureAllLms, ensureCourseLms };
