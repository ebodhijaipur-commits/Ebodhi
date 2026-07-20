import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch, getStudentToken } from '../utils/api';

export default function PortalDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const student = JSON.parse(localStorage.getItem('student') || '{}');

  useEffect(() => {
    const token = getStudentToken();
    Promise.all([
      apiFetch('/api/enrollments/mine', { token }),
      apiFetch('/api/applications/mine', { token }).catch(() => [])
    ])
      .then(([ens, apps]) => {
        setEnrollments(Array.isArray(ens) ? ens : []);
        setApplications(Array.isArray(apps) ? apps : []);
      })
      .catch((e) => setError(e.message));
  }, []);

  const pending = applications.filter((a) => a.status === 'pending');
  const rejected = applications.filter((a) => a.status === 'rejected');

  return (
    <div className="portal-shell container">
      <div className="portal-header">
        <div>
          <h1>Welcome{student.name ? `, ${student.name}` : ''}</h1>
          <p style={{ color: 'var(--muted)' }}>Your LMS courses, applications, and progress</p>
        </div>
        <Link to="/portal/profile" className="btn btn-secondary btn-sm">Profile</Link>
      </div>

      <div className="portal-nav">
        <Link to="/portal" className="btn btn-primary btn-sm">Dashboard</Link>
        <Link to="/programs" className="btn btn-secondary btn-sm">Browse &amp; apply</Link>
        <Link to="/contact" className="btn btn-secondary btn-sm">Need help?</Link>
      </div>

      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}

      {pending.length > 0 && (
        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>Pending applications</h2>
          <div className="card-grid">
            {pending.map((a) => (
              <article key={a._id} className="portal-card card-body">
                <div className="program-cat">{a.course?.category}</div>
                <h3>{a.course?.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '.92rem' }}>
                  Waiting for admin approval. You&apos;ll get LMS access here once approved.
                </p>
                <span className="lms-badge">Pending</span>
              </article>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>My LMS courses</h2>
        <div className="card-grid">
          {enrollments.map((e) => (
            <article key={e._id} className="portal-card card-body">
              <div className="program-cat">{e.course?.category}</div>
              <h3>{e.course?.title}</h3>
              <div className="progress-bar"><span style={{ width: `${e.progressPercent || 0}%` }} /></div>
              <div className="meta-row">
                <span>{e.progressPercent || 0}% complete</span>
                <span style={{ textTransform: 'capitalize' }}>{e.status}</span>
              </div>
              {e.trackChoice && (
                <p style={{ color: 'var(--muted)', fontSize: '.9rem', margin: '0 0 10px' }}>
                  Track: {e.trackChoice === 'next' ? 'Next.js' : 'React'}
                </p>
              )}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Link to={`/portal/courses/${e.course?.slug}`} className="btn btn-primary btn-sm">Continue Learning</Link>
                {(e.pathComplete || e.status === 'completed') && (
                  <Link to={`/portal/courses/${e.course?.slug}/certificate`} className="btn btn-accent btn-sm">Certificate</Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {enrollments.length === 0 && !error && (
        <div className="campus-card" style={{ marginTop: 12 }}>
          <h3>No LMS access yet</h3>
          <p style={{ color: 'var(--muted)', margin: '8px 0 16px' }}>
            Browse courses and click <strong>Apply for LMS</strong>. After an admin approves, your classroom appears here.
          </p>
          <Link to="/programs" className="btn btn-primary btn-sm">Browse courses</Link>
        </div>
      )}

      {rejected.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: '1.05rem', marginBottom: 8, color: 'var(--muted)' }}>Rejected applications</h2>
          <ul style={{ color: 'var(--muted)', fontSize: '.92rem' }}>
            {rejected.map((a) => (
              <li key={a._id}>
                {a.course?.title}
                {a.adminNotes ? ` — ${a.adminNotes}` : ''}
                {' · '}
                <Link to={`/programs/${a.course?.slug}`}>Apply again</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
