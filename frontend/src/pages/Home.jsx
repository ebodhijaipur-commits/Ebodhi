import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Trophy, Briefcase, ArrowRight, Star, Wrench, GraduationCap, Infinity, Rocket, MessageCircle, Calendar, User, Sparkles
} from 'lucide-react';
import ProgramCard from '../components/ProgramCard';
import CallbackForm from '../components/CallbackForm';
import HeroBackground from '../components/HeroVisuals';
import CountUp from '../components/CountUp';
import StoriesSlider from '../components/StoriesSlider';
import Reveal from '../components/Reveal';
import { fallbackCourses } from '../data/fallbackCourses';
import { fallbackTestimonials, fallbackWorkshops } from '../data/fallbackContent';

const HERO_TITLE = 'Give your career a practical, GenAI-ready edge';
const HERO_LEAD = 'Excel with expert guidance — Full Stack, Data Science with AI/ML, Digital Marketing, Data Analytics, and App Development with capstones and mentor support.';

const domainCategoryOrder = [
  'Full Stack',
  'Data Science',
  'Digital Marketing',
  'Data Analytics',
  'App Development'
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
  const [courses, setCourses] = useState(fallbackCourses);
  const [testimonials, setTestimonials] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [stats, setStats] = useState([]);
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
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    fetch('/api/courses', { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setCourses(d);
      })
      .catch(() => {
        /* keep fallback catalog */
      })
      .finally(() => clearTimeout(timer));

    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setTestimonials(d);
        else setTestimonials(fallbackTestimonials);
      })
      .catch(() => setTestimonials(fallbackTestimonials));
    fetch('/api/masterclasses')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setWorkshops(d);
        else setWorkshops(fallbackWorkshops);
      })
      .catch(() => setWorkshops(fallbackWorkshops));
    fetch('/api/stats').then((r) => r.json()).then((d) => { if (Array.isArray(d)) setStats(d); }).catch(() => {});

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  const homeShowcaseCategories = ['Data Science', 'Full Stack', 'App Development'];
  const showcaseCourses = homeShowcaseCategories
    .map((cat) => courses.find((c) => c.category === cat))
    .filter(Boolean);
  const domainCourses = domainCategoryOrder
    .map((cat) => courses.find((c) => c.category === cat))
    .filter(Boolean);
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

      <section className="section why-section below-hero-section" id="why-ebodhi">
        <div className="why-glow" aria-hidden="true" />
        <div className="why-grid-bg" aria-hidden="true" />
        <div className="container why-inner">
          <Reveal className="why-intro" delay={0}>
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
          </Reveal>
          <div className="why-features">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  as="article"
                  className={`reveal-card why-feature why-accent-${item.accent}`}
                  delay={100 + i * 90}
                >
                  <span className="why-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className="why-icon">
                    <Icon size={22} strokeWidth={2.1} />
                  </div>
                  <div className="why-copy">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section programs-section" id="programs">
        <div className="programs-orb programs-orb-a" aria-hidden="true" />
        <div className="programs-orb programs-orb-b" aria-hidden="true" />
        <div className="container programs-inner">
          <Reveal className="programs-head" delay={0}>
            <div>
              <span className="programs-kicker">Career tracks</span>
              <h2>Skill Development Programs</h2>
              <p>Choose a track, build projects, and prepare for internships or junior roles.</p>
            </div>
            <Link to="/programs" className="btn btn-primary programs-head-cta">
              View all courses <ArrowRight size={16} />
            </Link>
          </Reveal>

          <div className="programs-grid programs-grid-3">
            {showcaseCourses.map((course, i) => (
              <Reveal key={course._id} className="reveal-card" delay={80 + i * 70}>
                <ProgramCard course={course} variant="showcase" />
              </Reveal>
            ))}
          </div>

          {showcaseCourses.length === 0 && (
            <p className="programs-empty">No programs in this category yet — try another track.</p>
          )}

          <Reveal delay={40}>
            <div className="programs-footer">
              <Link to="/programs" className="btn btn-accent">
                Browse All Courses <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section domains-section" id="domains">
        <div className="domains-shine" aria-hidden="true" />
        <div className="domains-lines" aria-hidden="true" />
        <div className="container domains-inner">
          <Reveal className="domains-head" delay={0}>
            <span className="domains-kicker">Pick your path</span>
            <h2>Explore Learning Domains</h2>
            <p>Find the track that matches your background — from campus projects to job-bootcamp intensity.</p>
          </Reveal>
          <div className="programs-grid programs-grid-domains">
            {domainCourses.map((course, i) => (
              <Reveal key={course._id || course.slug} className="reveal-card" delay={60 + i * 70}>
                <ProgramCard course={course} variant="showcase" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section impact-section" id="impact">
        <div className="impact-glow" aria-hidden="true" />
        <div className="container impact-inner">
          <Reveal className="impact-head" delay={0}>
            <span className="impact-kicker">Proof in numbers</span>
            <h2>Our Impact Numbers</h2>
            <p>Join a growing community of career aspirants across Rajasthan and beyond.</p>
          </Reveal>
          <div className="impact-grid">
            {impactItems.map((s, i) => {
              const Icon = impactIcons[s.key] || Users;
              return (
                <Reveal key={s.key} className="reveal-card" delay={80 + i * 80}>
                  <article className="impact-card" style={{ '--i': i }}>
                    <div className="impact-icon"><Icon size={22} strokeWidth={2.1} /></div>
                    <CountUp value={s.value} duration={1500 + i * 120} />
                    <h3>{s.label}</h3>
                    {s.description && <p>{s.description}</p>}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section stories-section" id="stories">
        <div className="stories-bg" aria-hidden="true" />
        <div className="container stories-inner">
          <Reveal className="stories-head" delay={0}>
            <span className="stories-kicker">Learner voices</span>
            <h2>What Learners Say</h2>
            <p>Tap a learner to hear their story — or let the reel play through.</p>
          </Reveal>
          <Reveal delay={80}>
            <StoriesSlider items={testimonials} />
          </Reveal>
        </div>
      </section>

      <section className="section workshops-section" id="workshops">
        <div className="workshops-decor" aria-hidden="true" />
        <div className="container workshops-inner">
          <Reveal className="workshops-head" delay={0}>
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
          </Reveal>

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
                  <Reveal key={m._id} className="reveal-card" delay={60 + i * 90}>
                    <article
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
                  </Reveal>
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
          <Reveal delay={0}>
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
          </Reveal>
        </div>
      </section>
    </div>
  );
}
