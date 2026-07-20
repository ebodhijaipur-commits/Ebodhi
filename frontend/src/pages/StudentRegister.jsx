import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { apiFetch } from '../utils/api';

export default function StudentRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiFetch('/api/students/auth/register', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      localStorage.setItem('studentToken', data.token);
      localStorage.setItem('student', JSON.stringify(data.student));
      const params = new URLSearchParams(location.search);
      navigate(params.get('next') || '/programs');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Student Account</h1>
        <p>Register, apply for a course LMS from the courses page, then wait for admin approval.</p>
        <form onSubmit={onSubmit}>
          <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
          {error && <p className="form-msg err" style={{ color: 'var(--danger)' }}>{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Creating…' : 'Register'}</button>
        </form>
        <p className="auth-switch">Already registered? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
