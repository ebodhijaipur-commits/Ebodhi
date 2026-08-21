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
