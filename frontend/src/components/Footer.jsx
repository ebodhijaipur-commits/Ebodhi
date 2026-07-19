import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

const toAbsoluteUrl = (value, fallback) => {
  const raw = String(value || '').trim() || fallback;
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw.replace(/^\/+/, '')}`;
};

const openInNewTab = (event, href) => {
  event.preventDefault();
  window.open(href, '_blank', 'noopener,noreferrer');
};

export default function Footer() {
  const location = useLocation();
  const { settings, logoSrc } = useSiteSettings();

  if (location.pathname.startsWith('/admin')) return null;
  if (location.pathname.startsWith('/portal')) {
    return (
      <footer className="footer" style={{ padding: '20px 0' }}>
        <div className="container footer-bottom" style={{ border: 'none', paddingTop: 0 }}>
          <p>&copy; {new Date().getFullYear()} eBodhi. All Rights Reserved.</p>
        </div>
      </footer>
    );
  }

  const links = [
    { href: toAbsoluteUrl(settings.instagram, 'https://www.instagram.com/'), label: 'Instagram', Icon: Instagram },
    { href: toAbsoluteUrl(settings.facebook, 'https://www.facebook.com/'), label: 'Facebook', Icon: Facebook },
    { href: toAbsoluteUrl(settings.linkedin, 'https://www.linkedin.com/'), label: 'LinkedIn', Icon: Linkedin }
  ].filter((item) => item.href);

  const phone = settings.phone || '+91-141-404-5555';
  const telHref = `tel:${phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="logo footer-logo" style={{ marginBottom: 12 }}>
              <img src={logoSrc} alt="eBodhi" />
            </Link>
            <p style={{ marginTop: 12 }}>
              Jaipur-based skill academy for industrial training, job-ready courses, and GenAI-assisted learning — online and on campus.
            </p>
          </div>

          <div>
            <h3>Learn</h3>
            <ul className="footer-links">
              <li><Link to="/programs" className="footer-link">Courses</Link></li>
              <li><Link to="/internships" className="footer-link">Internship Programs</Link></li>
              <li><Link to="/workshops" className="footer-link">Workshops</Link></li>
            </ul>
          </div>

          <div>
            <h3>Company</h3>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/campus" className="footer-link">Jaipur Campus</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="/admin/login" className="footer-link">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul className="footer-links">
              <li style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>7/449, Opposite Hotel The Lalit, Malviya Nagar, Jaipur - 302017</span>
              </li>
              <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Phone size={16} />
                <a href={telHref} className="footer-link">{phone}</a>
              </li>
              <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Mail size={16} />
                <span>info@ebodhi.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} eBodhi (GIPL Initiative). All Rights Reserved.</p>
          {links.length > 0 && (
            <div className="social-links">
              {links.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={label}
                  title={label}
                  onClick={(event) => openInNewTab(event, href)}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
