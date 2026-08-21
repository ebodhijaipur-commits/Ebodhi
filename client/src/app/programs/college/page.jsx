'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import CourseCard from '@/components/CourseCard';

const FEATURES = [
  ['🧑‍🏫', 'Industry mentors', 'Learn from engineers and architects working at product companies.'],
  ['🛠️', 'Portfolio projects', 'Every track ends with a deployable, interview-ready project.'],
  ['💼', 'Internship pipeline', 'Interview opportunities with GIPL and partner companies.'],
  ['🎯', 'Placement preparation', 'DSA patterns, mock interviews, resume and aptitude clinics.'],
  ['🗓️', 'Degree-aligned tracks', 'Curriculum mapped to BTech, BCA, MCA and MTech semesters.'],
  ['📜', 'Certificates', 'Shareable Ebodhi certificates on every course completion.'],
];

const ROADMAP = [
  ['Foundation', 'Programming, web basics, databases and problem solving — the toolkit every company expects.'],
  ['Specialization', 'Go deep in full-stack, data science or AI/ML with guided projects and code reviews.'],
  ['Placement-ready', 'Capstone + DSA + mock interviews — walk into campus placements with proof of work.'],
];

export default function CollegeProgramPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/courses?audience=college')
      .then((data) => setCourses(data.courses))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            For Universities & Colleges
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Future-ready for BTech, BCA, MCA & MTech students
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Degree-aligned training that turns classroom theory into job-ready skills — mentors,
            real projects and placement preparation built in.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/courses?audience=college" className="rounded-full bg-white px-7 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50">
              Browse college courses →
            </Link>
            <a href="mailto:info@ebodhi.in?subject=Campus%20Training%20Program" className="rounded-full border-2 border-white/70 px-7 py-3 text-sm font-bold transition hover:bg-white/10">
              Partner with us
            </a>
          </div>
        </div>
      </section>

      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 text-center sm:grid-cols-4">
          {[
            ['4+', 'Degree programs'],
            ['1:1', 'Mentor guidance'],
            ['10+', 'Portfolio projects'],
            ['100%', 'Placement focus'],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="text-3xl font-extrabold text-primary">{num}</div>
              <div className="mt-1 text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold">What makes you future-ready</h2>
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
          <h2 className="text-center text-3xl font-extrabold">Your degree-to-career roadmap</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ROADMAP.map(([title, desc], i) => (
              <div key={title} className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <span className="absolute -top-4 left-6 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white">
                  Step {i + 1}
                </span>
                <h3 className="mt-3 text-lg font-extrabold">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Tracks for college students</h2>
          <Link href="/courses?audience=college" className="text-sm font-semibold text-primary hover:underline">
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

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold">Start before graduation</h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            The best time to become industry-ready is while you still have a campus to learn from.
          </p>
          <Link href="/register" className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            Join for free
          </Link>
        </div>
      </section>
    </div>
  );
}
