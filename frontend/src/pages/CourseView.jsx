import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Clock, IndianRupee } from 'lucide-react';
import CallbackForm from '../components/CallbackForm';

export default function CourseView() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`/api/courses/${slug}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.message || 'Not found');
        setCourse(data);
      })
      .catch((e) => setError(e.message));
    fetch('/api/courses').then((r) => r.json()).then((d) => { if (Array.isArray(d)) setCourses(d); }).catch(() => {});
  }, [slug]);

  if (error) {
    return (
      <div className="container section">
        <h2>Course not found</h2>
        <p style={{ color: 'var(--muted)' }}>{error}</p>
        <Link to="/programs" className="btn btn-primary" style={{ marginTop: 16 }}>Back to Programs</Link>
      </div>
    );
  }

  if (!course) {
    return <div className="container section"><p>Loading program…</p></div>;
  }

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="chip" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', display: 'inline-block', marginBottom: 12 }}>{course.category}</div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="meta-row" style={{ color: 'rgba(255,255,255,.85)', marginTop: 16 }}>
            <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Clock size={16} /> {course.duration}</span>
            <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              <IndianRupee size={16} />
              {course.isFree || course.price === 0 ? 'Free' : course.price?.toLocaleString('en-IN')}
            </span>
            {course.avgSalary && <span>Avg salary {course.avgSalary}</span>}
            <span style={{ textTransform: 'capitalize' }}>{course.mode} mode</span>
          </div>
        </div>
      </section>

      <div className="container detail-layout">
        <div>
          <h2 style={{ marginBottom: 16 }}>Curriculum</h2>
          {(course.syllabus || []).map((mod, i) => (
            <details key={mod.moduleName} className="syllabus-item" open={i === 0}>
              <summary>Module {i + 1}: {mod.moduleName}</summary>
              <ul>
                {(mod.topics || []).map((t) => <li key={t}>{t}</li>)}
              </ul>
            </details>
          ))}

          {course.highlights?.length > 0 && (
            <>
              <h2 style={{ margin: '28px 0 14px' }}>Program Highlights</h2>
              <ul style={{ display: 'grid', gap: 10 }}>
                {course.highlights.map((h) => (
                  <li key={h} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <CheckCircle size={18} color="var(--success)" /> {h}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside className="sticky-side">
          <h3 style={{ marginBottom: 8 }}>Enquire / Talk to Advisor</h3>
          <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginBottom: 16 }}>
            Share your college year or career goal — we&apos;ll recommend the right batch or internship track.
          </p>
          <CallbackForm courses={courses.filter((c) => c._id === course._id)} />
          <Link to="/register" className="btn btn-secondary" style={{ width: '100%', marginTop: 12 }}>
            Create Student Account
          </Link>
        </aside>
      </div>
    </div>
  );
}
