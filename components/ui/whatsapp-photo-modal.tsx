'use client';

import { useEffect } from 'react';
import { X, GraduationCap, ShieldCheck } from 'lucide-react';

export interface PhotoModalData {
  name: string;
  admissionNo?: string;
  className?: string;
  photoUrl?: string;
  fatherName?: string;
  studentId?: string;
}

interface WhatsAppPhotoModalProps {
  data: PhotoModalData | null;
  onClose: () => void;
}

export function WhatsAppPhotoModal({ data, onClose }: WhatsAppPhotoModalProps) {
  useEffect(() => {
    if (!data) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [data, onClose]);

  if (!data) return null;

  const photoSrc =
    data.photoUrl ||
    (data.admissionNo ? `/students/${data.admissionNo.trim()}.jpg` : null);

  const initials = data.name
    .split(' ')
    .map(p => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'ST';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${data.name} profile photo`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Centered WhatsApp-style Card */}
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-[340px] sm:max-w-[380px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200 flex flex-col"
      >
        {/* Top Floating Header (WhatsApp Style: Name & Class overlaid) */}
        <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between p-3.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white">
          <div className="min-w-0 pr-2">
            <h3 className="font-bold text-sm sm:text-base leading-tight truncate drop-shadow-md">
              {data.name}
            </h3>
            <p className="text-[11px] text-slate-300 drop-shadow flex items-center gap-1.5 mt-0.5">
              {data.className && <span>Class {data.className}</span>}
              {data.admissionNo && <span>· Adm #{data.admissionNo}</span>}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-all flex-shrink-0"
            aria-label="Close photo preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Square / Portrait Photo Frame (WhatsApp Style) */}
        <div className="relative w-full aspect-square bg-slate-950 flex items-center justify-center overflow-hidden">
          {photoSrc ? (
            <img
              src={photoSrc}
              alt={data.name}
              className="w-full h-full object-cover select-none"
              onError={e => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-900 via-slate-900 to-indigo-950 text-white">
              <div className="w-24 h-24 rounded-full bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-3xl font-extrabold text-indigo-200">
                {initials}
              </div>
              <p className="text-xs text-slate-400 mt-3">Photo archive entry</p>
            </div>
          )}

          {/* Academy watermark badge bottom-left */}
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 text-[10px] font-medium">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Official Academy Record</span>
          </div>
        </div>

        {/* WhatsApp-style Bottom Action Bar */}
        <div className="flex items-center justify-around py-3 px-2 bg-slate-900 border-t border-white/10 text-xs text-slate-300">
          {data.admissionNo && (
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Admission No
              </span>
              <span className="font-mono font-bold text-white text-sm">
                #{data.admissionNo}
              </span>
            </div>
          )}

          {data.className && (
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Class
              </span>
              <span className="font-bold text-indigo-300 text-sm">
                {data.className}
              </span>
            </div>
          )}

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
