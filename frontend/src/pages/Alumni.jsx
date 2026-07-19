import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Alumni() {
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
          <h1>From eBodhi Classrooms to Careers</h1>
          <p>Beyond skills, eBodhi gives you a network for life. Discover how our alumni lead and innovate.</p>
          <div className="hero-stats" style={{ marginTop: 24 }}>
            <div className="hero-stat">850+ Career Transitions</div>
            <div className="hero-stat">25+ Industry Mentors</div>
            <div className="hero-stat">Jaipur + Online</div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Featured Alumni</h2>
            <p>Learners who made the leap into roles they aimed for.</p>
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
            <div className="section-head">
              <h2>Alumni Network</h2>
            </div>
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
          <h2 style={{ marginBottom: 12 }}>Build Your Career Today</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 20 }}>Master skills that help you get hired.</p>
          <Link to="/contact" className="btn btn-primary">Talk to Program Advisor</Link>
        </div>
      </section>
    </div>
  );
}
