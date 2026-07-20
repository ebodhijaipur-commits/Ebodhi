import React from 'react';
import { Link } from 'react-router-dom';
import {
  Eye, Target, BookOpen, Hand, Compass, Palette, ArrowRight, Sparkles, Users,
  Lightbulb, Brain, Puzzle, Code2, Rocket, GraduationCap, Building2
} from 'lucide-react';
import AboutMissionReel from '../components/AboutMissionReel';
import Reveal from '../components/Reveal';

const approaches = [
  {
    icon: Hand,
    title: 'Learning By Doing',
    text: 'The best way for professionals to learn is by doing. Our courses give learners the opportunity to work on coding projects while building new skills.'
  },
  {
    icon: Compass,
    title: 'Guided Learning',
    text: 'The teacher guides students through the learning process — engaging them, inspiring them, and encouraging them to ask questions.'
  },
  {
    icon: Palette,
    title: 'A Creative Approach To Learning',
    text: 'Role-playing of real-life circumstances and creative inquiry — such as projects inspired by learner interests — are part of our flexible classroom environment.'
  }
];

const whoHighlights = [
  { icon: Building2, label: 'GIPL since 2001' },
  { icon: Users, label: '200+ tech team' },
  { icon: GraduationCap, label: 'Live 1:1 & online' },
  { icon: Lightbulb, label: 'Hands-on learning' }
];

const visionChips = [
  { icon: Brain, label: 'Analytical reasoning' },
  { icon: Puzzle, label: 'Problem-solving' },
  { icon: Lightbulb, label: 'Creative thinking' },
  { icon: Code2, label: 'Code literacy' }
];

const missionChips = [
  { icon: Sparkles, label: 'Engagement first' },
  { icon: Rocket, label: 'Innovate & create' },
  { icon: Users, label: 'Share & grow' },
  { icon: Target, label: '21st-century skills' }
];

function FloatField({ items, tone = 'light' }) {
  return (
    <div className={`about-float-field about-float-field-${tone}`} aria-hidden="true">
      <span className="about-float-blob about-float-blob-a" />
      <span className="about-float-blob about-float-blob-b" />
      <span className="about-float-ring" />
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <span key={item.label} className="about-float-chip" style={{ '--i': i }}>
            <Icon size={16} strokeWidth={2.2} />
            {item.label}
          </span>
        );
      })}
    </div>
  );
}

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero about-hero-story">
        <div className="about-hero-glow" aria-hidden="true" />
        <div className="about-hero-glow about-hero-glow-b" aria-hidden="true" />
        <div className="about-hero-grid" aria-hidden="true" />
        <div className="container about-hero-story-inner">
          <div className="about-hero-intro">
            <span className="about-kicker about-kicker-light">
              <Sparkles size={14} /> About eBodhi
            </span>
            <h1>About eBodhi</h1>
            <p>Fun-based coding school for professionals — live training that builds confidence, portfolios, and career readiness.</p>
            <div className="about-hero-actions">
              <Link to="/programs" className="btn btn-accent">
                Explore programs <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="btn btn-ghost about-hero-ghost">Register now</Link>
            </div>
          </div>
          <AboutMissionReel />
        </div>
      </section>

      <section className="about-band about-band-light about-band-rich">
        <div className="about-band-orb about-orb-a" aria-hidden="true" />
        <div className="about-band-lines" aria-hidden="true" />
        <div className="container about-split-story">
          <Reveal className="about-story-visual" delay={40}>
            <FloatField items={whoHighlights} tone="light" />
          </Reveal>
          <div className="about-story-copy">
            <Reveal delay={0}>
              <div className="about-head about-head-left">
                <span className="about-kicker">
                  <Users size={14} /> Who are we?
                </span>
                <h2>We are a team of experts in technology who teach professionals to code.</h2>
              </div>
            </Reveal>
            <div className="about-prose-body">
              <Reveal delay={80} as="p">
                Ebodhi is a programming-based creative and educational platform where professionals learn to code
                and acquire skills such as logical reasoning, problem-solving, and creative thinking. With Ebodhi&apos;s
                interesting coding sessions, learners explore the programming world with confidence and excellence.
              </Reveal>
              <Reveal delay={140} as="p">
                Ebodhi is an initiative by GIPL — a leading technology company established in 2001 with over 200
                technical team members. We provide live 1:1 sessions and online classes at Ebodhi, a platform that
                makes it simple for professionals to learn to code. We, at Ebodhi, encourage and enlighten the next
                generation of builders to prepare them for a dynamic digital world.
              </Reveal>
              <Reveal delay={200} as="p">
                Our courses are designed to foster curiosity, active involvement, and hands-on learning. Our creative
                curriculum is created by a group of professional programmers and trainers, many of whom are also
                experienced industry mentors. Students&apos; learning is tailored to their own requirements and speed
                when they are taught in small groups. Finally, each class is enjoyable, informative, and engaging!
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="about-band about-band-dark about-band-rich">
        <div className="about-band-shine" aria-hidden="true" />
        <div className="about-band-particles" aria-hidden="true">
          <i /><i /><i /><i /><i /><i />
        </div>
        <div className="container about-split-story about-split-story-flip">
          <div className="about-story-copy">
            <Reveal delay={0}>
              <div className="about-head about-head-left about-head-light">
                <span className="about-kicker about-kicker-light">
                  <Eye size={14} /> Our vision
                </span>
                <h2>Empower professionals with coding</h2>
              </div>
            </Reveal>
            <div className="about-prose-body about-prose-body-light">
              <Reveal delay={80} as="p">
                Our vision is to make coding accessible to professionals, making it fun and easy to learn. We propose
                a fun learning experience where the next generation of programmers are born and nurtured through an
                interactive platform where programming knowledge is gained through collaborative learning.
              </Reveal>
              <Reveal delay={140} as="p">
                Coding is a new type of literacy that is a &quot;must-have&quot; ability for every aspiring professional,
                regardless of their future ambitions. It teaches learners about the digital world and equips them with
                skills such as analytical reasoning, problem-solving, creative thinking, and many others that they need
                to participate actively in it. Same as learning the fundamentals of any craft, the sooner professionals
                are introduced to coding, the simpler it is for them to understand the core concepts.
              </Reveal>
              <Reveal delay={200} as="p">
                We believe that with the right approach and effort, anyone can learn to code; hence, the only
                requirement at Ebodhi is enthusiasm. Our courses are created to cater to various requirements and
                interests of learners. When we say that programming is for everyone, we feel that professionals at
                every stage can learn how to express themselves through programming depending on their personal interests.
              </Reveal>
            </div>
          </div>
          <Reveal className="about-story-visual" delay={60}>
            <FloatField items={visionChips} tone="dark" />
          </Reveal>
        </div>
      </section>

      <section className="about-band about-band-light about-band-rich">
        <div className="about-band-orb about-orb-a" aria-hidden="true" />
        <div className="about-band-lines about-band-lines-alt" aria-hidden="true" />
        <div className="container about-split-story">
          <Reveal className="about-story-visual" delay={40}>
            <FloatField items={missionChips} tone="amber" />
          </Reveal>
          <div className="about-story-copy">
            <Reveal delay={0}>
              <div className="about-head about-head-left">
                <span className="about-kicker">
                  <Target size={14} /> Our mission
                </span>
                <h2>Teaching skills that matter</h2>
              </div>
            </Reveal>
            <div className="about-prose-body">
              <Reveal delay={80} as="p">
                We believe that traditional learning methods should be challenged and that innovative curriculums
                represent the bright future of global education systems. In order to accomplish a pleasant and
                successful learning process, we focus on engagement and user experience while designing our products.
              </Reveal>
              <Reveal delay={140} as="p">
                We cultivate a thorough grasp of technology and education, resulting in a product that instructors can
                readily use and that professionals enjoy. We realised how important code literacy can be for a
                learner&apos;s career since we started coding early in the 1990s. We aim to provide an entertaining
                platform where people can learn programming skills while also developing 21st-century skills by
                innovating, creating, and sharing.
              </Reveal>
              <Reveal delay={200} as="p">
                We wish to create a worldwide, dynamic learning environment that brings fun, knowledge, and
                opportunities into the careers of our learners.
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="about-band about-band-dark about-band-rich">
        <div className="about-band-shine" aria-hidden="true" />
        <div className="container">
          <Reveal delay={0}>
            <div className="about-head about-head-light">
              <span className="about-kicker about-kicker-light">
                <BookOpen size={14} /> Our curriculum
              </span>
              <h2>Comprehensive coding curriculum for professionals</h2>
            </div>
          </Reveal>
          <div className="about-curriculum-stage">
            <Reveal className="about-curriculum-track" delay={80}>
              <div className="about-curriculum-step" style={{ '--i': 0 }}>
                <span>01</span>
                <strong>Learn</strong>
                <em>Foundations that stick</em>
              </div>
              <div className="about-curriculum-step" style={{ '--i': 1 }}>
                <span>02</span>
                <strong>Build</strong>
                <em>Projects from day one</em>
              </div>
              <div className="about-curriculum-step" style={{ '--i': 2 }}>
                <span>03</span>
                <strong>Present</strong>
                <em>Demo with confidence</em>
              </div>
              <div className="about-curriculum-step" style={{ '--i': 3 }}>
                <span>04</span>
                <strong>Portfolio</strong>
                <em>Web pages &amp; apps</em>
              </div>
            </Reveal>
            <div className="about-prose-body about-prose-body-light about-curriculum-copy">
              <Reveal delay={120} as="p">
                Ebodhi&apos;s curriculum is based on years of experience as well as tried and tested research. Our online
                coding courses for professionals include hands-on learning projects that they will love! Learners are
                involved in the coding and project creation process from the start. The curriculum guides students
                through the process of developing and presenting their projects.
              </Reveal>
              <Reveal delay={180} as="p">
                Every coding lesson in a course builds on the one before it, so students finish with a comprehensive
                understanding of coding abilities and a portfolio full of cool, functional web pages and apps. When
                professionals have devoted tutors and supporting classmates, they learn more effectively. Live online
                interaction with teachers and classmates gives learners the motivation they need to excel in coding.
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="about-band about-band-light about-band-rich">
        <div className="about-band-orb about-orb-a" aria-hidden="true" />
        <div className="container">
          <Reveal delay={0}>
            <div className="about-head">
              <span className="about-kicker">How learning works</span>
              <h2>Three pillars of our classroom</h2>
              <p>The same approach from our teaching philosophy — built for real skill and career growth.</p>
            </div>
          </Reveal>
          <div className="about-approach-grid">
            {approaches.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} className="reveal-card" delay={60 + i * 90}>
                  <article className="about-approach" style={{ '--i': i }}>
                    <div className="about-approach-icon"><Icon size={22} strokeWidth={2.1} /></div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <span className="about-approach-glow" aria-hidden="true" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-band about-band-dark about-cta-band">
        <div className="about-band-shine" aria-hidden="true" />
        <div className="about-cta-rings" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="container about-cta-inner">
          <Reveal delay={0}>
            <span className="about-kicker about-kicker-light">So, what are you waiting for?</span>
            <h2>Start learning the fundamentals of computer science and prepare for the future!</h2>
            <p>
              Join live sessions, build portfolio projects, and develop the skills that open doors to internships
              and professional opportunities.
            </p>
            <Link to="/register" className="btn btn-accent about-cta-btn">
              Register now <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
