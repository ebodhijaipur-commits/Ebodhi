import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import CallbackForm from '../components/CallbackForm';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function Campus() {
  const { settings } = useSiteSettings();
  const phone = settings.phone || '+91-141-404-5555';

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>eBodhi Jaipur Campus</h1>
          <p>Classroom batches, project labs, and counselor support for industrial training and skill programs.</p>
        </div>
      </section>
      <section className="section">
        <div className="container two-col">
          <div>
            <h2 style={{ marginBottom: 12 }}>eBodhi Jaipur Center</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
              Classroom batches, project labs, and counselor support for full-stack, kids coding, and marketing programs.
            </p>
            <ul style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
              <li style={{ display: 'flex', gap: 10 }}>
                <MapPin /> 7/449, Opposite Hotel The Lalit, Malviya Nagar, Jaipur - 302017, Rajasthan
              </li>
              <li style={{ display: 'flex', gap: 10 }}><Mail /> info@ebodhi.com</li>
              <li style={{ display: 'flex', gap: 10 }}><Phone /> {phone}</li>
            </ul>
            <div className="campus-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="campus-card">
                <h3>Jaipur</h3>
                <p style={{ color: 'var(--muted)' }}>Rajasthan · Open</p>
              </div>
              <div className="campus-card soon">
                <h3>Coming Soon</h3>
                <p style={{ color: 'var(--muted)' }}>More cities soon</p>
              </div>
            </div>
            <Link to="/programs?category=Kids%20Coding" className="btn btn-primary" style={{ marginTop: 20 }}>View Campus Programs</Link>
          </div>
          <div className="sticky-side">
            <h3 style={{ marginBottom: 12 }}>Visit / Callback</h3>
            <CallbackForm />
          </div>
        </div>
      </section>
    </div>
  );
}
