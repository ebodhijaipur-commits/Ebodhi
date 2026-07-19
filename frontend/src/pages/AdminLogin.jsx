import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/admin');
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', JSON.stringify(data.admin));
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Could not reach server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-visual">
        <div>
          <div className="admin-brand-mark" style={{ marginBottom: 18 }}><Shield size={20} /></div>
          <h1>eBodhi Control Center</h1>
          <p>Manage leads, courses, enrollments, workshops, and site content from one interactive dashboard.</p>
        </div>
      </div>
      <div className="admin-login-panel">
        <div className="admin-login-card">
          <h2>Admin sign in</h2>
          <p>Use your admin credentials to continue.</p>
          <form onSubmit={handleLogin}>
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              autoComplete="username"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              autoComplete="current-password"
              required
            />
            {error && <p style={{ color: 'var(--danger)', margin: 0 }}>{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Signing in…' : 'Enter dashboard'}
            </button>
          </form>
          <p className="admin-login-meta">
            <Link to="/"><ArrowLeft size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />Back to site</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
