export const PROGRAMS = [
  {
    slug: 'school',
    audience: 'school',
    name: 'School Students',
    grades: 'Grades 3–12',
    badge: 'AI Literacy Program',
    tagline: 'AI literacy for every classroom',
    description:
      'A 10-year pathway from AI Explorer to AI Future Leader — 36 sessions a year with a capstone every grade.',
    emoji: '🚀',
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    softBg: 'bg-amber-50',
    points: ['NEP 2020 aligned', 'No coding faculty required', 'Yearly capstone projects'],
    href: '/programs/school',
  },
  {
    slug: 'college',
    audience: 'college',
    name: 'College Students',
    grades: 'BTech · BCA · MCA · MTech',
    badge: 'Industry-Ready Skills',
    tagline: 'Future-ready before you graduate',
    description:
      'Degree-aligned training with industry mentors, real projects and placement preparation.',
    emoji: '🎓',
    gradient: 'from-blue-600 to-indigo-700',
    softBg: 'bg-blue-50',
    points: ['Industry mentors', 'Portfolio projects', 'Internship & placement prep'],
    href: '/programs/college',
  },
  {
    slug: 'professionals',
    audience: 'professionals',
    name: 'Working IT Professionals',
    grades: 'Upskilling · Career switch',
    badge: 'Career Upskilling',
    tagline: 'Upgrade skills without pausing your career',
    description:
      'Flexible, certification-oriented tracks in cloud, DevOps, data and applied AI.',
    emoji: '💼',
    gradient: 'from-emerald-500 to-teal-700',
    softBg: 'bg-emerald-50',
    points: ['Weekend-friendly learning', 'Industry certifications', 'Applied, job-relevant tracks'],
    href: '/programs/professionals',
  },
];

export function getProgram(slug) {
  return PROGRAMS.find((p) => p.slug === slug);
}
