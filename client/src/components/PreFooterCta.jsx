'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HIDDEN_PATHS = ['/login', '/register', '/dashboard'];

export default function PreFooterCta() {
  const pathname = usePathname();
  if (HIDDEN_PATHS.includes(pathname)) return null;

  return (
    <section className="bg-primary-light">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Ready to start learning?
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Join thousands of learners building future-ready skills with Ebodhi.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <Link href="/courses" className="btn-primary">
            Browse courses
          </Link>
          <Link href="/register" className="btn-outline border-gray-400">
            Join for free
          </Link>
        </div>
      </div>
    </section>
  );
}
