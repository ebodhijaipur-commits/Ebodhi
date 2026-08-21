'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { categoryImage } from '@/lib/constants';

const JOURNEY = [
  {
    band: 'Grades 3–4',
    name: 'AI Explorer',
    desc: 'AI detectives hunt smart helpers at home, school and in the city — then draw, storytell and stay safe.',
    tags: ['Curiosity', 'Safety', 'Imagination'],
    outcome: 'Explain AI in kid language and create with care.',
  },
  {
    band: 'Grades 5–6',
    name: 'AI Learner',
    desc: 'Data turns into stories. Students survey classmates, train human classifiers, write better prompts and spot AI mistakes.',
    tags: ['Data', 'ML basics', 'Prompts'],
    outcome: 'Teach ideas to a machine and question what it says.',
  },
  {
    band: 'Grades 7–8',
    name: 'AI Creator',
    desc: 'Generative AI becomes a studio: magazines, campaigns, study systems and ideas that solve real school problems.',
    tags: ['Create', 'Produce', 'Critique'],
    outcome: 'Make original work and defend it with critical thinking.',
  },
  {
    band: 'Grades 9–10',
    name: 'AI Innovator',
    desc: 'From hospitals to farms, students map how AI reshapes industries — then prototype solutions and pitch like founders.',
    tags: ['Systems', 'Industry', 'Startups'],
    outcome: 'Design and pitch an AI-powered solution.',
  },
  {
    band: 'Grades 11–12',
    name: 'AI Future Leader',
    desc: 'Research portfolios, AI agents, ethics, governance and a Grade 12 startup pitch — ready for careers and college.',
    tags: ['Research', 'Lead', 'Venture'],
    outcome: 'Lead teams and ship a future-ready portfolio.',
  },
];

const LOOP = [
  ['Learn', 'A real-world hook, then a crystal-clear idea with pictures.'],
  ['Practice', 'Labs, worksheets, debates and spot-the-mistake games.'],
  ['Create', 'Drawings, prompts, posters, prototypes, pitch decks.'],
  ['Collaborate', 'Teams, surveys, empathy maps, community problems.'],
  ['Present', 'Showcases, exhibitions and pitch rehearsals.'],
  ['Lead', 'Ethics, careers, startups and school-wide impact.'],
];

const WHY = [
  ['🧭', 'Future Careers', 'Prepare students for AI product, research, consulting and entrepreneurship pathways.'],
  ['🤔', 'Critical Thinking', 'Students learn to question outputs, spot mistakes and verify information.'],
  ['📱', 'Digital Fluency', 'From voice assistants to LLMs, students understand the tools already around them.'],
  ['💡', 'Innovation & Entrepreneurship', 'Every year ends with a capstone: posters, storybooks, research, startups and pitches.'],
];

const CERTS = ['AI Explorer', 'AI Learner', 'AI Creator', 'AI Innovator', 'AI Future Leader'];

export default function SchoolProgramPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/courses?audience=school')
      .then((data) => setCourses(data.courses))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            For Schools · NEP 2020 aligned
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Bring AI literacy to every classroom, Grades 3–12
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-orange-50">
            A 10-year pathway from AI Explorer to AI Future Leader — with 36 sessions a year and a
            capstone every grade. Teacher-ready sessions. No coding faculty required.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/courses?audience=school" className="rounded-full bg-white px-7 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-50">
              Explore curriculum →
            </Link>
            <a href="mailto:info@ebodhi.in?subject=Schedule%20a%20Demo" className="rounded-full border-2 border-white/70 px-7 py-3 text-sm font-bold transition hover:bg-white/10">
              Request a demo
            </a>
          </div>
        </div>
      </section>

      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 text-center sm:grid-cols-4">
          {[
            ['3–12', 'Grades covered'],
            ['10 years', 'Learning journey'],
            ['36', 'Sessions every year'],
            ['1 / year', 'Capstone project'],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="text-3xl font-extrabold text-orange-600">{num}</div>
              <div className="mt-1 text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold">The five pathways</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600">
          Start, switch or advance your school&apos;s AI pathway — one stage band at a time.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-2xl bg-gray-100" />
              ))
            : courses.map((c) => (
                <Link
                  key={c._id}
                  href={`/courses/${c.slug}`}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={categoryImage(c.category)}
                      alt={`${c.category} illustration`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold uppercase tracking-wide text-orange-600">
                      eBodhi · {c.level}
                    </span>
                    <h3 className="mt-1 font-extrabold group-hover:text-primary">{c.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">{c.description}</p>
                    <p className="mt-3 text-xs font-semibold text-gray-400">
                      {c.lessons.length} modules · Capstone included
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="text-center text-3xl font-extrabold">Student learning journey</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600">
            Watch a child grow from &ldquo;What is Alexa?&rdquo; to pitching an AI startup.
          </p>
          <ol className="mt-12 space-y-8">
            {JOURNEY.map((j, i) => (
              <li key={j.name} className="relative flex gap-6">
                <div className="flex flex-col items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-red-500 text-lg font-black text-white">
                    {i + 1}
                  </span>
                  {i < JOURNEY.length - 1 && <span className="w-px flex-1 bg-orange-200" />}
                </div>
                <div className="pb-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-orange-600">{j.band}</span>
                  <h3 className="text-xl font-extrabold">{j.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{j.desc}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {j.tags.map((t) => (
                      <span key={t} className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-800">
                    They leave able to: {j.outcome}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold">A living classroom loop</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600">
          Not lectures. Learn it, try it, make it, share it, lead it.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LOOP.map(([title, desc], i) => (
            <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-black text-orange-500">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-1 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-extrabold">Why AI literacy matters</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(([icon, title, desc]) => (
              <div key={title} className="rounded-2xl bg-gray-800 p-6">
                <div className="text-3xl">{icon}</div>
                <h3 className="mt-3 font-bold">{title}</h3>
                <p className="mt-1 text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold">Certification pathway</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600">
          Five pathway certificates culminating in a Grades 3–12 graduate profile of literacy,
          research, ethics and leadership.
        </p>
        <div className="mt-10 flex flex-wrap items-stretch justify-center gap-4">
          {CERTS.map((c, i) => (
            <div
              key={c}
              className={`flex w-40 flex-col items-center rounded-2xl border p-5 text-center ${
                i === CERTS.length - 1 ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Level {i + 1}</span>
              <span className="mt-2 text-2xl">🏅</span>
              <span className="mt-2 text-sm font-extrabold">{c}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-amber-500 to-red-500 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold">Bring AI literacy to your school</h2>
          <p className="mx-auto mt-3 max-w-xl text-orange-50">
            Partner with eBodhi for a complete Grades 3–12 pathway, teacher-ready sessions and
            student showcases.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="mailto:info@ebodhi.in?subject=Schedule%20a%20Demo" className="rounded-full bg-white px-7 py-3 text-sm font-bold text-orange-600 hover:bg-orange-50">
              Schedule a demo
            </a>
            <Link href="/courses?audience=school" className="rounded-full border-2 border-white/70 px-7 py-3 text-sm font-bold hover:bg-white/10">
              Browse school courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
