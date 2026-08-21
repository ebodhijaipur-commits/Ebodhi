import Link from 'next/link';

export default function PreFooterCta() {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary-light via-white to-purple-50 px-8 py-12 text-center shadow-soft sm:px-14">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 animate-float rounded-full bg-primary/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 animate-float-slow rounded-full bg-purple-400/15 blur-2xl" />
        <div className="relative">
          <h2 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-600">
            Talk to our counsellors for a free career roadmap session — no strings attached.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="tel:+916376914651" className="btn-primary">
              📞 Call +91 63769 14651
            </a>
            <Link href="/courses" className="btn-outline">
              Explore courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
