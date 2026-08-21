import Link from 'next/link';

const PHILOSOPHY = [
  ['📚', 'Progressive Curriculum', 'Our curriculum is intended to progress with your kid — different courses cater to various requirements and interests.'],
  ['🧱', 'First Skills, Then Tools', 'We concentrate on teaching coding techniques and introducing students to programming languages suited to their age and level.'],
  ['🛠️', 'Project-Focused Learning', 'No boring theoretical classes! Students learn computer science fundamentals while building projects, from websites to apps.'],
  ['🎯', 'Personalised Approach', 'Every kid learns uniquely. Students progress at their own pace — no child left behind, nobody bored.'],
];

const PILLARS = [
  {
    icon: '👁️',
    title: 'Our Vision',
    subtitle: 'Empower Kids With Coding',
    text: 'We make coding accessible, fun and easy to learn. Coding is the new literacy — a must-have ability for all youth regardless of future ambitions. Like learning the alphabet, the sooner children start, the simpler it gets. The only requirement at Ebodhi is enthusiasm.',
  },
  {
    icon: '🚀',
    title: 'Our Mission',
    subtitle: 'Teaching Skills That Matter',
    text: 'Traditional learning methods should be challenged by innovative curriculums. We cultivate a thorough grasp of technology and education, building a dynamic learning environment where people learn programming while developing 21st-century skills by innovating, creating and sharing.',
  },
  {
    icon: '📖',
    title: 'Our Curriculum',
    subtitle: 'Comprehensive & Hands-On',
    text: 'Based on years of experience and tested research, every lesson builds on the previous one. Students finish with a comprehensive understanding of coding and a portfolio full of cool, functional web pages and apps — guided by devoted tutors and supportive classmates.',
  },
];

export const metadata = {
  title: 'About Us — Ebodhi',
  description: 'Ebodhi is a programming-based creative and educational platform, an initiative by GIPL, teaching kids and students to code since 2001 heritage.',
};

export default function AboutPage() {
  return (
    <div>
      <section className="hero-mesh relative overflow-hidden border-b border-slate-100">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <span className="overline-label">About Ebodhi</span>
          <h1 className="section-title mt-3 max-w-3xl">
            A fun-based coding school for the next generation
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            We are a team of experts in technology who teach kids to code — and help college
            students and working professionals turn those foundations into careers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="overline-label">Who are we?</span>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
              An initiative by GIPL — a leading technology company
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Ebodhi is a programming-based creative and educational platform where children learn
              to code and acquire skills such as logical reasoning, problem-solving and creative
              thinking. With interesting coding sessions, kids explore the programming world with
              confidence and excellence.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              GIPL was established in 2001 with over 200 technical team members. We provide live
              sessions and online classes that make it simple for kids to learn to code —
              encouraging and enlightening the next generation for a dynamic digital world.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Our courses foster curiosity, active involvement and hands-on learning. The creative
              curriculum is designed by professional programmers and trainers — many of them
              parents themselves — and taught in small groups tailored to each student&apos;s pace.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['2001', 'GIPL established'],
              ['200+', 'Technical team members'],
              ['3', 'Learning programs'],
              ['12+', 'Expert-led courses'],
            ].map(([num, label]) => (
              <div key={label} className="card-lift rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-soft">
                <div className="font-display text-3xl font-extrabold text-gradient">{num}</div>
                <div className="mt-1 text-sm font-medium text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50/70 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="overline-label">What we believe</span>
            <h2 className="section-title mt-3">Vision, mission & curriculum</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="card-lift rounded-3xl border border-slate-100 bg-white p-7 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-2xl">{p.icon}</div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="text-sm font-bold uppercase tracking-wide text-primary">{p.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <span className="overline-label">Our teaching philosophy</span>
          <h2 className="section-title mt-3">Live teaching. Encouraging trainers. Supportive environment.</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PHILOSOPHY.map(([icon, title, desc]) => (
            <div key={title} className="card-lift rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
              <div className="text-3xl">{icon}</div>
              <h3 className="mt-3 font-display text-base font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary-dark via-primary to-indigo-600 px-8 py-14 text-center shadow-lift sm:px-14">
          <div className="dot-grid absolute inset-0 opacity-20" />
          <div className="relative">
            <h2 className="font-display text-3xl font-extrabold text-white">So, what are you waiting for?</h2>
            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              Start building fundamentals of computer science today — and prepare for the future.
            </p>
            <Link href="/courses" className="btn-primary mt-7 !bg-white !text-primary !shadow-none hover:!bg-blue-50">
              Explore courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
