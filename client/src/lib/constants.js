export const CATEGORIES = ['All', 'AI Literacy', 'Development', 'Data Science', 'Cloud', 'Design', 'Marketing'];

export const AUDIENCES = [
  { value: '', label: 'All learners' },
  { value: 'school', label: 'School students' },
  { value: 'college', label: 'College students' },
  { value: 'professionals', label: 'IT professionals' },
];

const CATEGORY_EMOJI = {
  Development: '💻',
  'Data Science': '📊',
  Cloud: '☁️',
  Design: '🎨',
  Marketing: '📣',
  'AI Literacy': '🤖',
};

const CATEGORY_IMAGE = {
  'AI Literacy': '/images/courses/ai-literacy.svg',
  Development: '/images/courses/development.svg',
  'Data Science': '/images/courses/data-science.svg',
  Cloud: '/images/courses/cloud.svg',
  Design: '/images/courses/design.svg',
  Marketing: '/images/courses/marketing.svg',
};

export function categoryImage(name = '') {
  return CATEGORY_IMAGE[name] || '/images/courses/development.svg';
}

const COURSE_IMAGE = {
  'ai-explorer-pathway-grades-3-4': '/images/pathways/explorer.svg',
  'ai-learner-pathway-grades-5-6': '/images/pathways/learner.svg',
  'ai-creator-pathway-grades-7-8': '/images/pathways/creator.svg',
  'ai-innovator-pathway-grades-9-10': '/images/pathways/innovator.svg',
  'ai-future-leader-pathway-grades-11-12': '/images/pathways/leader.svg',
  'full-stack-web-development-bootcamp': '/images/courses/fullstack.svg',
  'mobile-app-development-bootcamp': '/images/courses/mobile-app.svg',
  'dsa-placement-preparation': '/images/courses/dsa.svg',
  'python-for-data-science': '/images/courses/python-ds.svg',
  'machine-learning-specialization': '/images/courses/machine-learning.svg',
  'generative-ai-for-working-professionals': '/images/courses/generative-ai.svg',
  'digital-marketing-mastery': '/images/courses/marketing.svg',
};

export function courseImage(course) {
  if (!course) return categoryImage();
  return COURSE_IMAGE[course.slug] || categoryImage(course.category);
}

const GRADIENTS = [
  'from-sky-500 to-blue-700',
  'from-violet-500 to-purple-700',
  'from-emerald-500 to-teal-700',
  'from-orange-500 to-red-600',
  'from-fuchsia-500 to-pink-600',
  'from-cyan-500 to-sky-700',
];

export function categoryGradient(name = '') {
  let hash = 0;
  for (const ch of name) hash += ch.charCodeAt(0);
  return GRADIENTS[hash % GRADIENTS.length];
}

export function categoryEmoji(name = '') {
  return CATEGORY_EMOJI[name] || '🎓';
}

export function formatPrice(price) {
  return price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`;
}
