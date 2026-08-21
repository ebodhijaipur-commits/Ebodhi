'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import CourseCard from '@/components/CourseCard';

const FEATURES = [
  ['🌙', 'Weekend-friendly', 'Live sessions and labs scheduled around your work week.'],
  ['📜', 'Certification prep', 'AWS, Kubernetes and cloud certifications with mock exams.'],
  ['🧪', 'Applied projects', 'Rebuild real production patterns — pipelines, RAG apps, dashboards.'],
  ['🔄', 'Career-switch support', 'Roadmaps for moving into DevOps, data and AI engineering roles.'],
  ['👥', 'Peer community', 'Cohorts of working engineers — share war stories, not just slides.'],
  ['⚡', 'Immediately usable', 'Every module is designed to be applied at your job from week one.'],
];

const TRACKS = [
  ['Cloud & DevOps', 'From developer to platform engineer: AWS, Docker, CI/CD, Kubernetes.'],
  ['Data & AI', 'Move from using AI tools to building with them: LLMs, RAG, automation.'],
  ['Growth & Marketing', 'Own growth: SEO, paid ads, analytics and full-funnel campaigns.'],
];

export default function ProfessionalsProgramPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/courses?audience=professionals')
      .then((data) => setCourses(data.courses))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-500 to-teal-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            For Working IT Professionals
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Upskill without pausing your career
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-emerald-50">
            Flexible, certification-oriented tracks in cloud, DevOps, data and applied AI — built
            for engineers who want the next role, not just the next course.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/courses?audience=professionals" className="rounded-full bg-white px-7 py-3 text-sm font-bold text-teal-700 transition hover:bg-emerald-50">
              Browse professional tracks →
            </Link>
            <a href="mailto:info@ebodhi.in?subject=Corporate%20Training" className="rounded-full border-2 border-white/70 px-7 py-3 text-sm font-bold transition hover:bg-white/10">
              Corporate training
            </a>
          </div>
        </div>
      </section>

      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 text-center sm:grid-cols-4">
          {[
            ['Weekend', 'Batch options'],
            ['100%', 'Project-based'],
            ['3+', 'Career tracks'],
            ['∞', 'Lifetime access'],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="text-3xl font-extrabold text-emerald-600">{num}</div>
              <div className="mt-1 text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold">Built around your job</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([icon, title, desc]) => (
            <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-3xl">{icon}</div>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-extrabold">Choose your next role</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TRACKS.map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-extrabold text-emerald-700">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Tracks for professionals</h2>
          <Link href="/courses?audience=professionals" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-2xl bg-gray-100" />
              ))
            : courses.map((c) => <CourseCard key={c._id} course={c} />)}
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-500 to-teal-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold">Your next promotion starts here</h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-50">
            Join a cohort of working engineers leveling up on weekends.
          </p>
          <Link href="/register" className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-bold text-teal-700 hover:bg-emerald-50">
            Join for free
          </Link>
        </div>
      </section>
    </div>
  );
}
