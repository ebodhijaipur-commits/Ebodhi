'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { categoryEmoji, categoryGradient } from '@/lib/constants';

export default function DashboardPage() {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login?redirect=/dashboard');
      return;
    }
    api('/enrollments/my', { token })
      .then((data) => setEnrollments(data.enrollments))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="h-40 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">My Learning</h1>

      {enrollments.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-gray-300 py-20 text-center">
          <p className="text-lg font-semibold text-gray-700">No courses yet</p>
          <p className="mt-1 text-sm text-gray-500">
            Enroll in a course and it will show up here.
          </p>
          <Link href="/courses" className="btn-primary mt-6">
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {enrollments.map(({ _id, course, progress }) => (
            <div
              key={_id}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <div
                className={`flex h-24 w-full shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-4xl sm:w-36 ${categoryGradient(
                  course?.category
                )}`}
              >
                {categoryEmoji(course?.category)}
              </div>
              <div className="flex-1">
                <h2 className="font-bold">{course?.title}</h2>
                <p className="text-sm text-gray-500">
                  {course?.instructor?.name || 'Ebodhi Academy'} • {course?.level}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-500">{progress}%</span>
                </div>
              </div>
              <Link href={`/courses/${course?.slug}`} className="btn-outline shrink-0">
                Continue
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
