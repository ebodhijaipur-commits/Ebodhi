import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Clock, IndianRupee } from 'lucide-react';
import CallbackForm from '../components/CallbackForm';
import CourseApplyButton from '../components/CourseApplyButton';
import Reveal from '../components/Reveal';
import { fallbackCourses, getFallbackCourse } from '../data/fallbackCourses';
import { apiFetch, getStudentToken } from '../utils/api';

export default function CourseView() {
  const { slug } = useParams();
  const [course, setCourse] = useState(() => getFallbackCourse(slug));
  const [error, setError] = useState('');
  const [courses, setCourses] = useState(fallbackCourses);
  const [applyStatus, setApplyStatus] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setCourse(getFallbackCourse(slug));
    setError('');
    setApplyStatus(null);

    const applyFallback = () => {
      const local = getFallbackCourse(slug);
      if (local) {
        if (!cancelled) {
          setCourse(local);
          setError('');
        }
        return true;
      }
      return false;
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    fetch(`/api/courses/${slug}`, { signal: controller.signal })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data.message || 'Not found');
        if (!cancelled) {
          setCourse(data);
          setError('');
        }
      })
      .catch(() => {
        if (!applyFallback() && !cancelled) {
          setError('This program could not be loaded. Please try again or browse all courses.');
        }
      })
      .finally(() => clearTimeout(timer));

    fetch('/api/courses')
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) {
          if (Array.isArray(d) && d.length > 0) setCourses(d);
        }
      })
      .catch(() => {});

    const token = getStudentToken();
    if (token) {
      apiFetch('/api/applications/mine/status', { token })
        .then((map) => {
          if (!cancelled) setApplyStatus(map.bySlug?.[slug] || null);
        })
        .catch(() => {});
    }

    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
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

  const formCourses = courses.length
    ? courses.filter((c) => c._id === course._id || c.slug === course.slug)
    : [course];

  return (
    <div>
      <section className="page-hero page-hero-enter">
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
          <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <CourseApplyButton
              course={course}
              status={applyStatus}
              onStatusChange={(_s, _id, st) => setApplyStatus(st)}
              className="btn btn-accent"
              secondaryClassName="btn btn-secondary"
            />
            <span style={{ color: 'rgba(255,255,255,.85)', fontSize: '.92rem' }}>
              Apply now → admin approves → LMS unlocks in your portal
            </span>
          </div>
        </div>
      </section>

      <div className="container detail-layout below-hero-section" style={{ paddingTop: 40 }}>
        <Reveal className="reveal-rise" delay={0}>
          <div>
            <h2 style={{ marginBottom: 16 }}>What you get in the LMS</h2>
            <ul style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
              {[
                'Step-by-step chapters with clear explanations',
                'Try it yourself live code editor',
                'Chapter quizzes and progress tracking',
                'Certificate when you complete the path'
              ].map((h) => (
                <li key={h} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle size={18} color="var(--success)" /> {h}
                </li>
              ))}
            </ul>

            <h2 style={{ marginBottom: 16 }}>Curriculum overview</h2>
            {(course.syllabus || []).map((mod, i) => (
              <details key={mod.moduleName} className="syllabus-item" open={i === 0}>
                <summary>Module {i + 1}: {mod.moduleName}</summary>
                <ul>
                  {(mod.topics || []).map((t) => <li key={t}>{t}</li>)}
                </ul>
              </details>
            ))}
            {(!course.syllabus || course.syllabus.length === 0) && (
              <p style={{ color: 'var(--muted)' }}>Curriculum details will appear here once published.</p>
            )}

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
        </Reveal>

        <Reveal className="reveal-rise" delay={80}>
          <aside className="sticky-side">
            <h3 style={{ marginBottom: 8 }}>Apply for LMS access</h3>
            <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginBottom: 16 }}>
              Log in as a student, apply for this course, and wait for admin approval. After approval, open it from your portal dashboard.
            </p>
            <CourseApplyButton
              course={course}
              status={applyStatus}
              onStatusChange={(_s, _id, st) => setApplyStatus(st)}
              className="btn btn-primary"
              secondaryClassName="btn btn-secondary"
            />
            <hr style={{ margin: '20px 0', border: 0, borderTop: '1px solid var(--border)' }} />
            <h3 style={{ marginBottom: 8 }}>Prefer a callback?</h3>
            <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginBottom: 16 }}>
              Share your college year or career goal — we&apos;ll recommend the right batch.
            </p>
            <CallbackForm courses={formCourses} defaultCourseSlug={course.slug} />
            <Link to="/register" className="btn btn-secondary" style={{ width: '100%', marginTop: 12 }}>
              Create Student Account
            </Link>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
