'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { categoryEmoji, categoryGradient, formatPrice } from '@/lib/constants';
import { CURRICULUM, BANDS, BAND_BY_SLUG } from '@/lib/curriculum';
import SessionAccordion from '@/components/SessionAccordion';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [status, setStatus] = useState('loading');
  const [enrolling, setEnrolling] = useState(false);
  const bandKey = course ? BAND_BY_SLUG[course.slug] : null;
  const band = bandKey ? BANDS.find((b) => b.key === bandKey) : null;

  useEffect(() => {
    api(`/courses/${slug}`)
      .then((data) => {
        setCourse(data.course);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [slug]);

  async function enroll() {
    const token = getToken();
    if (!token) {
      router.push(`/login?redirect=/courses/${slug}`);
      return;
    }
    setEnrolling(true);
    try {
      await api(`/enrollments/${course._id}`, { method: 'POST', token });
      router.push('/dashboard');
    } catch (err) {
      alert(err.message);
      setEnrolling(false);
    }
  }

  if (status === 'loading') {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    );
  }

  if (status === 'error' || !course) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-lg font-semibold">Course not found.</p>
        <Link href="/courses" className="btn-primary mt-6">
          Browse courses
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section
        className={`relative overflow-hidden bg-gradient-to-r ${categoryGradient(course.category)} text-white`}
      >
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 animate-float rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <span className="rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] backdrop-blur">
            {course.category}
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-blue-50">{course.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 font-bold shadow-sm">
              {(course.instructor?.name || 'E').charAt(0)}
            </span>
            <span className="font-semibold">{course.instructor?.name || 'Ebodhi Academy'}</span>
            <span className="flex items-center gap-1 rounded-full bg-black/20 px-2.5 py-1 text-xs font-bold text-amber-300">
              ★ {course.rating.toFixed(1)}
            </span>
            <span className="text-blue-100">({course.students.toLocaleString('en-IN')} students)</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:block" />
            <span className="text-blue-100">{course.level}</span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {course.outcomes?.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold">What you&apos;ll learn</h2>
              <ul className="mt-4 grid gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-6 sm:grid-cols-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    {o}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            {bandKey ? (
              <>
                <h2 className="text-xl font-bold">
                  Full curriculum · {band.label} ({band.pathway})
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  36 sessions · learn, practise, bridge and homework in every class
                </p>
                <SessionAccordion sessions={CURRICULUM[bandKey]} />
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">Syllabus</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {course.lessons.length} lessons •{' '}
                  {course.lessons.reduce((sum, l) => sum + (l.duration || 0), 0)} minutes total
                </p>
                <ol className="mt-4 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
                  {course.lessons.map((lesson, i) => (
                    <li key={i} className="flex items-center gap-4 px-5 py-4">
                      <span className="text-sm font-bold text-gray-400">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex-1 text-sm font-medium">{lesson.title}</span>
                      <span className="text-xs text-gray-400">{lesson.duration} minutes</span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </section>
        </div>

          <aside>
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lift">
            <div
              className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${categoryGradient(
                course.category
              )}`}
            >
              <div className="dot-grid absolute inset-0 opacity-25" />
              <span className="relative text-6xl transition-transform duration-500 hover:scale-110">{categoryEmoji(course.category)}</span>
            </div>
            <div className="p-6">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-slate-900">{formatPrice(course.price)}</span>
                <span className="text-sm text-gray-400 line-through">₹{(course.price * 1.4).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <button onClick={enroll} disabled={enrolling} className="btn-primary mt-5 w-full">
                {enrolling ? 'Enrolling...' : 'Enroll now'}
              </button>
              <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm text-gray-600">
                <li className="flex items-center gap-2">✓ {bandKey ? '36 sessions' : `${course.lessons.length} lessons`} included</li>
                <li className="flex items-center gap-2">✓ Certificate of completion</li>
                <li className="flex items-center gap-2">✓ Lifetime access</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
