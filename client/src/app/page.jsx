'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import CourseCard from '@/components/CourseCard';
import { CATEGORIES } from '@/lib/constants';
import { PROGRAMS } from '@/lib/programs';

const FEATURED_SLUGS = [
  'full-stack-web-development-bootcamp',
  'mobile-app-development-bootcamp',
  'python-for-data-science',
];

export default function HomePage() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/courses')
      .then((data) => {
        const picked = FEATURED_SLUGS.map((slug) =>
          data.courses.find((c) => c.slug === slug)
        ).filter(Boolean);
        setCourses(picked);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function search(e) {
    e.preventDefault();
    router.push(q ? `/courses?q=${encodeURIComponent(q)}` : '/courses');
  }

  return (
    <div>
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Learn without limits. Build your future with Ebodhi
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Three training structures, one mission — school students, college students and working
            IT professionals, all future-ready.
          </p>
          <form onSubmit={search} className="mx-auto mt-8 flex max-w-xl gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="What do you want to learn?"
              className="input flex-1"
            />
            <button type="submit" className="btn-primary">
              Search
            </button>
          </form>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {CATEGORIES.filter((c) => c !== 'All').map((c) => (
              <Link
                key={c}
                href={`/courses?category=${encodeURIComponent(c)}`}
                className="chip border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold">Three paths. One mission.</h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Pick the training structure built for where you are — and where you want to be.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`relative flex h-40 flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br ${p.gradient} text-white`}
              >
                <span className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15" />
                <span className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-black/10" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/25 text-4xl shadow-lg backdrop-blur-sm">
                  {p.emoji}
                </span>
                <span className="relative rounded-full bg-black/25 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                  {p.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold group-hover:text-primary">{p.name}</h3>
                <p className="mt-1 text-sm font-medium text-gray-500">{p.tagline}</p>
                <p className="mt-3 text-sm text-gray-600">{p.description}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-gray-700">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-block text-sm font-bold text-primary">
                  Explore program →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold">Featured courses</h2>
            <Link href="/courses" className="text-sm font-semibold text-primary hover:underline">
              Browse all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? [...Array(3)].map((_, i) => (
                  <div key={i} className="h-72 animate-pulse rounded-2xl bg-gray-100" />
                ))
              : courses.map((c) => <CourseCard key={c._id} course={c} />)}
          </div>
        </div>
      </section>

      <section className="border-t bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-3">
          {[
            ['🧑‍🏫', 'Industry mentors', 'Learn from professionals working at top companies.'],
            ['🛠️', 'Hands-on projects', 'Build a portfolio with real-world assignments.'],
            ['📜', 'Certificates', 'Earn shareable certificates on completion.'],
          ].map(([icon, title, desc]) => (
            <div key={title} className="rounded-2xl bg-gray-50 p-6">
              <div className="text-3xl">{icon}</div>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
