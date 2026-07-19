import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';
import { apiFetch, getStudentToken } from '../utils/api';

export default function PortalClassroom() {
  const { slug } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(null);

  const load = () =>
    apiFetch(`/api/enrollments/mine/${slug}`, { token: getStudentToken() })
      .then(setEnrollment)
      .catch((e) => setError(e.message));

  useEffect(() => { load(); }, [slug]);

  const toggle = async (moduleIndex, completed) => {
    setSaving(moduleIndex);
    try {
      const updated = await apiFetch(`/api/enrollments/mine/${slug}/progress`, {
        method: 'PUT',
        token: getStudentToken(),
        body: JSON.stringify({ moduleIndex, completed })
      });
      setEnrollment(updated);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(null);
    }
  };

  if (error && !enrollment) {
    return (
      <div className="container portal-shell">
        <p style={{ color: 'var(--danger)' }}>{error}</p>
        <Link to="/portal" className="btn btn-secondary btn-sm">Back to dashboard</Link>
      </div>
    );
  }

  if (!enrollment) {
    return <div className="container portal-shell"><p>Loading classroom…</p></div>;
  }

  const course = enrollment.course;
  const doneMap = new Map((enrollment.progress || []).map((p) => [p.moduleIndex, p.completed]));

  return (
    <div className="container portal-shell">
      <Link to="/portal" className="btn btn-secondary btn-sm" style={{ marginBottom: 16 }}>← Dashboard</Link>
      <div className="portal-header">
        <div>
          <div className="program-cat">{course.category}</div>
          <h1>{course.title}</h1>
          <div className="progress-bar" style={{ maxWidth: 360 }}><span style={{ width: `${enrollment.progressPercent || 0}%` }} /></div>
          <p style={{ color: 'var(--muted)' }}>{enrollment.progressPercent || 0}% complete · {enrollment.status}</p>
        </div>
      </div>

      <div className="classroom-list">
        {(course.syllabus || []).map((mod, i) => {
          const done = !!doneMap.get(i);
          return (
            <div key={mod.moduleName} className="lesson-row">
              <div>
                <strong style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {done ? <CheckCircle2 size={18} color="var(--success)" /> : <Circle size={18} color="var(--muted)" />}
                  Module {i + 1}: {mod.moduleName}
                </strong>
                <ul style={{ marginTop: 8, paddingLeft: 28, color: 'var(--muted)', listStyle: 'disc' }}>
                  {(mod.topics || []).map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
              <button
                type="button"
                className={`btn btn-sm ${done ? 'btn-secondary' : 'btn-primary'}`}
                disabled={saving === i}
                onClick={() => toggle(i, !done)}
              >
                {done ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
