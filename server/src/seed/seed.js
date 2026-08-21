import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

const courses = [
  {
    title: 'AI Explorer Pathway · Grades 3–4',
    slug: 'ai-explorer-pathway-grades-3-4',
    keywords: ['ai literacy', 'school', 'kids', 'nep', 'explorer'],
    description:
      'Students become AI detectives: they hunt smart helpers at home, school and in the city — then draw, storytell and stay safe. 36 sessions a year with a capstone: My AI Friend.',
    category: 'AI Literacy',
    audience: 'school',
    level: 'Beginner',
    price: 4999,
    rating: 4.9,
    students: 3200,
    outcomes: [
      'Explain AI in kid language',
      'Spot smart helpers all around them',
      'Create pictures, stories and music with AI',
      'Use AI safely — facts vs rumours',
    ],
    lessons: [
      { title: 'Understanding AI', duration: 40 },
      { title: 'AI Around Me', duration: 40 },
      { title: 'Creativity with AI', duration: 45 },
      { title: 'Safe AI Usage', duration: 35 },
      { title: 'Capstone: My AI Friend', duration: 60 },
    ],
  },
  {
    title: 'AI Learner Pathway · Grades 5–6',
    slug: 'ai-learner-pathway-grades-5-6',
    keywords: ['ai literacy', 'school', 'data', 'prompts', 'learner'],
    description:
      'Data turns into stories. Students survey classmates, train human classifiers, write better prompts and spot AI mistakes. Capstone: Data Explorer Project.',
    category: 'AI Literacy',
    audience: 'school',
    level: 'Beginner',
    price: 4999,
    rating: 4.8,
    students: 2800,
    outcomes: [
      'Collect, sort and read classroom data',
      'Understand how machines learn from examples',
      'Write prompts that get better answers',
      'Run a responsible-AI campaign',
    ],
    lessons: [
      { title: 'Data Literacy', duration: 40 },
      { title: 'Machine Learning Basics', duration: 45 },
      { title: 'Prompt Engineering', duration: 40 },
      { title: 'Responsible AI', duration: 35 },
      { title: 'Capstone: Data Explorer Project', duration: 60 },
    ],
  },
  {
    title: 'AI Creator Pathway · Grades 7–8',
    slug: 'ai-creator-pathway-grades-7-8',
    keywords: ['ai literacy', 'school', 'generative ai', 'magazine', 'creator'],
    description:
      'Generative AI becomes a studio: magazines, productivity systems and an AI startup idea on the school stage. Capstones: AI Magazine and AI Startup Idea.',
    category: 'AI Literacy',
    audience: 'school',
    level: 'Beginner',
    price: 4999,
    rating: 4.8,
    students: 2400,
    outcomes: [
      'Steer generative AI with craft',
      'Build notes, revision and research workflows',
      'Produce a full AI magazine',
      'Pitch an AI-powered student venture',
    ],
    lessons: [
      { title: 'Generative AI', duration: 45 },
      { title: 'AI Productivity', duration: 40 },
      { title: 'AI Creativity', duration: 45 },
      { title: 'Critical Thinking', duration: 35 },
      { title: 'Capstone: AI Magazine & Startup Idea', duration: 70 },
    ],
  },
  {
    title: 'AI Innovator Pathway · Grades 9–10',
    slug: 'ai-innovator-pathway-grades-9-10',
    keywords: ['ai literacy', 'school', 'llm', 'startups', 'innovator'],
    description:
      'From hospitals to farms, students map how AI, ML and LLMs reshape industries — then prototype solutions and pitch like founders. Capstone: Industry AI Report.',
    category: 'AI Literacy',
    audience: 'school',
    level: 'Intermediate',
    price: 4999,
    rating: 4.7,
    students: 1800,
    outcomes: [
      'Explain AI, ML and deep learning conceptually',
      'Understand tokens, training data and evaluation',
      'Map AI across healthcare, education, agriculture and finance',
      'Design and pitch an AI-powered solution',
    ],
    lessons: [
      { title: 'AI Fundamentals', duration: 45 },
      { title: 'Large Language Models', duration: 45 },
      { title: 'AI Applications Across Industries', duration: 40 },
      { title: 'Entrepreneurship', duration: 45 },
      { title: 'Capstone: Industry AI Report', duration: 70 },
    ],
  },
  {
    title: 'AI Future Leader Pathway · Grades 11–12',
    slug: 'ai-future-leader-pathway-grades-11-12',
    keywords: ['ai literacy', 'school', 'research', 'leadership', 'aifutureready'],
    description:
      'Research portfolios, AI agents, ethics, governance and a Grade 12 startup pitch — ready for careers and college pathways. Capstone: AI Startup Pitch on the Future Leader stage.',
    category: 'AI Literacy',
    audience: 'school',
    level: 'Advanced',
    price: 4999,
    rating: 4.9,
    students: 1400,
    outcomes: [
      'Run literature reviews and interpret data',
      'Lead teams with human–AI partnership',
      'Model SaaS and marketplace venture canvases',
      'Map careers: PM, analyst, researcher, consultant, founder',
    ],
    lessons: [
      { title: 'AI Research', duration: 50 },
      { title: 'AI Leadership', duration: 40 },
      { title: 'AI Startups', duration: 50 },
      { title: 'Future Careers', duration: 40 },
      { title: 'Capstone: AI Startup Pitch', duration: 80 },
    ],
  },
  {
    title: 'Full-Stack Web Development with AI',
    slug: 'full-stack-web-development-bootcamp',
    keywords: ['fullstack', 'web dev', 'mern', 'react', 'nodejs', 'web development', 'ai'],
    description:
      'Master modern web development with HTML, CSS, JavaScript, React, Node.js, Express and MongoDB — supercharged with AI pair-programming (GitHub Copilot, Cursor) and a capstone where you ship your own AI-powered feature like a chatbot or recommender. Built for BTech, BCA, MCA and MTech students who want job-ready skills before graduation.',
    category: 'Development',
    audience: 'college',
    level: 'Beginner',
    price: 25000,
    rating: 4.8,
    students: 1240,
    outcomes: [
      'Build responsive websites with HTML, CSS and Tailwind',
      'Create dynamic frontends with React',
      'Develop REST APIs with Node.js and Express',
      'Use AI pair-programmers to code faster and smarter',
      'Ship an AI-powered feature: chatbot or recommendation engine',
      'Model and query databases with MongoDB',
    ],
    lessons: [
      { title: 'Welcome & Environment Setup', duration: 12 },
      { title: 'HTML & CSS Fundamentals', duration: 45 },
      { title: 'JavaScript Essentials', duration: 60 },
      { title: 'React Components & State', duration: 55 },
      { title: 'Building REST APIs with Express', duration: 50 },
      { title: 'AI Pair-Programming: Copilot & Cursor Workflows', duration: 40 },
      { title: 'Adding AI Features: Chatbots & Recommendations', duration: 55 },
      { title: 'Capstone Project & Deployment', duration: 70 },
    ],
  },
  {
    title: 'Python for Data Science & AI',
    slug: 'python-for-data-science',
    keywords: ['datascience', 'pandas', 'numpy', 'analytics', 'eda', 'ai', 'python'],
    description:
      'Learn Python programming and the core data science stack — NumPy, Pandas, Matplotlib — then take your first steps into AI by training simple machine-learning models on real datasets. Ideal for engineering and computer-application students starting their AI journey.',
    category: 'Data Science',
    audience: 'college',
    level: 'Beginner',
    price: 20000,
    rating: 4.7,
    students: 980,
    outcomes: [
      'Write clean, idiomatic Python',
      'Manipulate data with NumPy and Pandas',
      'Visualize insights with Matplotlib',
      'Train your first ML models with scikit-learn',
      'Complete a full AI-ready data analysis project',
    ],
    lessons: [
      { title: 'Python Basics', duration: 40 },
      { title: 'Working with NumPy', duration: 35 },
      { title: 'DataFrames with Pandas', duration: 50 },
      { title: 'Data Visualization', duration: 45 },
      { title: 'Intro to AI: Your First Models with scikit-learn', duration: 50 },
      { title: 'EDA + AI Project: Real Dataset', duration: 65 },
    ],
  },
  {
    title: 'Machine Learning & AI Specialization',
    slug: 'machine-learning-specialization',
    keywords: ['ml', 'machinelearning', 'scikitlearn', 'aiml', 'ai', 'deeplearning'],
    description:
      'Go from fundamentals to production-ready AI. Regression, classification, clustering and model evaluation with scikit-learn, plus deep learning and an intro to LLMs — with a placement-focused project portfolio.',
    category: 'Data Science',
    audience: 'college',
    level: 'Intermediate',
    price: 30000,
    rating: 4.9,
    students: 760,
    outcomes: [
      'Understand supervised vs unsupervised learning',
      'Train and evaluate models with scikit-learn',
      'Tune hyperparameters effectively',
      'Build neural networks with TensorFlow/Keras',
      'Understand how large language models work',
      'Deploy a trained model as an API',
    ],
    lessons: [
      { title: 'ML Concepts & Terminology', duration: 30 },
      { title: 'Linear & Logistic Regression', duration: 55 },
      { title: 'Decision Trees & Ensembles', duration: 50 },
      { title: 'Clustering & Dimensionality Reduction', duration: 45 },
      { title: 'Deep Learning & Neural Networks', duration: 55 },
      { title: 'Intro to LLMs & Generative AI', duration: 45 },
      { title: 'Model Deployment Basics', duration: 40 },
    ],
  },
  {
    title: 'DSA & Placement Preparation with AI',
    slug: 'dsa-placement-preparation',
    keywords: ['placement', 'interview', 'dsa', 'coding', 'leetcode', 'campus', 'ai'],
    description:
      'Crack campus placements with patterns-based DSA training — arrays to graphs — plus AI-powered mock interviews, AI-assisted debugging practice, resume building and aptitude sessions for BTech/BCA/MCA final years.',
    category: 'Development',
    audience: 'college',
    level: 'Intermediate',
    price: 25000,
    rating: 4.8,
    students: 1520,
    outcomes: [
      'Solve 300+ curated coding problems',
      'Master arrays, trees, graphs and DP patterns',
      'Use AI tools to debug, explain and optimize solutions',
      'Practice with AI-driven mock interviews',
      'Clear HR and technical interviews',
      'Build an ATS-ready resume',
    ],
    lessons: [
      { title: 'Complexity Analysis & Arrays', duration: 50 },
      { title: 'Strings, Hashing & Two Pointers', duration: 50 },
      { title: 'Trees & Graphs', duration: 60 },
      { title: 'Dynamic Programming Patterns', duration: 55 },
      { title: 'AI-Assisted Practice: Debugging & Optimization', duration: 40 },
      { title: 'AI Mock Interviews & Resume Clinic', duration: 45 },
    ],
  },
  {
    title: 'Mobile App Development with AI',
    slug: 'mobile-app-development-bootcamp',
    keywords: ['appdev', 'flutter', 'dart', 'android', 'ios', 'mobile', 'ai'],
    description:
      'Build and ship real cross-platform apps with Flutter — from Dart fundamentals to APIs, state management and store publishing, plus integrating AI features like chatbots, image recognition and smart recommendations into your apps.',
    category: 'Development',
    audience: 'college',
    level: 'Beginner',
    price: 25000,
    rating: 4.7,
    students: 380,
    outcomes: [
      'Write clean Dart code',
      'Design beautiful UIs with Flutter widgets',
      'Manage state and connect REST APIs',
      'Integrate AI features: chatbots, vision and recommendations',
      'Publish apps to the Play Store and App Store',
    ],
    lessons: [
      { title: 'Dart Fundamentals', duration: 45 },
      { title: 'Flutter Widgets & Layouts', duration: 55 },
      { title: 'State Management', duration: 50 },
      { title: 'APIs, Storage & Notifications', duration: 50 },
      { title: 'Adding AI to Your App: Chatbot & Vision APIs', duration: 55 },
      { title: 'Capstone: Publish Your AI-Powered App', duration: 70 },
    ],
  },
  {
    title: 'Generative AI for Working Professionals',
    slug: 'generative-ai-for-working-professionals',
    keywords: ['genai', 'llm', 'chatgpt', 'rag', 'openai', 'automation'],
    description:
      'Put LLMs to work: prompt engineering, RAG, agents and automation workflows you can apply at your job from week one — no research background required.',
    category: 'Data Science',
    audience: 'professionals',
    level: 'Intermediate',
    price: 35000,
    rating: 4.8,
    students: 610,
    outcomes: [
      'Design reliable prompt systems',
      'Build retrieval-augmented (RAG) assistants',
      'Automate reporting and support workflows',
      'Evaluate cost, latency and safety trade-offs',
    ],
    lessons: [
      { title: 'LLM Landscape & Tokens', duration: 30 },
      { title: 'Prompt Engineering Systems', duration: 45 },
      { title: 'RAG & Embeddings', duration: 55 },
      { title: 'Agents & Automation', duration: 50 },
      { title: 'Shipping Responsible AI Features', duration: 40 },
    ],
  },
  {
    title: 'Digital Marketing with AI',
    slug: 'digital-marketing-mastery',
    keywords: ['seo', 'ads', 'socialmedia', 'growth', 'ga4', 'ai'],
    description:
      'SEO, social media, email campaigns and analytics — supercharged with AI content generation, AI ad targeting and marketing automation. Everything you need to plan and run modern marketing that converts.',
    category: 'Marketing',
    audience: 'college',
    level: 'Intermediate',
    price: 25000,
    rating: 4.5,
    students: 430,
    outcomes: [
      'Plan a full-funnel marketing campaign',
      'Rank content with on-page SEO',
      'Generate high-performing copy with AI tools',
      'Run paid ads on Meta and Google',
      'Automate campaigns with AI workflows',
      'Measure results with GA4',
    ],
    lessons: [
      { title: 'Marketing Strategy 101', duration: 30 },
      { title: 'SEO Essentials', duration: 45 },
      { title: 'AI Content Creation: Copy, Images & Video', duration: 45 },
      { title: 'Social Media & Content', duration: 40 },
      { title: 'Paid Ads Deep Dive', duration: 50 },
      { title: 'Marketing Automation & AI Workflows', duration: 40 },
      { title: 'Analytics & Reporting', duration: 35 },
    ],
  },
];

async function seed() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ebodhi';
  await mongoose.connect(uri);
  console.log('Connected. Seeding...');

  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    Enrollment.deleteMany({}),
  ]);

  await User.create({
    name: 'Ebodhi Instructor',
    email: 'instructor@ebodhi.com',
    password: 'password123',
    role: 'instructor',
  });

  await User.create({
    name: 'Demo Student',
    email: 'student@ebodhi.com',
    password: 'password123',
    role: 'student',
  });

  const instructor = await User.findOne({ email: 'instructor@ebodhi.com' });
  await Course.insertMany(
    courses.map((c) => ({
      ...c,
      instructor: instructor._id,
      searchText: Course.buildSearchText(c),
    }))
  );

  console.log(`Seed complete. ${courses.length} courses across 3 programs.`);
  console.log('  student@ebodhi.com / password123');
  console.log('  instructor@ebodhi.com / password123');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
