/** Full catalog used when the API is unreachable — slugs must match the seeded DB. */
export const fallbackCourses = [
  {
    _id: 'fallback-1',
    slug: 'full-stack-development',
    title: 'Full Stack Development',
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=60',
    description: 'Job-ready full stack training covering HTML, CSS, React, Node.js, databases, REST APIs, and modern product workflows. Capstone projects built for internships and placements.',
    price: 20000,
    duration: '12–14 Weeks',
    featured: true,
    mode: 'both',
    avgSalary: '₹5–12 LPA',
    highlights: ['Capstone projects', 'React + Node', 'Internship support'],
    syllabus: [
      { moduleName: 'Frontend Foundations', topics: ['HTML5 & CSS3', 'Responsive UI', 'JavaScript ES6+', 'Component thinking'] },
      { moduleName: 'React & Client Apps', topics: ['Components & Hooks', 'Routing', 'API integration', 'State patterns'] },
      { moduleName: 'Backend & Databases', topics: ['Node.js & Express', 'MongoDB / SQL basics', 'REST API design', 'Auth with JWT'] },
      { moduleName: 'Deployment & Capstone', topics: ['Git & GitHub', 'Hosting basics', 'Portfolio polish', 'Capstone delivery'] }
    ]
  },
  {
    _id: 'fallback-2',
    slug: 'data-science-with-ai-ml',
    title: 'Data Science with AI/ML',
    category: 'Data Science',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
    description: 'From EDA and visualization to supervised ML and intro GenAI analytics. Build portfolio projects that mirror industry data problems.',
    price: 25000,
    duration: '12–14 Weeks',
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
    _id: 'fallback-3',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Digital Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop&q=60',
    description: 'Practical digital marketing covering SEO, social media, paid ads, content, and analytics — with campaign projects you can show employers.',
    price: 20000,
    duration: '12–14 Weeks',
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
    _id: 'fallback-4',
    slug: 'data-analytics',
    title: 'Data Analytics',
    category: 'Data Analytics',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    description: 'Excel, SQL, Power BI / Tableau, and business storytelling — turn raw data into decisions with internship-ready dashboards.',
    price: 25000,
    duration: '12–14 Weeks',
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
    _id: 'fallback-5',
    slug: 'app-development-android-ios',
    title: 'App Development (Android/iOS)',
    category: 'App Development',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60',
    description: 'Build mobile apps for Android and iOS with modern frameworks, UI patterns, APIs, and store-ready project workflows.',
    price: 25000,
    duration: '12–14 Weeks',
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

export const getFallbackCourse = (slug) =>
  fallbackCourses.find((c) => c.slug === slug) || null;
