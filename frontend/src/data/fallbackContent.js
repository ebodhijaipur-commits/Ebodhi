const soon = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString();
};

const later = () => {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString();
};

export const fallbackTestimonials = [
  {
    _id: 'fb-t1',
    name: 'Satyam Raj',
    courseName: 'Full Stack Development',
    review: 'Hands-on sessions were clear and practical. I finally understood how frontend and backend connect on real projects.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
  },
  {
    _id: 'fb-t2',
    name: 'Damini Srivastava',
    courseName: 'Data Science with AI/ML',
    review: 'Learned more in a short intensive than I expected. The projects pushed me to actually build, not just watch videos.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
  },
  {
    _id: 'fb-t3',
    name: 'Lalit Agarwal',
    courseName: 'Digital Marketing',
    review: 'Campaign projects and reporting practice made me feel internship-ready. Mentors explained tools the way companies actually use them.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
  }
];

export const fallbackWorkshops = [
  {
    _id: 'fb-w1',
    title: 'Build & Deploy a Mini Full Stack App',
    domain: 'Full Stack',
    date: soon(),
    mentor: 'Ananya Kapoor',
    seats: 80,
    description: 'Weekend workshop: React UI + Express API + deploy checklist for internship portfolios.',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60'
  },
  {
    _id: 'fb-w2',
    title: 'Data Analytics Dashboard Sprint',
    domain: 'Data Analytics',
    date: later(),
    mentor: 'Vikram Singh',
    seats: 60,
    description: 'Hands-on workshop: Excel/SQL cleanup to a Power BI style dashboard for a business case.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60'
  }
];
