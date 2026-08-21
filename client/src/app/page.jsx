'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';

const PROGRAMS = [
  {
    href: '/programs/school',
    img: '/images/program-school.svg',
    alt: 'School student waving beside a friendly robot',
    badge: 'AI Literacy Program',
    title: 'School Students',
    desc: 'Grades 3–12 journey from block coding to building real AI apps — 180 guided sessions across 5 pathways.',
    points: ['No prior coding needed', 'Project-based learning', 'Certificates per level'],
  },
  {
    href: '/programs/college',
    img: '/images/program-college.svg',
    alt: 'College graduate holding a laptop',
    badge: 'Industry-Ready Skills',
    title: 'College Students',
    desc: 'Full-stack, data science, ML and more — placement-focused training that turns freshers into job-ready engineers.',
    points: ['Interview preparation', 'Real capstone projects', 'Placement assistance'],
  },
  {
    href: '/programs/professionals',
    img: '/images/program-professionals.svg',
    alt: 'IT professional presenting a rising chart',
    badge: 'Career Upskilling',
    title: 'Working IT Professionals',
    desc: 'Weekend-friendly Generative AI training to automate workflows and stay ahead of the curve in your career.',
    points: ['Live weekend batches', 'Hands-on AI tooling', 'Led by industry mentors'],
  },
];

const STATS = [
  { value: '12+', label: 'Expert-led courses' },
  { value: '3', label: 'Learning programs' },
  { value: '180', label: 'Guided sessions' },
  { value: '100%', label: 'Project-based' },
];

const FEATURED_SLUGS = [
  'full-stack-web-development-bootcamp',
  'mobile-app-development-bootcamp',
  'python-for-data-science',
];

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`)
      .then((r) => r.json())
      .then((data) => setCourses(data.courses || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = FEATURED_SLUGS.map((s) => courses.find((c) => c.slug === s)).filter(Boolean);

  return (
    <div>
      <section className="hero-mesh relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-blob rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 animate-blob-slow rounded-full bg-purple-400/20 blur-3xl" />
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 text-center sm:px-6 lg:px-8">
          <span className="overline-label animate-fadeUp">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Jaipur&apos;s hands-on tech academy
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl animate-fadeUp font-display text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl [animation-delay:100ms]">
            Learn the skills that <span className="text-gradient">build tomorrow</span> — today
          </h1>

          <p className="mx-auto mt-5 max-w-2xl animate-fadeUp text-lg leading-relaxed text-slate-600 [animation-delay:200ms]">
            From school kids writing their first line of code to professionals mastering
            Generative AI — Ebodhi has a path for every stage of your journey.
          </p>

          <form action="/courses" method="get" className="mx-auto mt-9 flex max-w-xl animate-fadeUp items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lift [animation-delay:300ms]">
            <svg viewBox="0 0 20 20" fill="currentColor" className="ml-3 h-5 w-5 shrink-0 text-slate-400">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
            <input
              name="q"
              placeholder="Search courses — try “full stack” or “Gen AI”…"
              className="w-full bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400"
            />
            <button type="submit" className="btn-primary shrink-0 !px-5 !py-2.5 text-sm">
              Search
            </button>
          </form>

          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className={`animate-fadeUp [animation-delay:${400 + i * 100}ms]`}>
                <div className="font-display text-3xl font-extrabold text-gradient sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative -mt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="overline-label">Three paths · One mission</span>
              <h2 className="section-title mt-3">Pick your learning track</h2>
            </div>
            <Link href="/courses" className="group inline-flex items-center gap-1.5 text-sm font-bold text-primary">
              Browse all courses
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {PROGRAMS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="card-lift group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 pt-5">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary">{p.badge}</span>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-sm text-slate-600">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-emerald-500">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-bold text-primary transition-transform duration-300 group-hover:translate-x-1">
                    Explore program →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50/70 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="overline-label">Student favourites</span>
            <h2 className="section-title mt-3">Featured courses</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Handpicked programs our learners love the most.
            </p>
          </div>

          {loading ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl border border-slate-100 bg-white" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featured.map((c) => (
                <CourseCard key={c._id} course={c} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/courses" className="btn-outline">
              View all 12 courses
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-dark via-primary to-indigo-600 px-8 py-14 text-center shadow-lift sm:px-14">
            <div className="dot-grid absolute inset-0 opacity-20" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 animate-float rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 h-56 w-56 animate-float-slow rounded-full bg-purple-400/20 blur-2xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                Why learners choose Ebodhi
              </h2>
              <div className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-3">
                {[
                  { icon: '🛠️', t: 'Learn by building', d: 'Every course ends with real projects you can show off.' },
                  { icon: '👨‍🏫', t: 'Mentor-led', d: 'Small batches with personal attention from experts.' },
                  { icon: '📜', t: 'Certified', d: 'Shareable certificates for every completed level.' },
                ].map((f) => (
                  <div key={f.t}>
                    <div className="text-3xl">{f.icon}</div>
                    <h3 className="mt-2 font-display text-base font-bold text-white">{f.t}</h3>
                    <p className="mt-1 text-sm text-blue-100/90">{f.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
