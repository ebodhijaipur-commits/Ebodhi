import Link from 'next/link';
import { categoryEmoji, categoryGradient, formatPrice } from '@/lib/constants';

export default function CourseCard({ course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${categoryGradient(
          course.category
        )}`}
      >
        <span className="text-5xl">{categoryEmoji(course.category)}</span>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700">
          {course.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 font-bold leading-snug group-hover:text-primary">
          {course.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {course.instructor?.name || 'Ebodhi Academy'}
        </p>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span className="font-semibold text-amber-600">★ {course.rating.toFixed(1)}</span>
          <span>•</span>
          <span>{course.level}</span>
          <span>•</span>
          <span>{course.lessons?.length || 0} lessons</span>
        </div>
        <div className="mt-3 text-lg font-extrabold">{formatPrice(course.price)}</div>
      </div>
    </Link>
  );
}
