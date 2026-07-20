import {
  Code2,
  Database,
  Server,
  GitBranch,
  Brain,
  LineChart,
  Sparkles,
  Binary,
  Megaphone,
  Share2,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Table2,
  Smartphone,
  Layers,
  AppWindow,
  Wifi,
  LayoutGrid,
  LayoutTemplate,
  Rocket,
  Award,
  BookOpen
} from 'lucide-react';

/**
 * Storyboard scenes for the hover “explainer reel”
 * — plays like a short video of what the course includes.
 */
const explainersByCategory = {
  'Full Stack': [
    {
      kicker: 'Inside this track',
      title: 'Full Stack Development',
      blurb: 'Build real products end-to-end — UI, APIs, data, and deploy.',
      icon: Rocket,
      points: ['12–14 weeks', 'Capstone projects', 'Internship-ready portfolio']
    },
    {
      kicker: 'Module 01',
      title: 'Frontend Foundations',
      blurb: 'Craft responsive interfaces with modern JavaScript.',
      icon: LayoutGrid,
      points: ['HTML5 & CSS3', 'Responsive UI', 'JavaScript ES6+', 'Component thinking']
    },
    {
      kicker: 'Module 02',
      title: 'React & Client Apps',
      blurb: 'Ship interactive SPAs with hooks and routing.',
      icon: Code2,
      points: ['Components & Hooks', 'Routing', 'API integration', 'State patterns']
    },
    {
      kicker: 'Module 03',
      title: 'Backend & Databases',
      blurb: 'Design secure APIs and persist data the right way.',
      icon: Server,
      points: ['Node.js & Express', 'MongoDB / SQL', 'REST API design', 'JWT Auth']
    },
    {
      kicker: 'Module 04',
      title: 'Deploy & Capstone',
      blurb: 'Ship to production and present a portfolio project.',
      icon: GitBranch,
      points: ['Git & GitHub', 'Hosting basics', 'Portfolio polish', 'Capstone delivery']
    },
    {
      kicker: 'You leave with',
      title: 'Job-ready skills',
      blurb: 'A full-stack project recruiters can evaluate.',
      icon: Award,
      points: ['React + Node stack', 'Live APIs', 'Deployed app', 'Interview prep']
    }
  ],
  'Data Science': [
    {
      kicker: 'Inside this track',
      title: 'Data Science with AI/ML',
      blurb: 'From raw data to models and GenAI analytics.',
      icon: Brain,
      points: ['Python first', 'ML pipelines', 'Portfolio case studies']
    },
    {
      kicker: 'Module 01',
      title: 'Python for Data',
      blurb: 'Clean, explore, and visualize datasets fast.',
      icon: Binary,
      points: ['NumPy & Pandas', 'Data cleaning', 'EDA workflows', 'Visualization']
    },
    {
      kicker: 'Module 02',
      title: 'Stats & ML Basics',
      blurb: 'Train and evaluate supervised models.',
      icon: LineChart,
      points: ['Descriptive stats', 'Regression', 'Classification', 'Model evaluation']
    },
    {
      kicker: 'Module 03',
      title: 'Applied ML & AI',
      blurb: 'Ensembles, clustering, and intro GenAI.',
      icon: Sparkles,
      points: ['Trees & ensembles', 'Clustering', 'Feature engineering', 'GenAI analytics']
    },
    {
      kicker: 'Module 04',
      title: 'Portfolio Studio',
      blurb: 'Present insights like an industry analyst.',
      icon: Award,
      points: ['Case studies', 'Reporting', 'Interview prep', 'Demo day']
    }
  ],
  'Digital Marketing': [
    {
      kicker: 'Inside this track',
      title: 'Digital Marketing',
      blurb: 'Plan campaigns that convert — SEO to paid ads.',
      icon: Megaphone,
      points: ['SEO & social', 'Paid campaigns', 'Live projects']
    },
    {
      kicker: 'Module 01',
      title: 'Marketing Foundations',
      blurb: 'Map funnels, personas, and brand voice.',
      icon: Target,
      points: ['Funnel basics', 'Brand messaging', 'Buyer personas', 'Content pillars']
    },
    {
      kicker: 'Module 02',
      title: 'SEO & Content',
      blurb: 'Rank pages and build content systems.',
      icon: LayoutTemplate,
      points: ['On-page SEO', 'Keyword research', 'Blogging systems', 'Local SEO']
    },
    {
      kicker: 'Module 03',
      title: 'Social & Paid Media',
      blurb: 'Run Meta/Google ads with clear ROI.',
      icon: Share2,
      points: ['Meta / Google ads', 'Creative testing', 'Budgets & bidding', 'Retargeting']
    },
    {
      kicker: 'Module 04',
      title: 'Analytics Capstone',
      blurb: 'Prove results with campaign storytelling.',
      icon: TrendingUp,
      points: ['GA basics', 'Campaign reporting', 'ROI storytelling', 'Portfolio case']
    }
  ],
  'Data Analytics': [
    {
      kicker: 'Inside this track',
      title: 'Data Analytics',
      blurb: 'Turn spreadsheets and SQL into decisions.',
      icon: BarChart3,
      points: ['Excel & SQL', 'Power BI dashboards', 'Business cases']
    },
    {
      kicker: 'Module 01',
      title: 'Spreadsheet Mastery',
      blurb: 'Advanced Excel for clean analysis.',
      icon: Table2,
      points: ['Advanced Excel', 'Cleaning data', 'Pivot tables', 'Charts']
    },
    {
      kicker: 'Module 02',
      title: 'SQL for Analysts',
      blurb: 'Query data with confidence.',
      icon: Database,
      points: ['Joins', 'Aggregations', 'Window functions', 'Query practice']
    },
    {
      kicker: 'Module 03',
      title: 'BI & Visualization',
      blurb: 'Build dashboards stakeholders trust.',
      icon: PieChart,
      points: ['Power BI / Tableau', 'Dashboard design', 'KPIs', 'Storytelling']
    },
    {
      kicker: 'Module 04',
      title: 'Analytics Capstone',
      blurb: 'Solve a business problem end-to-end.',
      icon: Award,
      points: ['Business problem', 'Insights deck', 'Stakeholder demo', 'Interview prep']
    }
  ],
  'App Development': [
    {
      kicker: 'Inside this track',
      title: 'App Development',
      blurb: 'Ship Android & iOS apps with modern UX.',
      icon: Smartphone,
      points: ['Mobile UI', 'APIs', 'Store-ready builds']
    },
    {
      kicker: 'Module 01',
      title: 'Mobile UI Foundations',
      blurb: 'Design screens users love.',
      icon: Layers,
      points: ['Layouts', 'Navigation', 'Design systems', 'Accessibility']
    },
    {
      kicker: 'Module 02',
      title: 'App Logic & State',
      blurb: 'Build features that feel native.',
      icon: AppWindow,
      points: ['Components', 'State', 'Forms', 'Local storage']
    },
    {
      kicker: 'Module 03',
      title: 'APIs & Cloud',
      blurb: 'Connect apps to backend services.',
      icon: Wifi,
      points: ['REST APIs', 'Auth', 'Firebase basics', 'Push & sync']
    },
    {
      kicker: 'Module 04',
      title: 'Ship to Store',
      blurb: 'Package, test, and publish.',
      icon: Rocket,
      points: ['Testing', 'Build pipelines', 'Store listing', 'Capstone app']
    }
  ]
};

export function getCourseExplainerScenes(course) {
  if (!course) return explainersByCategory['Full Stack'];

  const curated = explainersByCategory[course.category];
  if (curated) return curated;

  // Fallback from syllabus if category unknown
  const intro = {
    kicker: 'Inside this track',
    title: course.title,
    blurb: course.description?.slice(0, 90) || 'Hands-on skill development with projects.',
    icon: BookOpen,
    points: (course.highlights || []).slice(0, 3)
  };
  const modules = (course.syllabus || []).slice(0, 4).map((mod, i) => ({
    kicker: `Module ${String(i + 1).padStart(2, '0')}`,
    title: mod.moduleName,
    blurb: 'Core skills you will practice in this module.',
    icon: BookOpen,
    points: (mod.topics || []).slice(0, 4)
  }));
  return [intro, ...modules];
}

/** @deprecated use getCourseExplainerScenes */
export function getCourseContentIcons(course) {
  return getCourseExplainerScenes(course).slice(1, 7).map((s) => ({
    label: s.title,
    icon: s.icon
  }));
}
