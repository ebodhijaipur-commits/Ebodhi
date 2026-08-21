'use client';

import { useState } from 'react';

export default function SessionAccordion({ sessions }) {
  const [open, setOpen] = useState(null);

  return (
    <ol className="mt-6 space-y-3">
      {sessions.map(([title, learn, practise, bridge, homework], i) => {
        const isOpen = open === i;
        return (
          <li
            key={i}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-orange-50/50"
            >
              <span className="w-8 shrink-0 text-sm font-black text-orange-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-semibold">{title}</span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-lg font-bold transition ${
                  isOpen
                    ? 'border-orange-500 bg-orange-500 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>

            {isOpen && (
              <div className="grid gap-4 border-t border-gray-100 bg-gray-50/60 px-5 py-5 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <span className="text-xs font-black uppercase tracking-wide text-blue-600">
                    Learn
                  </span>
                  <p className="mt-1 text-sm text-gray-700">{learn}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <span className="text-xs font-black uppercase tracking-wide text-emerald-600">
                    Practise
                  </span>
                  <p className="mt-1 text-sm text-gray-700">{practise}</p>
                </div>
                <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 sm:col-span-2">
                  <span className="text-xs font-black uppercase tracking-wide text-purple-600">
                    Bridge → next class
                  </span>
                  <p className="mt-1 text-sm text-purple-900">{bridge}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:col-span-2">
                  <span className="text-xs font-black uppercase tracking-wide text-amber-600">
                    Homework
                  </span>
                  <p className="mt-1 text-sm text-gray-700">{homework}</p>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
