import React, { useEffect, useState } from 'react';
import CallbackForm from '../components/CallbackForm';

export default function PlacementReport() {
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
          <h1>Placement Report</h1>
          <p>Explore program outcomes — hikes, placements, and packages from recent eBodhi cohorts.</p>
        </div>
      </section>
      <section className="section">
        <div className="container two-col">
          <div>
            <div className="impact-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: 28 }}>
              {(shown.length ? shown : [
                { key: 'a', value: '72%', label: 'Median Hike', description: '' },
                { key: 'b', value: '850+', label: 'Students Placed', description: '' },
                { key: 'c', value: '₹14 LPA', label: 'Highest Package', description: '' },
                { key: 'd', value: '12,000+', label: 'Students Trained', description: '' }
              ]).map((s) => (
                <div key={s.key} className="stat-card">
                  <strong>{s.value}</strong>
                  {s.label}
                  {s.description && <p style={{ color: 'var(--muted)', marginTop: 8, fontSize: '.9rem' }}>{s.description}</p>}
                </div>
              ))}
            </div>
            <div className="campus-card">
              <h3>What&apos;s inside the report</h3>
              <ul style={{ marginTop: 12, color: 'var(--muted)', display: 'grid', gap: 8, listStyle: 'disc', paddingLeft: 18 }}>
                <li>Role categories and sample hiring destinations</li>
                <li>Domain-wise outcome snapshots</li>
                <li>How eBodhi career support works</li>
              </ul>
            </div>
          </div>
          <aside className="sticky-side">
            <h3 style={{ marginBottom: 10 }}>Get the Report</h3>
            <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginBottom: 12 }}>
              Request a callback and we&apos;ll share the latest placement PDF with you.
            </p>
            <CallbackForm />
          </aside>
        </div>
      </section>
    </div>
  );
}
