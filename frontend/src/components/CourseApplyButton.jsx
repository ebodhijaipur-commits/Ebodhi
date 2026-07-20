import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch, getStudentToken } from '../utils/api';

/**
 * Apply for LMS access — admin approval unlocks the portal classroom.
 * status: null | 'pending' | 'approved' | 'rejected' | 'enrolled'
 */
export default function CourseApplyButton({
  course,
  status: statusProp,
  onStatusChange,
  className = 'btn btn-primary btn-sm',
  secondaryClassName = 'btn btn-secondary btn-sm'
}) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(statusProp || null);
  const [error, setError] = useState('');

  React.useEffect(() => {
    setStatus(statusProp || null);
  }, [statusProp]);

  const slug = course?.slug;
  const courseId = course?._id;

  const apply = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    setError('');
    const token = getStudentToken();
    if (!token) {
      navigate(`/login?next=${encodeURIComponent(`/programs/${slug || ''}`)}`);
      return;
    }
    setBusy(true);
    try {
      await apiFetch('/api/applications', {
        method: 'POST',
        token,
        body: JSON.stringify({
          courseId: courseId && !String(courseId).startsWith('fallback') ? courseId : undefined,
          courseSlug: slug,
          message: 'Requesting LMS access'
        })
      });
      setStatus('pending');
      onStatusChange?.(slug, courseId, 'pending');
    } catch (err) {
      const msg = err.message || 'Could not apply';
      if (/already have access|already approved|enrolled/i.test(msg)) {
        setStatus('enrolled');
        onStatusChange?.(slug, courseId, 'enrolled');
      } else if (/already applied|waiting/i.test(msg)) {
        setStatus('pending');
        onStatusChange?.(slug, courseId, 'pending');
      } else {
        setError(msg);
      }
    } finally {
      setBusy(false);
    }
  };

  if (status === 'enrolled' || status === 'approved') {
    return (
      <Link to={`/portal/courses/${slug}`} className={className} onClick={(e) => e.stopPropagation()}>
        Open LMS
      </Link>
    );
  }

  if (status === 'pending') {
    return (
      <button type="button" className={secondaryClassName} disabled title="Waiting for admin approval">
        Pending approval
      </button>
    );
  }

  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 4 }} onClick={(e) => e.stopPropagation()}>
      <button type="button" className={className} disabled={busy} onClick={apply}>
        {busy ? 'Applying…' : status === 'rejected' ? 'Apply again' : 'Apply for LMS'}
      </button>
      {error && <span style={{ fontSize: '.75rem', color: 'var(--danger)' }}>{error}</span>}
    </span>
  );
}
