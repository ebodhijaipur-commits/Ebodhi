import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SuccessStories() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    fetch('/api/alumni')
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setAlumni(d); })
      .catch(() => {});
  }, []);

  const featured = alumni.filter((a) => a.featured);
  const rest = alumni.filter((a) => !a.featured);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Success Stories</h1>
          <p>Learners who turned projects and practice into internships and first roles.</p>
          <div className="hero-stats" style={{ marginTop: 24 }}>
            <div className="hero-stat">650+ Career Transitions</div>
            <div className="hero-stat">Capstone-first learning</div>
            <div className="hero-stat">Jaipur + Online</div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Featured Journeys</h2>
            <p>From classroom projects to workplace confidence.</p>
          </div>
          <div className="alumni-grid">
            {featured.map((a) => (
              <article key={a._id} className="alumni-card">
                <img src={a.imageUrl} alt={a.name} />
                <div className="card-body">
                  <h3>{a.name}</h3>
                  <div className="role">{a.role} at {a.company}</div>
                  <p>{a.story}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="alumni-grid">
              {rest.map((a) => (
                <article key={a._id} className="alumni-card">
                  <img src={a.imageUrl} alt={a.name} />
                  <div className="card-body">
                    <h3>{a.name}</h3>
                    <div className="role">{a.role} · {a.company}</div>
                    <p>{a.story}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section-alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: 12 }}>Ready to write yours?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 20 }}>Talk to an advisor about courses or internship tracks.</p>
          <Link to="/contact" className="btn btn-primary">Talk to Program Advisor</Link>
        </div>
      </section>
    </div>
  );
}
