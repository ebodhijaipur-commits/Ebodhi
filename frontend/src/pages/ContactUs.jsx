import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import CallbackForm from '../components/CallbackForm';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function ContactUs() {
  const [courses, setCourses] = useState([]);
  const [searchParams] = useSearchParams();
  const courseSlug = searchParams.get('course') || '';
  const { settings } = useSiteSettings();
  const phone = settings.phone || '+91-141-404-5555';

  useEffect(() => {
    fetch('/api/courses').then((r) => r.json()).then((d) => { if (Array.isArray(d)) setCourses(d); }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!courseSlug) return;
    const timer = window.setTimeout(() => {
      const el = document.getElementById('callback-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [courseSlug]);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Have questions about programs, batches, or campus visits? We&apos;re here to help.</p>
        </div>
      </section>
      <section className="section">
        <div className="container two-col">
          <div>
            <h2 style={{ marginBottom: 16 }}>Reach eBodhi</h2>
            <ul style={{ display: 'grid', gap: 14, marginBottom: 24 }}>
              <li style={{ display: 'flex', gap: 10 }}><MapPin /> 7/449, Opposite Hotel The Lalit, Malviya Nagar, Jaipur - 302017</li>
              <li style={{ display: 'flex', gap: 10 }}><Phone /> {phone}</li>
              <li style={{ display: 'flex', gap: 10 }}><Mail /> info@ebodhi.com</li>
            </ul>
            <div className="campus-card">
              <h3>Office hours</h3>
              <p style={{ color: 'var(--muted)', marginTop: 8 }}>Mon–Sat · 10:00 AM – 7:00 PM</p>
            </div>
          </div>
          <div className="sticky-side">
            <h3 style={{ marginBottom: 12 }}>Send an inquiry</h3>
            <CallbackForm
              courses={courses}
              defaultCourseSlug={courseSlug}
              autoFocus={!!courseSlug}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
