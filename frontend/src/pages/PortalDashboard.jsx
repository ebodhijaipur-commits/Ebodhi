import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch, getStudentToken } from '../utils/api';

export default function PortalDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');
  const student = JSON.parse(localStorage.getItem('student') || '{}');

  useEffect(() => {
    apiFetch('/api/enrollments/mine', { token: getStudentToken() })
      .then(setEnrollments)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="portal-shell container">
      <div className="portal-header">
        <div>
          <h1>Welcome{student.name ? `, ${student.name}` : ''}</h1>
          <p style={{ color: 'var(--muted)' }}>Your enrolled programs and progress</p>
        </div>
        <Link to="/portal/profile" className="btn btn-secondary btn-sm">Profile</Link>
      </div>

      <div className="portal-nav">
        <Link to="/portal" className="btn btn-primary btn-sm">Dashboard</Link>
        <Link to="/programs" className="btn btn-secondary btn-sm">Browse Programs</Link>
        <Link to="/contact" className="btn btn-secondary btn-sm">Need help?</Link>
      </div>

      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}

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
            <Link to={`/portal/courses/${e.course?.slug}`} className="btn btn-primary btn-sm">Continue Learning</Link>
          </article>
        ))}
      </div>

      {enrollments.length === 0 && !error && (
        <div className="campus-card" style={{ marginTop: 12 }}>
          <h3>No enrollments yet</h3>
          <p style={{ color: 'var(--muted)', margin: '8px 0 16px' }}>
            After you speak with a counselor, an admin will assign your program here.
          </p>
          <Link to="/contact" className="btn btn-primary btn-sm">Request Callback</Link>
        </div>
      )}
    </div>
  );
}
