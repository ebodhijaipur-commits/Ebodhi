import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch, getStudentToken } from '../utils/api';

export default function PortalProfile() {
  const stored = JSON.parse(localStorage.getItem('student') || '{}');
  const [form, setForm] = useState({
    name: stored.name || '',
    phone: stored.phone || '',
    currentPassword: '',
    newPassword: ''
  });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    try {
      const data = await apiFetch('/api/students/auth/profile', {
        method: 'PUT',
        token: getStudentToken(),
        body: JSON.stringify(form)
      });
      localStorage.setItem('student', JSON.stringify(data.student));
      setMsg(data.message || 'Updated');
      setForm({ ...form, currentPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container portal-shell" style={{ maxWidth: 560 }}>
      <Link to="/portal" className="btn btn-secondary btn-sm" style={{ marginBottom: 16 }}>← Dashboard</Link>
      <h1 style={{ marginBottom: 8 }}>Profile</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 20 }}>{stored.email}</p>
      <form className="admin-form" onSubmit={onSubmit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input type="password" placeholder="Current password (for password change)" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} />
        <input type="password" placeholder="New password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
        {msg && <p style={{ color: 'var(--success)' }}>{msg}</p>}
        {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
        <button type="submit" className="btn btn-primary">Save changes</button>
      </form>
    </div>
  );
}
