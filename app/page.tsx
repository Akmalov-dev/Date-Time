'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
  // 1-XATO YECHIMI: position qanday qiymat qabul qilishini (TS type) aniq yozamiz
  const [position, setPosition] = useState<{ top: string; left: string } | null>(null);

  // 2-XATO YECHIMI: 'e' (event) parametriga 'any' turini beramiz
  const moveButton = (e: any) => {
    if (e && e.type === 'touchstart') {
      e.preventDefault();
    }

    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 360;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 640;

    const btnWidth = 140;
    const btnHeight = 60;

    const maxLeft = screenWidth - btnWidth - 24;
    const maxTop = screenHeight - btnHeight - 40;

    const randomLeft = Math.max(24, Math.floor(Math.random() * maxLeft));
    const randomTop = Math.max(40, Math.floor(Math.random() * maxTop));

    setPosition({
      top: `${randomTop}px`,
      left: `${randomLeft}px`,
    });
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-dvh w-full bg-gradient-to-b from-pink-100 via-rose-50 to-pink-100 px-4 py-6 select-none overflow-hidden touch-none">
      
      {/* Sarlavha */}
      <div className="text-center max-w-xs sm:max-w-md mb-8 mt-12">
        <h1 className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight drop-shadow-sm">
          Will you go on a date with me ? ❤️
        </h1>
      </div>

      <div className="flex flex-row items-center justify-center gap-5 w-full max-w-sm">
        
        <Link
          href="/yes"
          className="group relative flex items-center justify-center w-36 sm:w-44 h-16 sm:h-20 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-3xl text-xl sm:text-2xl text-white font-extrabold shadow-lg border-t-2 border-white/40 active:translate-y-1 transition-all duration-200 cursor-pointer"
        >
          <span className="flex items-center gap-1.5 drop-shadow">
            YES 💖
          </span>
        </Link>

        <button
          onMouseEnter={moveButton}
          onTouchStart={moveButton}
          onClick={moveButton}
          style={
            position
              ? {
                  position: 'fixed',
                  top: position.top,
                  left: position.left,
                  transition: 'all 0.15s ease-out',
                  zIndex: 50,
                }
              : undefined
          }
          className="relative flex items-center justify-center w-36 sm:w-44 h-16 sm:h-20 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl text-xl sm:text-2xl text-white font-extrabold shadow-lg border-t-2 border-white/40 transition-all duration-200 select-none cursor-pointer"
        >
          <span className="flex items-center gap-1.5 drop-shadow">
            NO 💔
          </span>
        </button>

      </div>
    </main>
  );
}