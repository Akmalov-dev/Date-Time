'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  const [position, setPosition] = useState(null);

  const moveButton = (e) => {
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
      <div className="relative w-full max-w-[320px] sm:max-w-[400px] h-48 sm:h-60 mb-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 mb-15">
        <Image
          src="/yesorno.jpeg" 
          alt="Valentine Illustration"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="text-center max-w-xs sm:max-w-md mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight drop-shadow-sm">
           Will you go on a date with me ? ❤️
        </h1>
      </div>

      <div className="flex flex-row items-center justify-center gap-15 w-full max-w-sm">
        
        <Link
          href="/yes"
          className="group relative flex items-center justify-center w-36 sm:w-44 h-16 sm:h-20 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-3xl text-xl sm:text-2xl text-white font-extrabold shadow-[0_10px_25px_-5px_rgba(244,63,94,0.5)] border-t-2 border-white/40 active:translate-y-1 active:shadow-md transition-all duration-200"
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
          className="relative flex items-center justify-center w-36 sm:w-44 h-16 sm:h-20 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl text-xl sm:text-2xl text-white font-extrabold shadow-[0_10px_25px_-5px_rgba(79,70,229,0.4)] border-t-2 border-white/40 active:translate-y-1 transition-all duration-200"
        >
          <span className="flex items-center gap-1.5 drop-shadow">
            NO 💔
          </span>
        </button>

      </div>
    </main>
  );
}