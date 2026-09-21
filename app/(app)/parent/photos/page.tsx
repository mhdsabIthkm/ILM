'use client';
import { vahdaMeeting1Media } from '@/lib/mock-data/meetings';
import { Camera } from 'lucide-react';
export default function ParentPhotosPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Photos</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-sm font-semibold text-slate-700 mb-3">VAHDA · Meeting #01</p>
        <div className="grid grid-cols-3 gap-3">
          {vahdaMeeting1Media.map(m => (
            <div key={m.id} className="aspect-video bg-slate-100 rounded-lg flex flex-col items-center justify-center gap-1 border border-gray-200">
              <Camera className="w-5 h-5 text-slate-300" />
              <p className="text-[10px] text-slate-400 text-center px-1">{m.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
