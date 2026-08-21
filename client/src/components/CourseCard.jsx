import Link from 'next/link';
import { categoryImage } from '@/lib/constants';

const LEVEL_COLORS = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-rose-100 text-rose-700',
};

export default function CourseCard({ course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={categoryImage(course.category)}
          alt={`${course.category} course illustration`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-primary shadow-sm">
          ₹{course.price.toLocaleString('en-IN')}
        </span>
        <span
          className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-bold ${
            LEVEL_COLORS[course.level] || 'bg-slate-100 text-slate-700'
          }`}
        >
          {course.level}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-amber-500">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.29 3.96a1 1 0 00.95.69h4.16c.97 0 1.37 1.24.59 1.81l-3.37 2.45a1 1 0 00-.36 1.12l1.28 3.95c.3.93-.75 1.7-1.54 1.13l-3.36-2.44a1 1 0 00-1.18 0l-3.36 2.44c-.78.57-1.84-.2-1.54-1.13l1.29-3.95a1 1 0 00-.37-1.12L2.07 9.39c-.78-.57-.38-1.81.6-1.81h4.15a1 1 0 00.95-.69l1.28-3.96z" />
          </svg>
          <span>4.8</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{course.duration} months</span>
        </div>

        <h3 className="font-display text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary">
          {course.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-500">{course.description}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{course.category}</span>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-primary transition-transform duration-300 group-hover:translate-x-1">
            View
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
