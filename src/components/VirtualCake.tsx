import { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, PartyPopper, Mic, MicOff, Wind } from 'lucide-react';
import { sfx } from '../utils/audio';

export function VirtualCake() {
  const [isBlown, setIsBlown] = useState(false);
  const [blowCount, setBlowCount] = useState(0);
  const [isMicActive, setIsMicActive] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isBlownRef = useRef(false);

  isBlownRef.current = isBlown;

  const fireConfetti = () => {
    // Left burst
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 60,
      origin: { x: 0.2, y: 0.6 },
      colors: ['#EC4899', '#F43F5E', '#FBBF24', '#F472B6', '#FFFFFF'],
    });
    // Right burst
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 60,
      origin: { x: 0.8, y: 0.6 },
      colors: ['#EC4899', '#F43F5E', '#FBBF24', '#F472B6', '#FFFFFF'],
    });
    // Center stars
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      shapes: ['star', 'circle'],
      colors: ['#F59E0B', '#FDE047', '#EC4899'],
    });
  };

  const handleBlowCandles = useCallback(() => {
    if (!isBlownRef.current) {
      sfx.playBlow();
      setIsBlown(true);
      isBlownRef.current = true;
      setBlowCount((prev) => prev + 1);

      setTimeout(() => {
        sfx.playFanfare();
        fireConfetti();
      }, 250);
    } else {
      // Re-trigger confetti if blown or clicked again
      sfx.playPop();
      fireConfetti();
    }
  }, []);

  const handleRelight = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playPop();
    setIsBlown(false);
    isBlownRef.current = false;
  };

  // Stop microphone stream and context
  const stopMicrophone = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsMicActive(false);
    setMicVolume(0);
  }, []);

  // Start microphone blow detection
  const startMicrophone = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMicError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicError('Browser ini tidak mendukung akses mikrofon. Anda tetap bisa meniup dengan klik kuenya!');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      mediaStreamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.2;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsMicActive(true);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let blowConsecutiveFrames = 0;

      const detectBlow = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteTimeDomainData(dataArray);

        // Compute RMS volume
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const val = (dataArray[i] - 128) / 128;
          sum += val * val;
        }
        const rms = Math.sqrt(sum / dataArray.length);
        const volumePercent = Math.min(100, Math.round(rms * 250));
        setMicVolume(volumePercent);

        // Blow detection threshold: when blowing closely into the mic, volume exceeds 30-40%
        if (rms > 0.20) {
          blowConsecutiveFrames++;
          if (blowConsecutiveFrames >= 3 && !isBlownRef.current) {
            handleBlowCandles();
            blowConsecutiveFrames = 0;
          }
        } else {
          blowConsecutiveFrames = Math.max(0, blowConsecutiveFrames - 1);
        }

        animationFrameRef.current = requestAnimationFrame(detectBlow);
      };

      detectBlow();
    } catch (err) {
      console.warn('Microphone access error:', err);
      setIsMicActive(false);
      setMicError('Izin mikrofon belum diberikan. Silakan izinkan akses mikrofon di browser, atau cukup klik kuenya! 🎂');
    }
  };

  const toggleMic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMicActive) {
      stopMicrophone();
    } else {
      startMicrophone(e);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, [stopMicrophone]);

  return (
    <section id="kue-ulang-tahun" className="py-12 md:py-16 px-4 max-w-4xl mx-auto text-center">
      {/* Section Header */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold tracking-wide border border-pink-200">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          Tiup Lilin Ulang Tahun
        </span>
        <h2 className="font-script text-4xl md:text-5xl font-bold text-pink-600 mt-2">
          Make a 17th Birthday Wish!
        </h2>
        <p className="text-sm md:text-base text-neutral-600 max-w-md mx-auto mt-2">
          {isBlown
            ? 'Yaaay! Lilin berhasil ditiup! Semoga semua doa indah Kei dikabulkan Tuhan! 🌟'
            : 'Pejamkan mata, ucapkan doa terindahmu di dalam hati, lalu tiup ke mikrofon HP/laptopmu atau klik kuenya! 🎂✨'}
        </p>
      </div>

      {/* Microphone Control Bar */}
      <div className="max-w-sm mx-auto mb-5 bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border-2 border-pink-200 shadow-sm flex flex-col items-center gap-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-left">
            <div className={`p-2 rounded-xl transition-colors ${isMicActive ? 'bg-pink-500 text-white animate-pulse' : 'bg-pink-100 text-pink-700'}`}>
              {isMicActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                <span>Mode Tiup Mikrofon</span>
                {isMicActive && <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>}
              </div>
              <div className="text-[11px] text-neutral-500">
                {isMicActive ? 'Tiup langsung ke lubang mikrofon HP/laptop! 💨' : 'Aktifkan agar bisa ditiup langsung'}
              </div>
            </div>
          </div>

          <button
            onClick={toggleMic}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
              isMicActive
                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 active:scale-95'
            }`}
          >
            {isMicActive ? 'Matikan Mic' : 'Aktifkan Mic 🎤'}
          </button>
        </div>

        {/* Live Mic Breath Meter */}
        {isMicActive && (
          <div className="w-full pt-1.5 border-t border-pink-100">
            <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-1">
              <span className="flex items-center gap-1">
                <Wind className="w-3 h-3 text-pink-500" />
                Sensor Hembusan Nafas
              </span>
              <span className="font-semibold text-pink-600">{micVolume}%</span>
            </div>
            <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-75 rounded-full ${
                  micVolume > 50 ? 'bg-gradient-to-r from-yellow-400 to-emerald-500' : 'bg-pink-500'
                }`}
                style={{ width: `${micVolume}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Mic Error Message */}
        {micError && (
          <div className="text-[11px] text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-200 w-full text-left">
            {micError}
          </div>
        )}
      </div>

      {/* Interactive Cake Container */}
      <div
        onClick={handleBlowCandles}
        className="relative mx-auto max-w-sm p-8 bg-gradient-to-b from-white/90 to-pink-50/80 rounded-3xl border-2 border-pink-200 shadow-xl shadow-pink-200/50 cursor-pointer group hover:border-pink-300 transition-all duration-300 select-none"
      >
        {/* Click Me Badge */}
        <div
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold shadow-md transition-all ${
            isBlown
              ? 'bg-emerald-500 text-white animate-pulse'
              : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white animate-bounce'
          }`}
        >
          {isBlown
            ? '🎉 Doa Terkirim ke Langit! 💖'
            : isMicActive
            ? '💨 Tiup ke Mikrofon atau Klik Kuenya!'
            : '👉 Klik Kuenya atau Tiup Lilin! 💨'}
        </div>

        {/* Candles Area */}
        <div className="flex justify-center items-end gap-6 h-28 mb-1 relative">
          {/* Candle #1 */}
          <div className="flex flex-col items-center">
            {/* Flame or Smoke */}
            <div className="h-10 flex items-center justify-center">
              {!isBlown ? (
                <div
                  className="relative animate-flame"
                  style={{
                    transform: isMicActive && micVolume > 15 ? `scale(${1 + micVolume / 100}) skewX(${(micVolume % 10) - 5}deg)` : undefined,
                  }}
                >
                  <div className="w-5 h-8 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full blur-[0.5px]"></div>
                  <div className="absolute inset-x-1.5 bottom-0 h-4 bg-yellow-100 rounded-full"></div>
                  <div className="absolute inset-0 bg-amber-400/40 rounded-full blur-md animate-pulse"></div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-xl animate-bounce">💨</span>
                  <span className="text-[10px] text-neutral-400">puff!</span>
                </div>
              )}
            </div>
            {/* Candle Body '1' */}
            <div className="w-8 h-16 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 rounded-t-md shadow-inner border border-pink-300 flex items-center justify-center">
              <span className="font-bold text-pink-600 text-lg">1</span>
            </div>
          </div>

          {/* Candle #7 */}
          <div className="flex flex-col items-center">
            {/* Flame or Smoke */}
            <div className="h-10 flex items-center justify-center">
              {!isBlown ? (
                <div
                  className="relative animate-flame"
                  style={{
                    animationDelay: '0.15s',
                    transform: isMicActive && micVolume > 15 ? `scale(${1 + micVolume / 100}) skewX(${5 - (micVolume % 10)}deg)` : undefined,
                  }}
                >
                  <div className="w-5 h-8 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full blur-[0.5px]"></div>
                  <div className="absolute inset-x-1.5 bottom-0 h-4 bg-yellow-100 rounded-full"></div>
                  <div className="absolute inset-0 bg-amber-400/40 rounded-full blur-md animate-pulse"></div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-xl animate-bounce" style={{ animationDelay: '0.1s' }}>💨</span>
                  <span className="text-[10px] text-neutral-400">puff!</span>
                </div>
              )}
            </div>
            {/* Candle Body '7' */}
            <div className="w-8 h-16 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 rounded-t-md shadow-inner border border-pink-300 flex items-center justify-center">
              <span className="font-bold text-pink-600 text-lg">7</span>
            </div>
          </div>
        </div>

        {/* Cake Tier 1 (Top Tier) */}
        <div className="relative mx-auto w-44 h-14 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 rounded-t-2xl border-2 border-pink-300 shadow-sm flex items-center justify-center overflow-hidden">
          {/* Scalloped Frosting */}
          <div className="absolute top-0 inset-x-0 flex justify-between px-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="text-xs text-rose-300">🍓</span>
            ))}
          </div>
          <span className="font-script text-xl font-bold text-pink-700 tracking-wide mt-2">
            Keisya 17th
          </span>
        </div>

        {/* Cake Tier 2 (Bottom Tier) */}
        <div className="relative mx-auto w-64 h-18 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200 rounded-t-2xl border-2 border-pink-300 shadow-md flex items-center justify-center overflow-hidden">
          {/* Frosting drips */}
          <div className="absolute top-0 inset-x-0 h-3 bg-pink-100/90 rounded-b-xl border-b border-pink-200"></div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm">🌸</span>
            <span className="text-xs font-semibold text-rose-800 tracking-widest uppercase">
              Sweet &amp; Loved
            </span>
            <span className="text-sm">🌸</span>
          </div>
        </div>

        {/* Cake Platter */}
        <div className="mx-auto w-72 h-4 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 rounded-full shadow-lg border border-amber-300"></div>

        {/* Interactive Text & Status */}
        <div className="mt-6 pt-4 border-t border-pink-100">
          {isBlown ? (
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-pink-700 font-bold text-sm bg-pink-100/80 px-4 py-1.5 rounded-full">
                <PartyPopper className="w-4 h-4 text-pink-600" />
                <span>Lilin Berhasil Ditiup! {blowCount > 1 && `(${blowCount}x)`}</span>
              </div>
              <p className="text-xs text-neutral-600 font-medium">
                &ldquo;Semoga Keisya Felita panjang umur, sehat selalu, makin berprestasi, dan keterima di PTN impian Universitas Indonesia! Amin!&rdquo; 💖🎓
              </p>
              <button
                onClick={handleRelight}
                className="inline-flex items-center gap-2 text-xs font-semibold text-pink-700 hover:text-pink-900 bg-white hover:bg-pink-50 border border-pink-300 px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nyalakan Lilin Lagi 🕯️</span>
              </button>
            </div>
          ) : (
            <p className="text-xs text-neutral-500 italic">
              {isMicActive
                ? 'Hembuskan nafas / tiup kuat ke mikrofon HP atau laptop Anda! 💨'
                : 'Klik tombol "Aktifkan Mic 🎤" di atas untuk meniup dengan nafas, atau klik langsung kuenya!'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
