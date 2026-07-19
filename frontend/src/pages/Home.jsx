import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Trophy, Briefcase, ArrowRight, Code2, BarChart3, Star, Wrench, GraduationCap, Infinity, Rocket, MessageCircle, Calendar, User, Sparkles, Megaphone, Smartphone, LineChart
} from 'lucide-react';
import ProgramCard from '../components/ProgramCard';
import CallbackForm from '../components/CallbackForm';
import HeroBackground from '../components/HeroVisuals';
import CountUp from '../components/CountUp';
import StoriesSlider from '../components/StoriesSlider';
import { fallbackCourses } from '../data/fallbackCourses';

const HERO_TITLE = 'Give your career a practical, GenAI-ready edge';
const HERO_LEAD = 'Excel with expert guidance — Full Stack, Data Science with AI/ML, Digital Marketing, Data Analytics, and App Development with capstones and mentor support.';

const domains = [
  {
    name: 'Full Stack',
    blurb: 'Ship end-to-end apps with modern frontend, APIs, and databases.',
    icon: Code2,
    to: '/programs?category=Full%20Stack',
    tone: 'amber'
  },
  {
    name: 'Data Science with AI/ML',
    blurb: 'From EDA to ML and GenAI workflows — projects that show real insight.',
    icon: BarChart3,
    to: '/programs?category=Data%20Science',
    tone: 'sky'
  },
  {
    name: 'Digital Marketing',
    blurb: 'SEO, social, paid ads, and campaign projects recruiters can evaluate.',
    icon: Megaphone,
    to: '/programs?category=Digital%20Marketing',
    tone: 'mint'
  },
  {
    name: 'Data Analytics',
    blurb: 'Excel, SQL, and dashboards that turn raw data into decisions.',
    icon: LineChart,
    to: '/programs?category=Data%20Analytics',
    tone: 'violet'
  },
  {
    name: 'App Development',
    blurb: 'Android and iOS apps with modern UI, APIs, and store-ready builds.',
    icon: Smartphone,
    to: '/programs?category=App%20Development',
    tone: 'coral'
  }
];

const whyUs = [
  {
    icon: Wrench,
    title: 'Dynamic Hands-on Experience',
    text: 'Labs and capstones that mirror real industrial problems — not slide-only theory.',
    accent: 'amber'
  },
  {
    icon: GraduationCap,
    title: 'Proficient Instructors',
    text: 'Mentors who ship products and coach you on how teams actually work.',
    accent: 'sky'
  },
  {
    icon: Infinity,
    title: 'Flexible Learning Paths',
    text: 'Online live, Jaipur campus, and internship-style tracks for college & early pros.',
    accent: 'navy'
  },
  {
    icon: Rocket,
    title: 'Internship-Ready Projects',
    text: 'Portfolio pieces recruiters can evaluate — with review cycles and demo days.',
    accent: 'amber'
  },
  {
    icon: MessageCircle,
    title: 'Mentor Feedback Loops',
    text: 'Code reviews, interview drills, and career check-ins so you never learn alone.',
    accent: 'sky'
  },
  {
    icon: Trophy,
    title: 'Outcome-Focused Mentorship',
    text: 'From campus projects to junior roles — guided toward real career movement.',
    accent: 'navy'
  }
];

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [stats, setStats] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [live, setLive] = useState(false);
  const [pulse, setPulse] = useState(0);
  const pulseTimer = useRef(null);
  const heroRef = useRef(null);
  const liveRef = useRef(false);

  const onPointer = useCallback((p) => {
    const el = heroRef.current;
    if (el) {
      el.style.setProperty('--mx', `${p.x * 100}%`);
      el.style.setProperty('--my', `${p.y * 100}%`);
      el.style.setProperty('--energy', String(p.energy));
      el.style.setProperty('--tilt-x', `${(p.x - 0.5) * 8}deg`);
      el.style.setProperty('--tilt-y', `${(0.5 - p.y) * 6}deg`);
    }
    if (p.active !== liveRef.current) {
      liveRef.current = p.active;
      setLive(p.active);
    }
  }, []);

  const onPulse = useCallback(() => {
    setPulse(1);
    if (pulseTimer.current) window.clearTimeout(pulseTimer.current);
    pulseTimer.current = window.setTimeout(() => setPulse(0), 700);
  }, []);

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setCourses(d);
        else setCourses(fallbackCourses);
      })
      .catch(() => setCourses(fallbackCourses));
    fetch('/api/testimonials').then((r) => r.json()).then((d) => { if (Array.isArray(d)) setTestimonials(d); }).catch(() => {});
    fetch('/api/masterclasses').then((r) => r.json()).then((d) => { if (Array.isArray(d)) setWorkshops(d); }).catch(() => {});
    fetch('/api/stats').then((r) => r.json()).then((d) => { if (Array.isArray(d)) setStats(d); }).catch(() => {});
  }, []);

  const categories = ['All', ...new Set(courses.map((c) => c.category))];
  const filtered = activeTab === 'All'
    ? courses.filter((c) => c.featured || !c.isFree)
    : courses.filter((c) => c.category === activeTab);
  const impactIcons = {
    students_trained: Users,
    internships: Briefcase,
    mentors: GraduationCap,
    placed: Trophy,
    1: Users,
    2: Briefcase,
    3: GraduationCap,
    4: Trophy
  };
  const impactFallback = [
    { key: 'students_trained', value: '8,500+', label: 'Learners Trained', description: 'Students & working learners mentored at eBodhi' },
    { key: 'internships', value: '1,200+', label: 'Internship Projects', description: 'Industrial training & internship-style projects guided' },
    { key: 'mentors', value: '20+', label: 'Industry Mentors', description: 'Practitioners coaching live batches' },
    { key: 'placed', value: '650+', label: 'Career Transitions', description: 'Internships and junior roles supported' }
  ];
  const impact = (stats.filter((s) => ['students_trained', 'internships', 'mentors', 'placed'].includes(s.key)));
  const impactItems = impact.length ? impact : impactFallback;

  return (
    <div>
      <section
        ref={heroRef}
        className={`hero hero-full ${live ? 'is-live' : ''} ${pulse ? 'is-pulse' : ''}`}
        style={{ '--mx': '50%', '--my': '45%', '--energy': 0, '--tilt-x': '0deg', '--tilt-y': '0deg' }}
      >
        <HeroBackground onPointer={onPointer} onPulse={onPulse} />
        <div className="container hero-content">
          <div className="hero-chip-live">
            <Star size={14} fill="currentColor" /> Industry-led skill development · Jaipur & Online
          </div>
          <h1 className="hero-title-live" aria-label={HERO_TITLE}>
            {HERO_TITLE.split(' ').map((word, i) => (
              <span key={`${word}-${i}`} className="hero-word" style={{ '--i': i }}>{word}</span>
            ))}
          </h1>
          <p className="hero-lead hero-lead-live">{HERO_LEAD}</p>
          <div className="hero-stats">
            <div className="hero-stat hero-stat-live" style={{ '--i': 0 }}><Users size={16} /> 8,500+ Learners</div>
            <div className="hero-stat hero-stat-live" style={{ '--i': 1 }}><Trophy size={16} /> 1,200+ Internship Projects</div>
            <div className="hero-stat hero-stat-live" style={{ '--i': 2 }}><Briefcase size={16} /> 20+ Industry Mentors</div>
          </div>
          <div className="hero-actions">
            <Link to="/programs" className="btn btn-primary hero-cta-live" style={{ background: '#2563eb' }}>Explore Courses</Link>
            <a href="#callback" className="btn btn-secondary hero-cta-live">Talk to Advisor</a>
          </div>
        </div>
      </section>

      <section className="section why-section" id="why-ebodhi">
        <div className="why-glow" aria-hidden="true" />
        <div className="why-grid-bg" aria-hidden="true" />
        <div className="container why-inner">
          <div className="why-intro">
            <span className="why-kicker">Built for builders</span>
            <h2>
              Why Learners Choose <em>eBodhi</em>
            </h2>
            <p>
              Tailored tracks for college students and early professionals — with exceptional hands-on value that sticks.
            </p>
            <Link to="/programs" className="btn btn-primary why-cta">
              Explore programs <ArrowRight size={16} />
            </Link>
          </div>
          <div className="why-features">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`why-feature why-accent-${item.accent}`}
                  style={{ '--i': i }}
                >
                  <span className="why-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className="why-icon">
                    <Icon size={22} strokeWidth={2.1} />
                  </div>
                  <div className="why-copy">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section programs-section" id="programs">
        <div className="programs-orb programs-orb-a" aria-hidden="true" />
        <div className="programs-orb programs-orb-b" aria-hidden="true" />
        <div className="container programs-inner">
          <div className="programs-head">
            <div>
              <span className="programs-kicker">Career tracks</span>
              <h2>Skill Development Programs</h2>
              <p>Choose a track, build projects, and prepare for internships or junior roles.</p>
            </div>
            <Link to="/programs" className="btn btn-primary programs-head-cta">
              View all courses <ArrowRight size={16} />
            </Link>
          </div>

          <div className="programs-tabs" role="tablist" aria-label="Program categories">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={activeTab === c}
                className={`programs-tab ${activeTab === c ? 'active' : ''}`}
                onClick={() => setActiveTab(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="programs-grid">
            {filtered.slice(0, 6).map((course, i) => (
              <ProgramCard
                key={course._id}
                course={course}
                variant="showcase"
                featured={i === 0 && activeTab === 'All'}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="programs-empty">No programs in this category yet — try another track.</p>
          )}

          <div className="programs-footer">
            <Link to="/programs" className="btn btn-accent">
              Browse full catalog <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section domains-section" id="domains">
        <div className="domains-shine" aria-hidden="true" />
        <div className="domains-lines" aria-hidden="true" />
        <div className="container domains-inner">
          <div className="domains-head">
            <span className="domains-kicker">Pick your path</span>
            <h2>Explore Learning Domains</h2>
            <p>Find the track that matches your background — from campus projects to job-bootcamp intensity.</p>
          </div>
          <div className="domains-bento">
            {domains.map((d, i) => {
              const Icon = d.icon;
              return (
                <Link
                  key={d.name}
                  to={d.to}
                  className={`domain-tile domain-tone-${d.tone} ${i === 0 ? 'is-lead' : ''}`}
                  style={{ '--i': i }}
                >
                  <span className="domain-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className="domain-icon"><Icon size={20} strokeWidth={2.1} /></div>
                  <div className="domain-copy">
                    <h3>{d.name}</h3>
                    <p>{d.blurb}</p>
                  </div>
                  <span className="domain-cta">
                    See programs <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section impact-section" id="impact">
        <div className="impact-glow" aria-hidden="true" />
        <div className="container impact-inner">
          <div className="impact-head">
            <span className="impact-kicker">Proof in numbers</span>
            <h2>Our Impact Numbers</h2>
            <p>Join a growing community of career aspirants across Rajasthan and beyond.</p>
          </div>
          <div className="impact-grid">
            {impactItems.map((s, i) => {
              const Icon = impactIcons[s.key] || Users;
              return (
                <article
                  key={s.key}
                  className="impact-card"
                  style={{ '--i': i }}
                >
                  <div className="impact-icon"><Icon size={22} strokeWidth={2.1} /></div>
                  <CountUp value={s.value} duration={1500 + i * 120} />
                  <h3>{s.label}</h3>
                  {s.description && <p>{s.description}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section stories-section" id="stories">
        <div className="stories-bg" aria-hidden="true" />
        <div className="container stories-inner">
          <div className="stories-head">
            <span className="stories-kicker">Learner voices</span>
            <h2>What Learners Say</h2>
            <p>Tap a learner to hear their story — or let the reel play through.</p>
          </div>
          <StoriesSlider items={testimonials} />
        </div>
      </section>

      <section className="section workshops-section" id="workshops">
        <div className="workshops-decor" aria-hidden="true" />
        <div className="container workshops-inner">
          <div className="workshops-head">
            <div>
              <span className="workshops-kicker">
                <Sparkles size={14} /> Live sessions
              </span>
              <h2>Upcoming Workshops</h2>
              <p>Short, intensive sessions to deepen a skill before you commit to a full track.</p>
            </div>
            <Link to="/workshops" className="btn btn-primary workshops-head-cta">
              View all workshops <ArrowRight size={16} />
            </Link>
          </div>

          {workshops.length > 0 ? (
            <div className="workshops-stack">
              {workshops.slice(0, 3).map((m, i) => {
                const date = m.date ? new Date(m.date) : null;
                const valid = date && !Number.isNaN(date.getTime());
                const day = valid ? date.toLocaleDateString('en-IN', { day: '2-digit' }) : '--';
                const month = valid ? date.toLocaleDateString('en-IN', { month: 'short' }) : '';
                const weekday = valid ? date.toLocaleDateString('en-IN', { weekday: 'short' }) : '';
                const isLead = i === 0;
                return (
                  <article
                    key={m._id}
                    className={`workshop-ticket ${isLead ? 'is-lead' : ''}`}
                    style={{ '--i': i }}
                  >
                    <div className="workshop-ticket-date">
                      <span className="workshop-weekday">{weekday || 'TBA'}</span>
                      <span className="workshop-day">{day}</span>
                      <span className="workshop-month">{month}</span>
                    </div>
                    <div className="workshop-ticket-media">
                      <img
                        src={m.imageUrl || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=60'}
                        alt=""
                      />
                      {isLead && <span className="workshop-hot">Next up</span>}
                    </div>
                    <div className="workshop-ticket-body">
                      <div className="workshop-ticket-tags">
                        {m.domain && <span className="workshop-domain">{m.domain}</span>}
                        {m.seats ? <span className="workshop-seats">{m.seats} seats</span> : null}
                      </div>
                      <h3>{m.title}</h3>
                      <p>{m.description}</p>
                      <div className="workshop-meta">
                        {m.mentor && (
                          <span><User size={14} /> {m.mentor}</span>
                        )}
                        {valid && (
                          <span>
                            <Calendar size={14} />
                            {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <Link to="/workshops" className={`btn ${isLead ? 'btn-accent' : 'btn-primary'} btn-sm`}>
                        Register Interest <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="workshops-empty">New workshops will be announced soon — check back shortly.</p>
          )}
        </div>
      </section>

      <section className="section section-alt" id="callback">
        <div className="container">
          <div className="callback-section">
            <div>
              <h2 style={{ marginBottom: 12 }}>Start your learning journey</h2>
              <p style={{ color: 'rgba(255,255,255,.8)', marginBottom: 16 }}>
                Tell us your college year or career goal — we&apos;ll recommend the right course or internship track.
              </p>
              <Link to="/practice" className="btn btn-ghost btn-sm">Try Practice Hub</Link>
            </div>
            <CallbackForm courses={courses} dark />
          </div>
        </div>
      </section>
    </div>
  );
}
