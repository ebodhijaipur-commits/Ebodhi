import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { apiFetch } from '../utils/api';

export default function StudentLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiFetch('/api/students/auth/login', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      localStorage.setItem('studentToken', data.token);
      localStorage.setItem('student', JSON.stringify(data.student));
      const params = new URLSearchParams(location.search);
      const next = params.get('next') || location.state?.from || '/portal';
      navigate(next);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Student Login</h1>
        <p>Access your enrolled programs and classroom progress.</p>
        <form onSubmit={onSubmit}>
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {error && <p className="form-msg err" style={{ color: 'var(--danger)' }}>{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Signing in…' : 'Login'}</button>
        </form>
        <p className="auth-switch">New here? <Link to="/register">Create an account</Link></p>
      </div>
    </div>
  );
}
