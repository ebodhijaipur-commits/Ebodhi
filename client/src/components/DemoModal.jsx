'use client';

import { useState } from 'react';

export default function DemoModal({ label = 'Request a demo', className = '' }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  function submit(e) {
    e.preventDefault();
    const body = encodeURIComponent(
      `Hi Ebodhi team,\n\nI would like to book a demo.\n\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n`
    );
    window.location.href = `mailto:info@ebodhi.in?subject=${encodeURIComponent('Demo Request')}&body=${body}`;
    setOpen(false);
    setEmail('');
    setPhone('');
    setMessage('');
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Book a demo"
            className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              ✕
            </button>

            <span className="overline-label">Book a demo</span>
            <h3 className="mt-2 font-display text-xl font-extrabold text-slate-900">
              See Ebodhi in action
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Leave your details and our team will reach out within 24 hours.
            </p>

            <form onSubmit={submit} className="mt-5 space-y-3">
              <input
                type="email"
                required
                placeholder="Email address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <input
                type="tel"
                required
                placeholder="Phone number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
              />
              <textarea
                rows={4}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field resize-none"
              />
              <button type="submit" className="btn-primary w-full">
                Book my demo
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
