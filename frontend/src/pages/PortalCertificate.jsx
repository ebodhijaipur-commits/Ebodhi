import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Printer } from 'lucide-react';
import { apiFetch, getStudentToken } from '../utils/api';

export default function PortalCertificate() {
  const { slug } = useParams();
  const [cert, setCert] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch(`/api/enrollments/mine/${slug}/certificate`, { token: getStudentToken() })
      .then(setCert)
      .catch((e) => setError(e.message));
  }, [slug]);

  if (error) {
    return (
      <div className="container portal-shell">
        <p style={{ color: 'var(--danger)' }}>{error}</p>
        <Link to={`/portal/courses/${slug}`} className="btn btn-secondary btn-sm">Back to classroom</Link>
      </div>
    );
  }

  if (!cert) {
    return <div className="container portal-shell"><p>Loading certificate…</p></div>;
  }

  const issued = cert.issuedAt ? new Date(cert.issuedAt).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  }) : '';

  return (
    <div className="container portal-shell lms-shell">
      <div className="lms-cert-actions no-print">
        <Link to={`/portal/courses/${slug}`} className="btn btn-secondary btn-sm">← Classroom</Link>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => window.print()}>
          <Printer size={16} /> Print
        </button>
      </div>

      <div className="lms-certificate">
        <div className="lms-cert-brand">eBodhi</div>
        <p className="lms-cert-kicker">Certificate of Completion</p>
        <h1 className="lms-cert-name">{cert.studentName}</h1>
        <p className="lms-cert-body">
          has successfully completed the program
        </p>
        <h2 className="lms-cert-course">{cert.courseTitle}</h2>
        {cert.trackLabel && (
          <p className="lms-cert-track">
            Frontend track: <strong>{cert.trackLabel}</strong>
          </p>
        )}
        <div className="lms-cert-meta">
          <span>Issued {issued}</span>
          <span>ID: {cert.certificateId}</span>
        </div>
        <div className="lms-cert-seal">Verified · Full Stack Development</div>
      </div>
    </div>
  );
}
