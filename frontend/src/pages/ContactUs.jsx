import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Mail, Phone, Sparkles } from 'lucide-react';
import CallbackForm from '../components/CallbackForm';
import ContactHeroReel from '../components/ContactHeroReel';
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
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-glow" aria-hidden="true" />
        <div className="contact-hero-glow contact-hero-glow-b" aria-hidden="true" />
        <div className="contact-hero-grid" aria-hidden="true" />
        <div className="container contact-hero-inner">
          <div className="contact-hero-intro">
            <span className="contact-hero-kicker">
              <Sparkles size={14} /> Contact Us
            </span>
            <h1>We&apos;re here to help</h1>
            <p>
              Send a message — we receive it, sort it to the right person, and get back with clear next steps.
            </p>
            <a href="#callback-form" className="btn btn-accent">Send an inquiry</a>
          </div>
          <ContactHeroReel />
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
          <div className="sticky-side" id="callback-form">
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
