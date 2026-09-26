import { useState, useEffect } from 'react';
import { Sparkles, Heart, Gift, Cake } from 'lucide-react';
import { sfx } from '../utils/audio';

interface PreloaderProps {
  onOpen: () => void;
}

export function Preloader({ onOpen }: PreloaderProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const hearts = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      delay: Math.random() * 5,
      size: 16 + Math.random() * 20,
    }));
    setFloatingHearts(hearts);
  }, []);

  const handleOpenClick = () => {
    sfx.playChime();
    setIsClosing(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 transition-all duration-700 ${
        isClosing ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-pink-300/60 animate-bounce transition-all"
            style={{
              left: `${heart.left}%`,
              bottom: '-20px',
              animationDuration: `${4 + (heart.id % 4)}s`,
              animationDelay: `${heart.delay}s`,
              fontSize: `${heart.size}px`,
            }}
          >
            {heart.id % 3 === 0 ? '🌸' : heart.id % 2 === 0 ? '💖' : '✨'}
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="relative mx-4 max-w-md w-full bg-white/85 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-pink-200/80 text-center animate-glow">
        {/* Cute Top Ribbon Tag */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-medium tracking-wide mb-5 border border-pink-200">
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>A Special Birthday Surprise</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Big Avatar / Icon lockup */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 animate-pulse opacity-70 blur-md"></div>
          <div className="relative w-24 h-24 rounded-full bg-pink-50 border-4 border-white shadow-md flex items-center justify-center">
            <Cake className="w-12 h-12 text-pink-500 animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-amber-400 text-white rounded-full p-1.5 shadow">
            <Heart className="w-4 h-4 fill-white text-white" />
          </div>
        </div>

        {/* Title & Name */}
        <h2 className="text-sm uppercase tracking-widest text-pink-600 font-semibold mb-1">
          Special Delivery For
        </h2>
        <h1 className="font-script text-4xl md:text-5xl font-bold text-pink-600 mb-2 drop-shadow-sm">
          Keisya Felita
        </h1>
        <p className="text-xs md:text-sm text-neutral-600 mb-6 font-normal">
          Hari ini babak baru dimulai. Selamat menyambut usia ke-17 yang manis & penuh cinta! ✨
        </p>

        {/* Milestone badge */}
        <div className="p-3 bg-pink-50/90 rounded-2xl border border-pink-100 mb-8 flex items-center justify-center gap-3 text-xs text-pink-800">
          <span className="font-medium">27 September 2009</span>
          <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>
          <span className="font-bold text-pink-600">Sweet 17th Birthday! 🎉</span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleOpenClick}
          className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-semibold text-base shadow-lg shadow-pink-400/40 hover:shadow-pink-400/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
        >
          <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Buka Kejutan! 💌</span>
          <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
        </button>

        <p className="text-[11px] text-pink-400/80 mt-4 flex items-center justify-center gap-1">
          <Heart className="w-3 h-3 fill-current" />
          Disiapkan dengan penuh kasih & doa
        </p>
      </div>
    </div>
  );
}
