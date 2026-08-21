'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import CourseCard from '@/components/CourseCard';
import { CATEGORIES, AUDIENCES } from '@/lib/constants';

function CoursesContent() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');
  const [appliedQ, setAppliedQ] = useState(params.get('q') || '');
  const [category, setCategory] = useState(params.get('category') || 'All');
  const [audience, setAudience] = useState(params.get('audience') || '');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const search = new URLSearchParams();
      if (appliedQ) search.set('q', appliedQ);
      if (category !== 'All') search.set('category', category);
      if (audience) search.set('audience', audience);
      const data = await api(`/courses?${search.toString()}`);
      setCourses(data.courses);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [appliedQ, category, audience]);

  useEffect(() => {
    load();
  }, [load]);

  function onSearch(e) {
    e.preventDefault();
    setAppliedQ(q);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Explore courses</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {AUDIENCES.map((a) => (
          <button
            key={a.value}
            onClick={() => setAudience(a.value)}
            className={`chip ${
              audience === a.value
                ? 'border-primary bg-primary text-white'
                : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <form onSubmit={onSearch} className="mt-4 flex max-w-xl gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search courses..."
          className="input flex-1"
        />
        <button type="submit" className="btn-primary">
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`chip ${
              category === c
                ? 'border-primary bg-primary-light text-primary'
                : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-8 text-sm text-gray-500">
        {loading ? 'Loading...' : `${courses.length} course(s) found`}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-gray-100" />
            ))
          : courses.map((c) => <CourseCard key={c._id} course={c} />)}
      </div>

      {!loading && courses.length === 0 && (
        <div className="py-16 text-center text-gray-500">
          No courses match your search. Try a different keyword or category.
        </div>
      )}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10">Loading...</div>}>
      <CoursesContent />
    </Suspense>
  );
}
