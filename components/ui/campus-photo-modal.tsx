'use client';

import { useEffect } from 'react';
import { X, Building, ShieldCheck, MapPin } from 'lucide-react';

interface CampusPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CampusPhotoModal({ isOpen, onClose }: CampusPhotoModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Malik Deenar Islamic Academy Campus Photo"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/15 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-slate-900/90 text-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Malik Deenar Islamic Academy
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                Main Academy Courtyard &amp; Campus · Thalangara, Kasaragod
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close campus preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Campus Image View */}
        <div className="relative flex-1 overflow-auto bg-black flex items-center justify-center min-h-[300px] sm:min-h-[440px]">
          <img
            src="/campus.jpg"
            alt="Malik Deenar Islamic Academy Courtyard"
            className="w-full h-auto max-h-[72vh] object-contain select-none"
          />
        </div>

        {/* Bottom Details Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-900/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">Official Academy Campus Archive · ILM Leadership Program</span>
          </div>
          <span className="text-[11px] text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            Estd. 1973 · Kasaragod, Kerala
          </span>
        </div>
      </div>
    </div>
  );
}
