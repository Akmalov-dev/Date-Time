'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

// Rejani chiroyli matn formatiga keltirish funksiyasi
const formatPlanForSharing = (food, date, time) => {
  return `Urrra! Mana bizning rejalarimiz:

🍽️ Taom: ${food}
📅 Sana: ${date}
⏰ Vaqt: ${time}

Sizni intizorlik bilan kutaman! ❤️`;
};

function FinalCard() {
  const searchParams = useSearchParams();
  const [isCopied, setIsCopied] = useState(false);

  const food = searchParams.get('food') || 'Hali tanlanmadi';
  const date = searchParams.get('date') || 'Hali tanlanmadi';
  const time = searchParams.get('time') || 'Hali tanlanmadi';

  const handleCopy = async () => {

    const textToCopy = formatPlanForSharing(food, date, time);

    try {
  
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Nusxa olishda xatolik yuz berdi:', err);
      alert('Kechirasiz, nusxa olib bo\'lmadi. Iltimos, brauzer sozlamalarini tekshiring.');
    }
  };

  return (
    <div className="w-full max-w-sm bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_-5px_rgba(249,115,22,0.2)] border border-orange-200 text-center">
      <div className="text-6xl mb-4">🥂✨</div>
      
      <h1 className="text-2xl sm:text-3xl font-black text-orange-600 mb-3 drop-shadow-sm">
        Our plan is ready 🥳 
      </h1>

      <div className="bg-orange-50 rounded-2xl p-5 my-5 border border-orange-100 text-left">
        <p className="text-gray-700 text-xs font-bold uppercase tracking-wider mb-3 ml-1">
          Final:
        </p>
        
        <div className="flex flex-col gap-2">
          <p className="text-gray-800 text-sm sm:text-base font-bold bg-white p-3 rounded-xl shadow-inner border border-orange-50">
            🍽️ Taom: <span className="text-orange-600 block mt-1">{food}</span>
          </p>
          <p className="text-gray-800 text-sm sm:text-base font-bold bg-white p-3 rounded-xl shadow-inner border border-orange-50">
            📅 Sana: <span className="text-orange-600 block mt-1">{date}</span>
          </p>
          <p className="text-gray-800 text-sm sm:text-base font-bold bg-white p-3 rounded-xl shadow-inner border border-orange-50">
            ⏰ Vaqt: <span className="text-orange-600 block mt-1">{time}</span>
          </p>
        </div>
      </div>

      <p className="text-sm text-orange-500 font-medium mb-6">
        copy the plan and send it to me! 👇
      </p>

      <button
        onClick={handleCopy}
        className={`relative w-full py-4 rounded-2xl font-extrabold text-lg transition-all duration-300 border-t-2 border-white/40 flex items-center justify-center gap-2 overflow-hidden ${
          isCopied
            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-200 scale-95'
            : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white shadow-lg shadow-orange-300/50'
        }`}
      >
        {isCopied ? (
          <>
           Plan copied ! ✅
            <span className="absolute inset-0 bg-white/20 animate-pulse"></span>
          </>
        ) : (
          'Copy plan 📋'
        )}
      </button>

    </div>
  );
}

// Suspense wrapper Next.js query parametrlarini xavfsiz o'qishi uchun kerak
export default function FinalPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-dvh w-full bg-gradient-to-b from-orange-50 via-amber-100 to-orange-50 px-4 py-8 select-none">
      <Suspense fallback={<div className="text-orange-600 font-bold text-xl animate-pulse">Reja yuklanmoqda...</div>}>
        <FinalCard />
      </Suspense>
    </main>
  );
}