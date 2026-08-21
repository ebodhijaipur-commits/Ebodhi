'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const LINKS = [
  { href: '/programs/school', label: 'School Students' },
  { href: '/programs/college', label: 'College Students' },
  { href: '/programs/professionals', label: 'Professionals' },
  { href: '/courses', label: 'All Courses' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="Ebodhi" className="h-14 w-auto" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                  active ? 'bg-primary-light text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/register"
            className="btn-primary !px-5 !py-2.5 text-sm"
          >
            Join for free
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 md:hidden"
        >
          <span className={`h-0.5 w-5 rounded bg-slate-700 transition-transform ${open ? 'translate-y-1 rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 rounded bg-slate-700 transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 rounded bg-slate-700 transition-transform ${open ? '-translate-y-1 -rotate-45' : ''}`}></span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                pathname.startsWith(l.href) ? 'bg-primary-light text-primary' : 'text-slate-600'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/register" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full text-sm">
            Join for free
          </Link>
        </div>
      )}
    </header>
  );
}
