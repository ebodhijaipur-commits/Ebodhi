import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Layers, FolderKanban, UserRound, Calendar, Award, Rocket, Brain,
  Eye, Shapes, Lightbulb, Binary, Puzzle, ArrowRight, Mail, Phone, MapPin, Sparkles
} from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

const philosophy = [
  {
    icon: BookOpen,
    title: 'Progressive Curriculum',
    text: 'Tracks that grow with the learner — from foundations to portfolio projects across Full Stack, Data, Marketing, and App Development.'
  },
  {
    icon: Layers,
    title: 'First Skills, Then Tools',
    text: 'We teach how to think before which stack to click — so you can adapt as tools and GenAI workflows evolve.'
  },
  {
    icon: FolderKanban,
    title: 'Project-Focused Learning',
    text: 'No slide-only theory. Build real deliverables mentors can review and recruiters can evaluate.'
  },
  {
    icon: UserRound,
    title: 'Personalised Approach',
    text: 'Learn at your pace with mentor feedback loops — so no one is left behind or bored waiting.'
  }
];

const whyEbodhi = [
  { icon: Calendar, title: 'Flexible Schedule', text: 'Online live and Jaipur campus options that fit college and working learners.' },
  { icon: Award, title: 'Teaching Quality Skills', text: 'Industry mentors who coach how teams actually ship products.' },
  { icon: Rocket, title: 'Preparing For The Future', text: 'GenAI-ready habits, portfolios, and interview practice baked into tracks.' },
  { icon: Brain, title: 'Pushing Cognitive Boundaries', text: 'Problem-solving, systems thinking, and creative builds — not memorisation.' }
];

const codingSkills = [
  { icon: Eye, title: 'Problem Visualisation' },
  { icon: Shapes, title: 'Pattern Interpretation' },
  { icon: Lightbulb, title: 'Drives Innovation' },
  { icon: Binary, title: 'Algorithmic Thinking' },
  { icon: Puzzle, title: 'Problem Solving' }
];

const accomplishments = [
  'High-quality live learning that inspires you to build and ship.',
  'A wide range of tracks to keep focus while learning new abilities.',
  'Project-based courses you can demo to mentors, family, and recruiters.',
  'Assignments with trainer support during live online sessions.'
];

export default function About() {
  const { settings } = useSiteSettings();
  const phone = settings.phone || '+91-141-404-5555';
  const telHref = `tel:${phone.replace(/[^\d+]/g, '')}`;

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-glow" aria-hidden="true" />
        <div className="about-hero-grid" aria-hidden="true" />
        <div className="container about-hero-inner">
          <span className="about-kicker about-kicker-light">
            <Sparkles size={14} /> About eBodhi
          </span>
          <h1>eBodhi</h1>
          <p>
            A Jaipur-based skill academy for industrial training, job-ready courses, and GenAI-assisted learning —
            online and on campus.
          </p>
          <div className="about-hero-actions">
            <Link to="/programs" className="btn btn-accent">
              Explore programs <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-ghost about-hero-ghost">Talk to us</Link>
          </div>
        </div>
      </section>

      <section className="about-band about-band-light">
        <div className="about-band-orb about-orb-a" aria-hidden="true" />
        <div className="container">
          <div className="about-head">
            <span className="about-kicker">How we teach</span>
            <h2>Our Teaching Philosophy</h2>
            <p>Live teaching, encouraging mentors, and a supportive environment built for real outcomes.</p>
          </div>
          <div className="about-philosophy">
            {philosophy.map((item, i) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="about-philo" style={{ '--i': i }}>
                  <span className="about-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className="about-philo-icon"><Icon size={22} strokeWidth={2.1} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-band about-band-dark">
        <div className="about-band-shine" aria-hidden="true" />
        <div className="container">
          <div className="about-head about-head-light">
            <span className="about-kicker about-kicker-light">Why learners choose us</span>
            <h2>Why eBodhi?</h2>
            <p>
              We redefine learning as a community of inspiration and discovery — where you practice, create,
              and build career-ready skills with mentor support.
            </p>
          </div>
          <div className="about-why-grid">
            {whyEbodhi.map((item, i) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="about-why-tile" style={{ '--i': i }}>
                  <div className="about-why-icon"><Icon size={22} strokeWidth={2.1} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
          <div className="about-band-cta">
            <Link to="/register" className="btn btn-accent">
              Register now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="about-band about-band-light">
        <div className="container">
          <div className="about-head">
            <span className="about-kicker">Future-ready skills</span>
            <h2>Why coding &amp; digital skills matter</h2>
            <p>
              From maths and science to teamwork and creative arts — computing shapes almost every field.
              Starting earlier makes thinking in systems feel natural, and opens doors across industries.
            </p>
          </div>
          <div className="about-skills">
            {codingSkills.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`about-skill ${i % 2 === 0 ? 'is-amber' : 'is-navy'}`} style={{ '--i': i }}>
                  <Icon size={20} strokeWidth={2.1} />
                  <strong>{item.title}</strong>
                </div>
              );
            })}
          </div>
          <div className="about-band-cta">
            <Link to="/programs" className="btn btn-primary">
              Enroll now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="about-band about-band-dark about-band-split">
        <div className="container about-split">
          <div className="about-split-copy">
            <span className="about-kicker about-kicker-light">What you can achieve</span>
            <h2>There is no limit to what you can accomplish</h2>
            <ul className="about-check-list">
              {accomplishments.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="about-split-panel">
            <h3>Start your learning journey with eBodhi</h3>
            <p>
              Training that prepares you for real opportunities — logical reasoning, problem-solving,
              creative thinking, and mentor-led projects that show what you can do.
            </p>
            <Link to="/contact" className="btn btn-accent">
              Start now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="about-band about-band-light about-contact-band">
        <div className="about-contact-accent" aria-hidden="true" />
        <div className="container about-contact">
          <div className="about-head">
            <span className="about-kicker">Get in touch</span>
            <h2>Ready to talk with eBodhi?</h2>
            <p>Ask about programs, batches, campus visits, or the right track for your goals.</p>
          </div>
          <div className="about-contact-meta">
            <a href="mailto:info@ebodhi.com" className="about-contact-item">
              <Mail size={18} /> info@ebodhi.com
            </a>
            <a href={telHref} className="about-contact-item">
              <Phone size={18} /> {phone}
            </a>
            <div className="about-contact-item">
              <MapPin size={18} />
              <span>7/449, Opposite Hotel The Lalit, Malviya Nagar, Jaipur- 302017</span>
            </div>
          </div>
          <Link to="/contact" className="btn btn-primary">
            Open contact form <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
