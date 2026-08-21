'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUser, logout } from '@/lib/auth';
import { PROGRAMS } from '@/lib/programs';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
    const onUpdate = () => setUser(getUser());
    window.addEventListener('auth-changed', onUpdate);
    return () => window.removeEventListener('auth-changed', onUpdate);
  }, []);

  function handleLogout() {
    logout();
    setUser(null);
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="Ebodhi" className="h-10 w-auto" />
          </Link>
          <div className="relative group hidden sm:block">
            <button className="text-sm font-semibold text-gray-700 hover:text-primary">
              Programs ▾
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-72 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
                {PROGRAMS.map((p) => (
                  <Link
                    key={p.slug}
                    href={p.href}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50"
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-lg ${p.gradient}`}>
                      {p.emoji}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-gray-800">{p.name}</span>
                      <span className="block text-xs text-gray-500">{p.grades}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            href="/courses"
            className="hidden text-sm font-semibold text-gray-700 hover:text-primary sm:block"
          >
            Explore
          </Link>
          <Link
            href="/dashboard"
            className="hidden text-sm font-semibold text-gray-700 hover:text-primary sm:block"
          >
            My Learning
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-gray-600 sm:block">
                Hi, {user.name.split(' ')[0]}
              </span>
              <button onClick={handleLogout} className="btn-outline !px-4 !py-1.5">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/register" className="btn-primary !px-4 !py-1.5">
                Join for free
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
