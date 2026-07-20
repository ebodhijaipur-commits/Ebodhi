import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Circle, Lock, Award, ArrowRight, Code2, Layers } from 'lucide-react';
import { apiFetch, getStudentToken } from '../utils/api';

export default function PortalClassroom() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [picking, setPicking] = useState(false);

  const load = () =>
    apiFetch(`/api/enrollments/mine/${slug}`, { token: getStudentToken() })
      .then(setData)
      .catch((e) => setError(e.message));

  useEffect(() => { load(); }, [slug]);

  const pickTrack = async (track) => {
    setPicking(true);
    setError('');
    try {
      const updated = await apiFetch(`/api/enrollments/mine/${slug}/track`, {
        method: 'POST',
        token: getStudentToken(),
        body: JSON.stringify({ track })
      });
      setData(updated);
    } catch (e) {
      setError(e.message);
    } finally {
      setPicking(false);
    }
  };

  if (error && !data) {
    return (
      <div className="container portal-shell">
        <p style={{ color: 'var(--danger)' }}>{error}</p>
        <Link to="/portal" className="btn btn-secondary btn-sm">Back to dashboard</Link>
      </div>
    );
  }

  if (!data) {
    return <div className="container portal-shell"><p>Loading classroom…</p></div>;
  }

  const course = data.course;
  const outline = data.outline || [];
  const hasLms = data.hasLms;
  const shared = outline.filter((c) => c.track === 'shared');
  const trackChapters = outline.filter((c) => c.track === 'react' || c.track === 'next');
  const backend = outline.filter((c) => c.track === 'backend');
  const nextUp = outline.find((c) => c.unlocked && !c.completed);
  const isBranched = !!data.hasFrontendTracks;

  return (
    <div className="container portal-shell lms-shell">
      <Link to="/portal" className="btn btn-secondary btn-sm" style={{ marginBottom: 16 }}>← Dashboard</Link>

      <div className="portal-header">
        <div>
          <div className="program-cat">{course?.category}</div>
          <h1>{course?.title}</h1>
          <div className="progress-bar" style={{ maxWidth: 360 }}>
            <span style={{ width: `${data.progressPercent || 0}%` }} />
          </div>
          <p style={{ color: 'var(--muted)' }}>
            {data.progressPercent || 0}% complete
            {data.trackChoice ? ` · Track: ${data.trackChoice === 'next' ? 'Next.js' : 'React'}` : ''}
            {data.status ? ` · ${data.status}` : ''}
          </p>
        </div>
        <div className="lms-header-actions">
          {nextUp && (
            <Link to={`/portal/courses/${slug}/chapters/${nextUp.id}`} className="btn btn-primary btn-sm">
              Continue <ArrowRight size={16} />
            </Link>
          )}
          {data.pathComplete && (
            <Link to={`/portal/courses/${slug}/certificate`} className="btn btn-accent btn-sm">
              <Award size={16} /> Certificate
            </Link>
          )}
        </div>
      </div>

      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}

      {!hasLms && (
        <div className="campus-card">
          <p style={{ color: 'var(--muted)' }}>LMS chapters are not available for this course yet.</p>
        </div>
      )}

      {hasLms && !isBranched && (
        <section className="lms-section">
          <h2>Course chapters</h2>
          <p style={{ color: 'var(--muted)', marginTop: -6 }}>Complete each lesson, Try it editor, and quiz to unlock the next chapter.</p>
          <div className="lms-chapter-list">
            {outline.map((ch) => (
              <ChapterRow key={ch.id} slug={slug} chapter={ch} />
            ))}
          </div>
        </section>
      )}

      {hasLms && isBranched && (
        <>
          <section className="lms-section">
            <h2>1. Shared foundations</h2>
            <div className="lms-chapter-list">
              {shared.map((ch) => (
                <ChapterRow key={ch.id} slug={slug} chapter={ch} />
              ))}
            </div>
          </section>

          <section className="lms-section">
            <h2>2. Choose your frontend track</h2>
            {data.canPickTrack && !data.trackChoice && (
              <div className="lms-track-picker">
                <p>Finish foundations, then pick one path. You can switch only before starting track chapters.</p>
                <div className="lms-track-grid">
                  <button type="button" className="lms-track-card" disabled={picking} onClick={() => pickTrack('react')}>
                    <Code2 size={28} />
                    <strong>React + Vite</strong>
                    <span>SPA components, hooks, React Router — build locally on port 5173.</span>
                  </button>
                  <button type="button" className="lms-track-card" disabled={picking} onClick={() => pickTrack('next')}>
                    <Layers size={28} />
                    <strong>Next.js</strong>
                    <span>App Router, server components, file routes — build locally on port 3000.</span>
                  </button>
                </div>
              </div>
            )}
            {data.trackChoice && (
              <p className="lms-track-chosen">
                Selected track: <strong>{data.trackChoice === 'next' ? 'Next.js' : 'React + Vite'}</strong>
                {data.canPickTrack && (
                  <span className="lms-track-switch">
                    {' '}· Switch to{' '}
                    <button type="button" disabled={picking} onClick={() => pickTrack(data.trackChoice === 'react' ? 'next' : 'react')}>
                      {data.trackChoice === 'react' ? 'Next.js' : 'React'}
                    </button>
                  </span>
                )}
              </p>
            )}
            {!data.sharedComplete && !data.trackChoice && (
              <p style={{ color: 'var(--muted)' }}>Complete all shared chapters and quizzes to unlock track selection.</p>
            )}
            {trackChapters.length > 0 && (
              <div className="lms-chapter-list" style={{ marginTop: 16 }}>
                {trackChapters.map((ch) => (
                  <ChapterRow key={ch.id} slug={slug} chapter={ch} />
                ))}
              </div>
            )}
          </section>

          <section className="lms-section">
            <h2>3. Backend, integrate &amp; certify</h2>
            <div className="lms-chapter-list">
              {backend.map((ch) => (
                <ChapterRow key={ch.id} slug={slug} chapter={ch} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function ChapterRow({ slug, chapter }) {
  const icon = chapter.completed
    ? <CheckCircle2 size={18} color="var(--success)" />
    : chapter.unlocked
      ? <Circle size={18} color="var(--navy)" />
      : <Lock size={18} color="var(--muted)" />;

  const inner = (
    <>
      <div className="lms-chapter-main">
        <strong>{icon} {chapter.order}. {chapter.title}</strong>
        <p>{chapter.summary}</p>
      </div>
      <div className="lms-chapter-meta">
        {chapter.completed && <span className="lms-badge ok">Passed {chapter.quizScore}%</span>}
        {!chapter.completed && chapter.unlocked && <span className="lms-badge">Available</span>}
        {!chapter.unlocked && <span className="lms-badge muted">Locked</span>}
      </div>
    </>
  );

  if (!chapter.unlocked) {
    return <div className="lms-chapter-row is-locked">{inner}</div>;
  }

  return (
    <Link to={`/portal/courses/${slug}/chapters/${chapter.id}`} className={`lms-chapter-row ${chapter.completed ? 'is-done' : ''}`}>
      {inner}
    </Link>
  );
}
