'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const foodOptions = [
  { id: 1, name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', icon: '🍔' },
  { id: 2, name: 'Pitsa', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80', icon: '🍕' },
  { id: 3, name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80', icon: '🍣' },
  { id: 4, name: 'Osh', image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500&q=80', icon: '🍚' },
  { id: 5, name: 'Shashlik', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80', icon: '🥩' },
  { id: 6, name: 'Muzqaymoq', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&q=80', icon: '🍦' },
];

function MenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Link o'rniga ishlatamiz

  // 1. OLDINGI SAHIFADAN SANA VA VAQTNI USHLAB OLAMIZ
  const date = searchParams.get('date') || 'Kiritilmadi';
  const time = searchParams.get('time') || 'Kiritilmadi';

  const [selectedFoodId, setSelectedFoodId] = useState(null);

  // 2. TUGMA BOSILGANDA UCHALASINI HAM FINAL SAHIFAGA JO'NATAMIZ
  const handleNext = () => {
    if (!selectedFoodId) {
      alert("Iltimos, nima yeyishimizni tanlang! 🍕");
      return;
    }

    const selectedFoodName = foodOptions.find(f => f.id === selectedFoodId)?.name || '';

    // E'TIBOR BERING: food, date va time - barchasi urlga tirkalyapti!
    const targetUrl = `/final?food=${encodeURIComponent(selectedFoodName)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`;
    
    // Final sahifaga yo'naltirish
    router.push(targetUrl);
  };

  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-200">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3 animate-bounce">🤤</div>
        <h1 className="text-2xl sm:text-3xl font-black text-orange-600 mb-2">Nima yeymiz?</h1>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-6 max-h-[50vh] overflow-y-auto p-1 custom-scrollbar">
        {foodOptions.map((food) => (
          <div
            key={food.id}
            onClick={() => setSelectedFoodId(food.id)}
            className={`relative flex flex-col items-center justify-center rounded-2xl p-2.5 border-2 cursor-pointer transition-all ${
              selectedFoodId === food.id ? 'border-orange-500 bg-orange-100 scale-[1.02] shadow-md' : 'border-orange-100 bg-gray-50'
            }`}
          >
            <img src={food.image} alt={food.name} className="w-full h-24 object-cover rounded-xl mb-2" />
            <p className="text-xs font-bold text-gray-700">{food.icon} {food.name}</p>
            {selectedFoodId === food.id && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full p-1 text-xs z-10">✅</div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        className={`w-full py-4 rounded-2xl font-extrabold text-lg transition-all ${
          selectedFoodId 
            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg active:scale-95' 
            : 'bg-gray-200 text-gray-400'
        }`}
      >
        Tayyor ✨
      </button>
    </div>
  );
}

// Next.js da searchParams ishlashi uchun Suspense majburiy
export default function MenuPage() {
  return (
    <main className="flex items-center justify-center min-h-dvh bg-orange-50 px-4 py-8">
      <Suspense fallback={<div className="text-orange-500 font-bold">Yuklanmoqda...</div>}>
        <MenuContent />
      </Suspense>
    </main>
  );
}