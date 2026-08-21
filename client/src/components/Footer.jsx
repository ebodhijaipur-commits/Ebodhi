import Link from 'next/link';
import { PROGRAMS } from '@/lib/programs';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-600">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <img src="/logo.svg" alt="Ebodhi" className="h-14 w-auto" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500">
            Ebodhi offers learning programs for kids of all ages and experience levels. Students
            are taught not just the fundamentals of coding, but also how to code in practical
            software applications. With us, kids will develop the necessary skills for the future
            while having fun!
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">Programs</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {PROGRAMS.map((p) => (
              <li key={p.slug}>
                <Link href={p.href} className="hover:text-primary">
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/courses" className="hover:text-primary">
                All courses
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-primary">
                Join for free
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">Contact</h4>
          <ul className="mt-3 space-y-3 text-sm">
            <li>
              <a href="tel:+916376914651" className="hover:text-primary">
                📞 +91 63769 14651
              </a>
            </li>
            <li>
              <a href="mailto:info@ebodhi.in" className="hover:text-primary">
                ✉️ info@ebodhi.in
              </a>
            </li>
            <li className="leading-relaxed text-gray-500">
              📍 7/449, Opposite Hotel The Lalit, Malviya Nagar, Jaipur - 302017, Rajasthan, INDIA
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Ebodhi. All rights reserved.
      </div>
    </footer>
  );
}
