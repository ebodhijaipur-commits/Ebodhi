import React, { useEffect, useRef, useState } from 'react';

export default function CallbackForm({ courses = [], dark = false, defaultCourseSlug = '', autoFocus = false }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', courseId: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const nameRef = useRef(null);

  useEffect(() => {
    if (!defaultCourseSlug || !courses.length) return;
    const match = courses.find((c) => c.slug === defaultCourseSlug);
    if (match) {
      setFormData((prev) => ({ ...prev, courseId: match._id }));
    }
  }, [defaultCourseSlug, courses]);

  useEffect(() => {
    if (!autoFocus) return;
    const timer = window.setTimeout(() => {
      nameRef.current?.focus({ preventScroll: true });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [autoFocus, defaultCourseSlug]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });
    if (!formData.name || !formData.email || !formData.phone) {
      setStatus({ type: 'err', text: 'Name, email, and phone are required.' });
      return;
    }
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      setStatus({ type: 'ok', text: 'Thanks! Our counselor will call you shortly.' });
      setFormData({ name: '', email: '', phone: '', courseId: '', message: '' });
    } catch (err) {
      setStatus({ type: 'err', text: err.message || 'Could not submit. Try again.' });
    }
  };

  return (
    <form id="callback-form" className="callback-form" onSubmit={onSubmit}>
      <input ref={nameRef} name="name" placeholder="Full name" value={formData.name} onChange={onChange} />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={onChange} />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={onChange} />
      {courses.length > 0 && (
        <select name="courseId" value={formData.courseId} onChange={onChange}>
          <option value="">Interested program (optional)</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>{c.title}</option>
          ))}
        </select>
      )}
      <textarea name="message" placeholder="Message (optional)" value={formData.message} onChange={onChange} />
      <button type="submit" className={`btn ${dark ? 'btn-accent' : 'btn-primary'}`}>Request Callback</button>
      {status.text && (
        <p
          className={`form-msg ${status.type}`}
          style={
            !dark && status.type === 'ok'
              ? { color: 'var(--success)' }
              : !dark && status.type === 'err'
                ? { color: 'var(--danger)' }
                : undefined
          }
        >
          {status.text}
        </p>
      )}
    </form>
  );
}
