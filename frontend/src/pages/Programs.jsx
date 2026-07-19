import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProgramCard from '../components/ProgramCard';

export default function Programs() {
  const [courses, setCourses] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'All';
  const [mode, setMode] = useState('all');

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setCourses(d); })
      .catch(() => {});
  }, []);

  const categories = useMemo(() => ['All', ...new Set(courses.map((c) => c.category))], [courses]);

  const filtered = courses.filter((c) => {
    const catOk = category === 'All' || c.category === category;
    const modeOk = mode === 'all' || c.mode === mode || c.mode === 'both';
    return catOk && modeOk;
  });

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Courses & Skill Tracks</h1>
          <p>Job-ready tracks — Full Stack, Data Science with AI/ML, Digital Marketing, Data Analytics, and App Development.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="tabs">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`tab ${category === c ? 'active' : ''}`}
                onClick={() => {
                  if (c === 'All') searchParams.delete('category');
                  else searchParams.set('category', c);
                  setSearchParams(searchParams);
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="tabs" style={{ marginTop: -12 }}>
            {['all', 'online', 'campus'].map((m) => (
              <button key={m} type="button" className={`tab ${mode === m ? 'active' : ''}`} onClick={() => setMode(m)}>
                {m === 'all' ? 'All Modes' : m === 'online' ? 'Online' : 'On Campus'}
              </button>
            ))}
          </div>
          <div className="card-grid">
            {filtered.map((course) => (
              <ProgramCard key={course._id} course={course} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--muted)' }}>No programs match these filters yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
