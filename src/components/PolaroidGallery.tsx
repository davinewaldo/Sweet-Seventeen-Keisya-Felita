import { useState, useRef, useEffect } from 'react';
import { Camera, Sparkles, X, Heart, Upload, ZoomIn, FolderUp, RotateCcw, Info, CheckCircle2, Loader2 } from 'lucide-react';
import { generatePhotoFallbackSvg } from '../utils/polaroidSvgs';
import { sfx } from '../utils/audio';
import { compressImage, persistPhoto, loadPersistedPhotos } from '../utils/photoStorage';

export interface PhotoItem {
  id: number;
  file: string;
  caption: string;
  theme: string;
  subtitle: string;
  rotation: string;
  tapeColor: string;
  sticker: string;
  note: string;
}

const initialPhotos: PhotoItem[] = [
  {
    id: 1,
    file: 'IMG_0129.jpg',
    caption: '#1 First Date',
    theme: 'adventure',
    subtitle: 'Momen First Date',
    rotation: '-rotate-3 md:-rotate-3',
    tapeColor: 'bg-rose-200/80 border-rose-300/60',
    sticker: '🌸✨',
    note: 'Momen petualangan yang tak terlupakan bareng keii, seru dan asik poll!',
  },
  {
    id: 2,
    file: 'IMG_0257.JPG.jpg',
    caption: '#2 Second Date',
    theme: 'scooter',
    subtitle: 'Jalan Santai Sore Hari',
    rotation: 'rotate-2 md:rotate-2',
    tapeColor: 'bg-amber-200/80 border-amber-300/60',
    sticker: '🛵💨',
    note: 'Keliling santai, nyoree, nonton dan ngomong" random yang bikin kangen.',
  },
  {
    id: 3,
    file: 'IMG_0258.JPG.jpg',
    caption: '#3 On The Road',
    theme: 'road',
    subtitle: 'Di Perjalanan Bersama',
    rotation: '-rotate-2 md:-rotate-2',
    tapeColor: 'bg-pink-200/80 border-pink-300/60',
    sticker: '🛣️🌅',
    note: 'ada 2 pacar ku di frame ini ehh sorry blunderrr.',
  },
  {
    id: 4,
    file: 'IMG_0352.jpg',
    caption: '#4 Sweet Smile',
    theme: 'smile',
    subtitle: 'Senyuman Termurni Keisya',
    rotation: 'rotate-3 md:rotate-3',
    tapeColor: 'bg-fuchsia-200/80 border-fuchsia-300/60',
    sticker: '🌸💖',
    note: 'papi kepo sapa si keisya inii lo pii.',
  },
  {
    id: 5,
    file: 'IMG_0640 (1).jpg',
    caption: '#5 Gemesin Banget!',
    theme: 'cute',
    subtitle: 'Pose Jail & Tingkah Lucu',
    rotation: '-rotate-3 md:-rotate-2',
    tapeColor: 'bg-pink-300/70 border-pink-400/60',
    sticker: '🎀🧸',
    note: 'Si paling ekspresif dan selalu sukses bikin ketawa dengan tingkah gemasnya.',
  },
  {
    id: 6,
    file: 'IMG_0647.jpg',
    caption: '#6 Mirror Selfie',
    theme: 'mirror',
    subtitle: 'OOTD & Mirror Selfie Cantik',
    rotation: 'rotate-2 md:rotate-3',
    tapeColor: 'bg-purple-200/80 border-purple-300/60',
    sticker: '🪞📸',
    note: 'Mirror selfie check! ANJAYY.',
  },
  {
    id: 7,
    file: 'IMG_0671.jpg',
    caption: '#7 Si Paling Rajin!',
    theme: 'study',
    subtitle: 'Menuju Jaket Kuning UI!',
    rotation: '-rotate-1 md:-rotate-1',
    tapeColor: 'bg-yellow-200/90 border-yellow-300/70',
    sticker: '📚🎓',
    note: 'Rajin terus sampai masuk UI keii',
  },
];

export function PolaroidGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [showGuide, setShowGuide] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const batchFileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadTarget, setActiveUploadTarget] = useState<string | null>(null);

  // Load saved photos from IndexedDB & Server on mount
  useEffect(() => {
    let isMounted = true;
    loadPersistedPhotos().then((loaded) => {
      if (isMounted && Object.keys(loaded).length > 0) {
        setCustomImages(loaded);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePhotoClick = (photo: PhotoItem) => {
    sfx.playPop();
    setSelectedPhoto(photo);
  };

  const handleSingleUploadClick = (fileKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveUploadTarget(fileKey);
    fileInputRef.current?.click();
  };

  const handleSingleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadTarget) {
      setIsProcessing(true);
      setStatusMessage('Menyimpan foto secara permanen... ✨');
      try {
        const compressed = await compressImage(file);
        const updated = {
          ...customImages,
          [activeUploadTarget]: compressed,
        };
        setCustomImages(updated);
        await persistPhoto(activeUploadTarget, compressed);
        sfx.playFanfare();
        setStatusMessage('Foto berhasil disimpan permanen! 💖');
        setTimeout(() => setStatusMessage(null), 3000);
      } catch (err) {
        console.error('Failed to process image:', err);
        setStatusMessage('Gagal memproses foto, silakan coba lagi.');
      } finally {
        setIsProcessing(false);
      }
    }
    e.target.value = '';
  };

  const handleBatchFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setStatusMessage(`Memproses & menyimpan ${files.length} foto... ✨`);

    const fileList = Array.from(files);
    const newMap = { ...customImages };

    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        // Match by filename or sequence
        const matchedPhoto = initialPhotos.find(
          (p) => p.file.toLowerCase() === file.name.toLowerCase()
        );
        const targetSlot = matchedPhoto ? matchedPhoto.file : initialPhotos[i % initialPhotos.length]?.file;

        if (targetSlot) {
          const compressed = await compressImage(file);
          newMap[targetSlot] = compressed;
          await persistPhoto(targetSlot, compressed);
        }
      }

      setCustomImages(newMap);
      sfx.playFanfare();
      setStatusMessage(`${fileList.length} foto berhasil tersimpan permanen! 💖`);
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      console.error('Batch upload error:', err);
      setStatusMessage('Terjadi kendala saat menyimpan foto.');
    } finally {
      setIsProcessing(false);
    }

    e.target.value = '';
  };

  const handleResetPhotos = async () => {
    setCustomImages({});
    try {
      localStorage.removeItem('keisya_custom_photos');
    } catch {
      // Ignore
    }
    sfx.playPop();
  };

  const uploadedCount = Object.keys(customImages).length;

  return (
    <section id="galeri-kenangan" className="py-14 px-4 max-w-6xl mx-auto">
      {/* Hidden File Input for Single Card Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSingleFileChange}
      />

      {/* Hidden File Input for Multiple/Batch Upload */}
      <input
        ref={batchFileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleBatchFileChange}
      />

      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold tracking-wide border border-pink-200 mb-2">
          <Camera className="w-3.5 h-3.5 text-pink-500" />
          <span>Scrapbook Polaroid Memories</span>
        </div>
        <h2 className="font-script text-4xl md:text-5xl font-bold text-pink-600">
          Galeri Kenangan Manis Kei
        </h2>
        <p className="text-sm md:text-base text-neutral-600 mt-2">
          Tujuh cuplikan momen berharga menuju usia Sweet Seventeen. Arahkan kursor atau sentuh fotonya untuk melihat lebih dekat! 💖
        </p>
      </div>

      {/* Interactive Photo Upload Control Bar */}
      <div className="max-w-2xl mx-auto mb-10 bg-white/90 backdrop-blur-sm p-4 md:p-5 rounded-2xl border-2 border-pink-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <h4 className="text-xs md:text-sm font-bold text-pink-800 flex items-center justify-center sm:justify-start gap-1.5">
              <Camera className="w-4 h-4 text-pink-500" />
              <span>Mau Masukkan Foto Asli Kei?</span>
              {uploadedCount > 0 && (
                <span className="text-[11px] bg-pink-100 text-pink-700 font-semibold px-2 py-0.5 rounded-full ml-1">
                  {uploadedCount}/7 foto terpasang
                </span>
              )}
            </h4>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Pilih foto dari galeri HP atau folder laptop, foto akan langsung tampil rapi di polaroid!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => batchFileInputRef.current?.click()}
              disabled={isProcessing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <FolderUp className="w-3.5 h-3.5" />
                  <span>Unggah Foto dari HP / Laptop</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowGuide(!showGuide)}
              className="p-2 text-pink-700 hover:bg-pink-100 rounded-xl transition-colors cursor-pointer"
              title="Petunjuk Unggah Foto"
            >
              <Info className="w-4 h-4" />
            </button>

            {uploadedCount > 0 && (
              <button
                onClick={handleResetPhotos}
                className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                title="Kembalikan ke ilustrasi awal"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Live Status Message */}
        {statusMessage && (
          <div className="mt-3 p-2 bg-pink-50 text-pink-700 text-xs rounded-xl flex items-center justify-center gap-1.5 font-medium border border-pink-200 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Expandable Guide */}
        {showGuide && (
          <div className="mt-4 pt-3 border-t border-pink-100 text-xs text-neutral-600 space-y-2 text-left bg-pink-50/60 p-3 rounded-xl">
            <p className="font-bold text-pink-700">💡 2 Cara Mudah Memasukkan Foto:</p>
            <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
              <li>
                <strong>Cara 1 (Langsung di halaman ini):</strong> Klik tombol pink <em>&ldquo;Unggah Foto dari HP / Laptop&rdquo;</em> lalu pilih 1 atau beberapa foto sekaligus dari perangkatmu, atau klik tombol kamera 📷 pada masing-masing kartu polaroid di bawah.
              </li>
              <li>
                <strong>Cara 2 (Jika memakai file index.html mandiri):</strong> Simpan file <code>index.html</code> di komputermu, lalu letakkan 7 foto dengan nama file: <code>IMG_0129.jpg</code>, <code>IMG_0257.JPG.jpg</code>, <code>IMG_0258.JPG.jpg</code>, <code>IMG_0352.jpg</code>, <code>IMG_0640 (1).jpg</code>, <code>IMG_0647.jpg</code>, dan <code>IMG_0671.jpg</code> di dalam folder yang sama persis.
              </li>
            </ol>
          </div>
        )}
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 pt-2 pb-8">
        {initialPhotos.map((photo) => {
          const imgSrc =
            customImages[photo.file] ||
            `/${photo.file}`;
          const fallbackSrc = generatePhotoFallbackSvg(photo.caption, photo.theme, photo.subtitle);
          const hasCustomPhoto = !!customImages[photo.file];

          return (
            <div
              key={photo.id}
              onClick={() => handlePhotoClick(photo)}
              className={`group relative bg-white p-3.5 pb-6 rounded-md shadow-lg shadow-pink-900/10 border border-neutral-100 transition-all duration-300 cursor-pointer hover:scale-105 hover:rotate-0 hover:shadow-2xl hover:shadow-pink-400/25 hover:z-20 ${photo.rotation}`}
            >
              {/* Scrapbook Washi Tape */}
              <div
                className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 ${photo.tapeColor} border-dashed border-x shadow-sm backdrop-blur-[2px] -rotate-1 group-hover:rotate-0 transition-transform z-10`}
              ></div>

              {/* Photo Area */}
              <div className="relative aspect-[4/5] bg-pink-50 rounded-sm overflow-hidden border border-neutral-200/80 mb-3.5">
                <img
                  src={imgSrc}
                  alt={photo.caption}
                  onError={(e) => {
                    if (e.currentTarget.src !== fallbackSrc) {
                      e.currentTarget.src = fallbackSrc;
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Sticker Badge */}
                <div className="absolute top-2 right-2 text-xl drop-shadow filter">
                  {photo.sticker}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-pink-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                  <span className="bg-white/95 text-pink-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Lihat Kenangan
                  </span>
                  <button
                    onClick={(e) => handleSingleUploadClick(photo.file, e)}
                    className="bg-pink-600/95 hover:bg-pink-700 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3 h-3" />
                    {hasCustomPhoto ? 'Ganti Foto' : 'Pilih Foto Asli'}
                  </button>
                </div>
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="text-center px-1">
                <h3 className="font-script text-2xl font-bold text-neutral-800 leading-tight">
                  {photo.caption}
                </h3>
                <p className="text-xs text-neutral-600 font-medium italic mt-1.5 leading-snug">
                  &ldquo;{photo.note}&rdquo;
                </p>
                <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mt-2 px-1">
                  <span>{photo.file}</span>
                  <button
                    onClick={(e) => handleSingleUploadClick(photo.file, e)}
                    className="p-1 text-pink-500 hover:text-pink-700 hover:bg-pink-50 rounded-md transition-colors cursor-pointer"
                    title={`Pilih foto untuk ${photo.caption}`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl p-6 md:p-8 border-4 border-pink-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrapbook Tape on Modal */}
            <div
              className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 ${selectedPhoto.tapeColor} border-dashed border-x shadow-sm`}
            ></div>

            {/* Image Preview */}
            <div className="relative aspect-[4/5] bg-pink-50 rounded-xl overflow-hidden border-2 border-neutral-200 mt-2 mb-4">
              <img
                src={customImages[selectedPhoto.file] || `/${selectedPhoto.file}`}
                alt={selectedPhoto.caption}
                onError={(e) => {
                  const fallback = generatePhotoFallbackSvg(
                    selectedPhoto.caption,
                    selectedPhoto.theme,
                    selectedPhoto.subtitle
                  );
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 text-2xl drop-shadow">
                {selectedPhoto.sticker}
              </div>
            </div>

            {/* Title & Notes */}
            <div className="text-center">
              <h3 className="font-script text-3xl font-bold text-pink-600">
                {selectedPhoto.caption}
              </h3>
              <p className="text-xs text-neutral-500 font-mono mt-0.5 mb-3">
                File Asli: {selectedPhoto.file}
              </p>
              <p className="text-sm text-neutral-700 bg-pink-50/70 p-3.5 rounded-xl border border-pink-100 font-medium">
                &ldquo;{selectedPhoto.note}&rdquo;
              </p>
            </div>

            {/* Modal Controls */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-100 text-xs">
              <button
                onClick={(e) => handleSingleUploadClick(selectedPhoto.file, e)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold cursor-pointer transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Pilih Foto dari HP/Laptop untuk Kartu Ini</span>
              </button>
              <div className="flex items-center gap-1 text-pink-500 font-medium">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Sweet 17 Memory</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
