import { useState } from 'react';
import { Cake, Sparkles, Heart, FileCode, GraduationCap, Calendar } from 'lucide-react';
import { Preloader } from './components/Preloader';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { VirtualCake } from './components/VirtualCake';
import { PolaroidGallery } from './components/PolaroidGallery';
import { FinalReveal } from './components/FinalReveal';
import { SingleHtmlModal } from './components/SingleHtmlModal';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-neutral-800 relative selection:bg-pink-300 selection:text-pink-900">
      {/* 1. PRELOADER OPENING SCREEN */}
      {!isUnlocked && (
        <Preloader
          onOpen={() => {
            setIsUnlocked(true);
          }}
        />
      )}

      {/* 2. TOP BAR (Following Top Bar Contract: Brand - Nav Links - 1 Action) */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-pink-200/70 px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="font-script text-2xl md:text-3xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
          Keisya&apos;s 17th 🌸
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs md:text-sm font-medium text-neutral-600">
          <a href="#kue-ulang-tahun" className="hover:text-pink-600 transition-colors">
            Kue Ultah
          </a>
          <a href="#galeri-kenangan" className="hover:text-pink-600 transition-colors">
            Galeri Kenangan
          </a>
          <a href="#pesan-spesial" className="hover:text-pink-600 transition-colors">
            Pesan Spesial
          </a>
        </nav>

        {/* Zone 3: Primary action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHtmlModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 font-medium text-xs border border-pink-200 shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Kode HTML 1-File</span>
          </button>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative pt-10 pb-6 px-4 max-w-4xl mx-auto text-center overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-pink-200/50 to-rose-100/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Milestone Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold tracking-wide border border-pink-200/80 shadow-sm mb-4">
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Sweet Seventeen Birthday Celebration</span>
          <span aria-hidden="true">·</span>
          <span>27 September 2009</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="font-script text-5xl sm:text-6xl md:text-7xl font-bold text-pink-600 tracking-tight leading-tight mb-4 drop-shadow-sm">
          Happy Sweet 17th, Keisya Felita! 🎉
        </h1>

        <p className="text-neutral-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
          Selamat menyambut usia 17 tahun yang istimewa! Babak baru yang penuh warna, cerita indah, dan pintu masa depan yang terbuka lebar menantimu.
        </p>

        {/* Quick Highlights Row (3 focused milestones) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-xl mx-auto text-left">
          <div className="p-3.5 bg-white/85 backdrop-blur-sm rounded-2xl border border-pink-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-pink-600 font-semibold mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Tanggal Lahir</span>
            </div>
            <p className="text-sm font-bold text-neutral-800">27 September 2009</p>
          </div>

          <div className="p-3.5 bg-white/85 backdrop-blur-sm rounded-2xl border border-pink-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold mb-1">
              <Cake className="w-3.5 h-3.5" />
              <span>Usia Baru</span>
            </div>
            <p className="text-sm font-bold text-neutral-800">17 Tahun (KTP!)</p>
          </div>

          <div className="p-3.5 bg-white/85 backdrop-blur-sm rounded-2xl border border-pink-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-yellow-700 font-semibold mb-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Target Impian</span>
            </div>
            <p className="text-sm font-bold text-neutral-800">Universitas Indonesia</p>
          </div>
        </div>
      </section>

      {/* 4. VIRTUAL INTERACTIVE BIRTHDAY CAKE */}
      <VirtualCake />

      {/* 5. SCRAPBOOK POLAROID GALLERY */}
      <PolaroidGallery />

      {/* 6. FINAL REVEAL & SPECIAL MESSAGE */}
      <FinalReveal />

      {/* 7. FLOATING MUSIC PLAYER (OMI - Cheerleader) */}
      <FloatingMusicPlayer autoStart={isUnlocked} />

      {/* 8. MODAL FOR STANDALONE 1-FILE HTML */}
      <SingleHtmlModal
        isOpen={isHtmlModalOpen}
        onClose={() => setIsHtmlModalOpen(false)}
      />

      {/* 10. FOOTER */}
      <footer className="mt-16 py-8 border-t border-pink-200/60 bg-white/50 text-center text-xs text-neutral-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-script text-xl font-bold text-pink-600">Keisya Felita</span>
            <span>·</span>
            <span>Sweet Seventeen 2026</span>
          </div>

          <div className="flex items-center gap-1 text-pink-600 font-medium">
            <span>Dibuat dengan cinta</span>
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>untuk hari spesial Kei</span>
          </div>

          <button
            onClick={() => setIsHtmlModalOpen(true)}
            className="hover:text-pink-600 underline cursor-pointer"
          >
            Lihat Kode HTML 1-File
          </button>
        </div>
      </footer>
    </div>
  );
}
