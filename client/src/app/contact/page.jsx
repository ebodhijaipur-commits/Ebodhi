'use client';

import { useState } from 'react';

const INFO = [
  {
    icon: '📞',
    title: 'Call us',
    lines: [
      { label: '+91-141-404-5555', href: 'tel:+911414045555' },
      { label: '+91 63769 14651', href: 'tel:+916376914651' },
    ],
  },
  {
    icon: '✉️',
    title: 'Email us',
    lines: [{ label: 'info@ebodhi.in', href: 'mailto:info@ebodhi.in' }],
  },
  {
    icon: '📍',
    title: 'Visit us',
    lines: [
      {
        label: '7/449, Opposite Hotel The Lalit, Malviya Nagar, Jaipur - 302017, Rajasthan, INDIA',
        href: 'https://www.google.com/maps/search/?api=1&query=7%2F449+Opposite+Hotel+The+Lalit+Malviya+Nagar+Jaipur',
      },
    ],
  },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  function submit(e) {
    e.preventDefault();
    const body = encodeURIComponent(
      `Hi Ebodhi team,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n`
    );
    window.location.href = `mailto:info@ebodhi.in?subject=${encodeURIComponent('Website Enquiry')}&body=${body}`;
  }

  return (
    <div>
      <section className="hero-mesh relative overflow-hidden border-b border-slate-100">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center">
          <span className="overline-label">Contact us</span>
          <h1 className="section-title mt-3">We&apos;d be delighted to hear from you!</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600">
            Interested in any of our courses or want more information? Fill out the form below and
            one of our experts will contact you — all enquiries are answered within 24 hours.
            Please bear with us on weekends.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {INFO.map((card) => (
            <div key={card.title} className="card-lift rounded-3xl border border-slate-100 bg-white p-7 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-2xl">{card.icon}</div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{card.title}</h3>
              <ul className="mt-2 space-y-1.5">
                {card.lines.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="text-sm leading-relaxed text-slate-500 transition hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50/70 py-16">
        <div className="mx-auto max-w-2xl px-4">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lift sm:p-10">
            <span className="overline-label">Send a message</span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-slate-900">
              Questions, suggestions or feedback?
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              We&apos;d love to connect with you.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <input
                type="text"
                required
                placeholder="Your name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
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
                rows={5}
                required
                placeholder="Your message *"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field resize-none"
              />
              <button type="submit" className="btn-primary w-full">
                Send message
              </button>
              <p className="text-center text-xs text-gray-400">
                This opens your email app with the message pre-filled.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
