import React, { useEffect, useState } from 'react';
import CallbackForm from '../components/CallbackForm';
import { fallbackWorkshops } from '../data/fallbackContent';

export default function Workshops() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/masterclasses')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setItems(d);
        else setItems(fallbackWorkshops);
      })
      .catch(() => setItems(fallbackWorkshops));
  }, []);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Workshops</h1>
          <p>Short, intensive sessions led by eBodhi mentors — deepen a skill, then decide on a full program.</p>
        </div>
      </section>
      <section className="section">
        <div className="container two-col-wide">
          <div className="card-grid">
            {items.map((m) => (
              <article key={m._id} className="program-card">
                {m.imageUrl && <img src={m.imageUrl} alt={m.title} />}
                <div className="program-body">
                  <div className="program-cat">{m.domain}</div>
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                  <div className="meta-row">
                    <span>{new Date(m.date).toLocaleString('en-IN')}</span>
                    <span>{m.seats} seats</span>
                    <span>{m.mentor}</span>
                  </div>
                </div>
              </article>
            ))}
            {items.length === 0 && <p style={{ color: 'var(--muted)' }}>No workshops listed yet — check back soon.</p>}
          </div>
          <aside className="sticky-side">
            <h3 style={{ marginBottom: 10 }}>Register Interest</h3>
            <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginBottom: 12 }}>
              We&apos;ll share schedule and joining details.
            </p>
            <CallbackForm />
          </aside>
        </div>
      </section>
    </div>
  );
}
