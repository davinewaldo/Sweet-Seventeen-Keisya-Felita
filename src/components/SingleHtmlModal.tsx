import { useState } from 'react';
import { Download, Copy, Check, X, FileCode } from 'lucide-react';
import { standaloneSingleHtml } from '../utils/singleHtmlContent';
import { sfx } from '../utils/audio';

interface SingleHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SingleHtmlModal({ isOpen, onClose }: SingleHtmlModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    sfx.playPop();
    navigator.clipboard.writeText(standaloneSingleHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    sfx.playFanfare();
    const blob = new Blob([standaloneSingleHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sweet-seventeen-keisya.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-pink-300 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-pink-100 text-pink-600 rounded-xl">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-800 text-base md:text-lg">
                Kode Lengkap Satu File HTML
              </h3>
              <p className="text-xs text-neutral-500">
                HTML + CSS + JavaScript mandiri (standalone), siap disimpan &amp; dibuka di mana saja!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-pink-50 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code Snippet Box */}
        <div className="flex-1 overflow-hidden my-4 rounded-xl border border-neutral-200 bg-neutral-900 text-neutral-200 p-4 font-mono text-xs overflow-y-auto">
          <pre className="whitespace-pre">
            {standaloneSingleHtml.slice(0, 1400)}...
            {'\n/* [dan seluruh kode lengkapnya] */'}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-pink-100">
          <p className="text-xs text-neutral-500">
            Total {standaloneSingleHtml.length.toLocaleString()} karakter, terintegrasi penuh.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Semua Kode</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh .html</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
