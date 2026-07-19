import React, { useEffect, useState } from 'react';
import CallbackForm from '../components/CallbackForm';

export default function Masterclass() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/masterclasses')
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setItems(d); })
      .catch(() => {});
  }, []);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Free Masterclasses</h1>
          <p>Expert-led interactive live sessions designed to deepen your knowledge in the domain you care about.</p>
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
            {items.length === 0 && <p style={{ color: 'var(--muted)' }}>No upcoming masterclasses listed yet.</p>}
          </div>
          <aside className="sticky-side">
            <h3 style={{ marginBottom: 10 }}>Register Interest</h3>
            <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginBottom: 12 }}>
              Leave your details and we&apos;ll share the session link.
            </p>
            <CallbackForm />
          </aside>
        </div>
      </section>
    </div>
  );
}
