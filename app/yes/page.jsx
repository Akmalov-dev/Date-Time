'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DateTimePage() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const isReady = Boolean(date && time);

  // DIQQAT: Bu yerdagi '/menu' sizning ovqat tanlanadigan papkangiz nomi bo'lishi kerak.
  // Agar u boshqacha atalgan bo'lsa (masalan /food), shunga o'zgartiring.
  const targetUrl = `/feel?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`;

  return (
    <main className="flex flex-col items-center justify-center min-h-dvh w-full bg-gradient-to-b from-rose-100 via-pink-50 to-rose-100 px-4 py-8 select-none">
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-pink-200 text-center">
        <h1 className="text-2xl font-black text-rose-600 mb-6">
          Choose a right time for you? 📅
        </h1>
        <div className="flex flex-col gap-4 text-left">
          <div>
            <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1.5 ml-1 required:">Day</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-2xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1.5 ml-1 required:">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-2xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <Link
            href={isReady ? targetUrl : '/feel'}
            className={`mt-4 w-full py-4 rounded-2xl font-extrabold text-lg transition-all text-center ${
              isReady
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-pink-300'
                : 'bg-gray-300 text-gray-500 pointer-events-none'
            }`}
          >
            Next ✨
          </Link>
        </div>
      </div>
    </main>
  );
} 