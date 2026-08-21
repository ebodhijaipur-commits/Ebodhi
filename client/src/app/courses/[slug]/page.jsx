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
        className={`bg-gradient-to-r ${categoryGradient(course.category)} text-white`}
      >
        <div className="mx-auto max-w-6xl px-4 py-14">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {course.category}
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold sm:text-4xl">{course.title}</h1>
          <p className="mt-3 max-w-2xl text-blue-50">{course.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 font-bold">
              {(course.instructor?.name || 'E').charAt(0)}
            </span>
            <span>{course.instructor?.name || 'Ebodhi Academy'}</span>
            <span className="text-amber-300">★ {course.rating.toFixed(1)}</span>
            <span>({course.students.toLocaleString('en-IN')} students)</span>
            <span>•</span>
            <span>{course.level}</span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {course.outcomes?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold">What you&apos;ll learn</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-primary">✓</span>
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
                  {course.lessons.reduce((sum, l) => sum + (l.duration || 0), 0)} min total
                </p>
                <ol className="mt-4 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
                  {course.lessons.map((lesson, i) => (
                    <li key={i} className="flex items-center gap-4 px-5 py-4">
                      <span className="text-sm font-bold text-gray-400">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex-1 text-sm font-medium">{lesson.title}</span>
                      <span className="text-xs text-gray-400">{lesson.duration} min</span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </section>
        </div>

        <aside>
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div
              className={`flex h-36 items-center justify-center bg-gradient-to-br ${categoryGradient(
                course.category
              )}`}
            >
              <span className="text-6xl">{categoryEmoji(course.category)}</span>
            </div>
            <div className="p-6">
              <div className="text-3xl font-extrabold">{formatPrice(course.price)}</div>
              <button onClick={enroll} disabled={enrolling} className="btn-primary mt-4 w-full">
                {enrolling ? 'Enrolling...' : 'Enroll now'}
              </button>
              <ul className="mt-5 space-y-2 text-sm text-gray-600">
                <li>✓ {bandKey ? '36 sessions' : `${course.lessons.length} lessons`} included</li>
                <li>✓ Certificate of completion</li>
                <li>✓ Lifetime access</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
