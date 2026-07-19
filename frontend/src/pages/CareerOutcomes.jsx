import React, { useEffect, useState } from 'react';
import CallbackForm from '../components/CallbackForm';

export default function CareerOutcomes() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setStats(d); })
      .catch(() => {});
  }, []);

  const keys = ['median_hike', 'placed', 'highest_package', 'students_trained'];
  const shown = keys.map((k) => stats.find((s) => s.key === k)).filter(Boolean);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Career Outcomes</h1>
          <p>How eBodhi learners move into internships and junior roles — with projects, practice, and mentor feedback.</p>
        </div>
      </section>
      <section className="section">
        <div className="container two-col">
          <div>
            <div className="impact-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: 28 }}>
              {(shown.length ? shown : [
                { key: 'a', value: '2.1x', label: 'Avg. Outcome Lift' },
                { key: 'b', value: '650+', label: 'Career Transitions' },
                { key: 'c', value: '₹12 LPA', label: 'Top Package' },
                { key: 'd', value: '8,500+', label: 'Learners Trained' }
              ]).map((s) => (
                <div key={s.key} className="stat-card">
                  <strong>{s.value}</strong>
                  {s.label}
                  {s.description && <p style={{ color: 'var(--muted)', marginTop: 8, fontSize: '.9rem' }}>{s.description}</p>}
                </div>
              ))}
            </div>
            <div className="campus-card">
              <h3>How we support outcomes</h3>
              <ul style={{ marginTop: 12, color: 'var(--muted)', display: 'grid', gap: 8, listStyle: 'disc', paddingLeft: 18 }}>
                <li>Portfolio projects & GitHub-ready demos</li>
                <li>Interview prep and resume talking points</li>
                <li>Internship-linked industrial training options</li>
                <li>Counselor guidance from enquiry to batch start</li>
              </ul>
            </div>
          </div>
          <aside className="sticky-side">
            <h3 style={{ marginBottom: 10 }}>Get outcome details</h3>
            <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginBottom: 12 }}>
              Request a callback for the latest cohort outcomes PDF.
            </p>
            <CallbackForm />
          </aside>
        </div>
      </section>
    </div>
  );
}
