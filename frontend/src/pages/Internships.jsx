import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import CallbackForm from '../components/CallbackForm';
import ProgramCard from '../components/ProgramCard';

const benefits = [
  'Industrial problem statements with mentor checkpoints',
  'Capstone demos suitable for resumes & GitHub',
  'College-friendly timelines (summer / semester breaks)',
  'Option to continue into a full skill track afterward'
];

export default function Internships() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setCourses(d.filter((c) => !c.isFree).slice(0, 3)); })
      .catch(() => {});
  }, []);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Internship & Industrial Training</h1>
          <p>
            Structured internship-style programs for college students — hands-on projects, mentor feedback,
            and skills that map to real workplace stacks.
          </p>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container two-col">
          <div>
            <h2 style={{ marginBottom: 14 }}>What you get</h2>
            <ul style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
              {benefits.map((b) => (
                <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <CheckCircle size={20} color="var(--success)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <h3 style={{ marginBottom: 12 }}>Popular internship-linked tracks</h3>
            <div className="card-grid">
              {courses.map((c) => <ProgramCard key={c._id} course={c} />)}
            </div>
            <Link to="/programs" className="btn btn-primary" style={{ marginTop: 20 }}>Browse all courses</Link>
          </div>
          <aside className="sticky-side">
            <h3 style={{ marginBottom: 10 }}>Apply / Enquire</h3>
            <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginBottom: 12 }}>
              Share your college, year, and interest — we&apos;ll guide the right batch.
            </p>
            <CallbackForm courses={courses} />
          </aside>
        </div>
      </section>
    </div>
  );
}
