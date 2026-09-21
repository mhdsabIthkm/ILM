'use client';
import { vahdaMeeting1Media } from '@/lib/mock-data/meetings';
import { Camera, Upload } from 'lucide-react';

export default function GalleryPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Gallery</h1>
          <p className="text-sm text-slate-500 mt-0.5">All ILM meeting photos — Academic Year 2026–27</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Upload className="w-4 h-4" /> Upload Photos
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">VAHDA · Meeting #01 · 18 Sep 2026</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {vahdaMeeting1Media.map(m => (
            <div key={m.id} className="aspect-video bg-slate-100 rounded-lg border border-gray-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-200 transition-colors">
              <Camera className="w-5 h-5 text-slate-300" />
              <p className="text-[10px] text-slate-400 text-center px-1">{m.caption}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-8 text-center text-slate-400 text-sm">
        Photos from other classes will appear here.
      </div>
    </div>
  );
}
