import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Heart, GraduationCap, PartyPopper, Check } from 'lucide-react';
import { sfx } from '../utils/audio';

export function FinalReveal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const exactMessage = `Happy Sweet Seventeen Keisya Felita! 🎉
Akhirnya udah punya KTP, nggak sixteen lagi! 🥳 Semoga kamu tambah dewasa, panjang umur, wish u all the best, Kei! 
Dan yang paling penting: KAMU HARUS KETERIMA DI UI, KEI! 🎓🔥 Harus semangat terus sekolah sama les-nya ya hehehehe. 
Once again, happy birthday ya! I'm so happy u were born this day 17 years ago!! 💖✨🎂`;

  const triggerGrandConfetti = () => {
    sfx.playFanfare();

    // Multi-shot grand fireworks
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#EC4899', '#DB2777', '#FBBF24', '#F472B6', '#FFFFFF', '#F59E0B'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleOpenReveal = () => {
    setIsOpen(true);
    triggerGrandConfetti();
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(exactMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="pesan-spesial" className="py-16 px-4 max-w-4xl mx-auto text-center">
      {/* Teaser Container */}
      <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 border-2 border-pink-300 shadow-2xl shadow-pink-300/30 overflow-hidden">
        {/* Floating Sparkle Elements */}
        <div className="absolute top-4 left-6 text-2xl animate-bounce" style={{ animationDuration: '3s' }}>
          💌
        </div>
        <div className="absolute top-6 right-8 text-2xl animate-bounce" style={{ animationDuration: '3.5s' }}>
          ✨
        </div>
        <div className="absolute bottom-4 left-8 text-2xl animate-bounce" style={{ animationDuration: '4s' }}>
          🎀
        </div>
        <div className="absolute bottom-6 right-6 text-2xl animate-bounce" style={{ animationDuration: '3.2s' }}>
          🎓
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-200/80 text-pink-800 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Grand Finale · Rahasia Terakhir</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          </div>

          <h2 className="font-script text-4xl md:text-6xl font-bold text-pink-600 mb-3 drop-shadow-sm">
            The Final Sweet Reveal
          </h2>
          <p className="text-sm md:text-base text-neutral-700 mb-8 max-w-lg mx-auto">
            Ada satu surat rahasia penuh cinta dan doa paling tulus yang disimpan khusus untuk hari istimewa ini. Siap membukanya?
          </p>

          {!isOpen ? (
            <button
              onClick={handleOpenReveal}
              className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-lg shadow-xl shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto cursor-pointer animate-pulse"
            >
              <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Buka Pesan Spesial Terakhir 💌✨</span>
            </button>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              {/* Unfolded Stationery Letter */}
              <div className="relative bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-2xl border-2 border-pink-300 shadow-2xl text-left">
                {/* Washi Tape */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-6 bg-pink-200/90 border-dashed border-x border-pink-300 shadow-sm -rotate-1"></div>

                {/* Wax Seal Stamp */}
                <div className="flex items-center justify-between border-b border-pink-200 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center font-script text-xl font-bold shadow-md">
                      KF
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-pink-800 uppercase tracking-wider">
                        Surat Cinta Untuk Keisya Felita
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        27 September 2009 — Sweet Seventeen 🎂
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
                    <GraduationCap className="w-4 h-4 text-amber-600" />
                    <span>Target UI! 🎓</span>
                  </div>
                </div>

                {/* Exact Message Box Text */}
                <div className="bg-pink-50/60 p-5 md:p-6 rounded-xl border border-pink-200/80 mb-6">
                  <p className="whitespace-pre-line text-sm md:text-base text-neutral-800 font-medium leading-relaxed font-poppins">
                    {exactMessage}
                  </p>
                </div>

                {/* Special Universitas Indonesia Cheer Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200 border-2 border-amber-300 flex items-center gap-3 text-amber-950 text-xs md:text-sm font-semibold">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 text-amber-950 flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0">
                    UI
                  </div>
                  <div>
                    <span className="block font-bold text-amber-900">
                      Misi Penting: Calon Mahasiswa Baru Universitas Indonesia! 🎓🔥
                    </span>
                    <span className="text-[11px] text-amber-800 font-normal">
                      We believe in you, Kei! Semangat terus belajarnya ya, masa depan cerah menunggumu!
                    </span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-pink-100">
                  <button
                    onClick={triggerGrandConfetti}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <PartyPopper className="w-4 h-4" />
                    <span>Tembak Confetti Lagi! 🎊</span>
                  </button>

                  <button
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Tersalin ke Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                        <span>Salin Pesan Manis Ini</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
