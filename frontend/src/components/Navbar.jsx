import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, LayoutDashboard, Home } from 'lucide-react';
import PromoBanner from './PromoBanner';
import { useSiteSettings } from '../context/SiteSettingsContext';

const courseLinks = [
  { title: 'Full Stack', desc: 'React, Node, APIs & projects', to: '/programs?category=Full%20Stack' },
  { title: 'Data Science with AI/ML', desc: 'EDA, ML & AI projects', to: '/programs?category=Data%20Science' },
  { title: 'Digital Marketing', desc: 'SEO, social & paid campaigns', to: '/programs?category=Digital%20Marketing' },
  { title: 'Data Analytics', desc: 'Excel, SQL & dashboards', to: '/programs?category=Data%20Analytics' },
  { title: 'App Development', desc: 'Android & iOS apps', to: '/programs?category=App%20Development' }
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoSrc } = useSiteSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const [student, setStudent] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const closeTimer = React.useRef(null);

  useEffect(() => {
    const raw = localStorage.getItem('student');
    setStudent(raw ? JSON.parse(raw) : null);
    setIsAdmin(!!localStorage.getItem('token'));
    setMenuOpen(false);
    setOpenMega(null);
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [location]);

  if (location.pathname.startsWith('/admin')) return null;

  const openMenu = (key) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMega(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMega(null), 180);
  };

  const logoutStudent = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('student');
    setStudent(null);
    navigate('/');
  };

  return (
    <>
      <PromoBanner />
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo">
            <img src={logoSrc} alt="eBodhi" />
          </Link>

          <ul className="nav-links">
            <li>
              <Link
                to="/"
                className={`nav-link nav-home ${location.pathname === '/' ? 'active' : ''}`}
                aria-label="Home"
                title="Home"
              >
                <Home size={18} strokeWidth={2.2} />
                <span>Home</span>
              </Link>
            </li>
            <li className="mega-wrap" onMouseEnter={() => openMenu('courses')} onMouseLeave={scheduleClose}>
              <Link
                to="/programs"
                className={`nav-drop-btn ${location.pathname.startsWith('/programs') ? 'active' : ''}`}
                onClick={() => setOpenMega(null)}
              >
                Courses <ChevronDown size={16} />
              </Link>
              {openMega === 'courses' && (
                <div className="mega-menu" onMouseEnter={() => openMenu('courses')} onMouseLeave={scheduleClose}>
                  <h4>Skill Development Programs</h4>
                  <Link to="/programs" className="mega-item mega-item-all" onClick={() => setOpenMega(null)}>
                    <strong>All Courses</strong>
                    <span>Browse every LMS track</span>
                  </Link>
                  {courseLinks.map((p) => (
                    <Link key={p.title} to={p.to} className="mega-item" onClick={() => setOpenMega(null)}>
                      <strong>{p.title}</strong>
                      <span>{p.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <li><Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About Us</Link></li>
            <li><Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact Us</Link></li>
            {student ? (
              <>
                <li>
                  <Link to="/portal" className="btn btn-ghost btn-sm nav-cta">
                    <LayoutDashboard size={16} /> My Portal
                  </Link>
                </li>
                <li>
                  <button type="button" className="btn btn-accent btn-sm" onClick={logoutStudent}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="btn btn-ghost btn-sm nav-cta">Login</Link>
              </li>
            )}
            {isAdmin && (
              <li><Link to="/admin" className="btn btn-secondary btn-sm">Admin</Link></li>
            )}
          </ul>

          <button type="button" className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
          <Link to="/"><Home size={18} /> Home</Link>
          <Link to="/programs">Courses</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          {student ? <Link to="/portal">My Portal</Link> : <Link to="/login">Login</Link>}
        </div>
      </nav>
    </>
  );
}
