'use client';
import { vahdaMeeting1Awards } from '@/lib/mock-data/meetings';
import { getAwardTypeLabel } from '@/lib/utils';
import { Award } from 'lucide-react';
const myAwards = vahdaMeeting1Awards.filter(a => a.studentId === 'vahda-nafih');
export default function ParentAwardsPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Awards</h1>
      {myAwards.map(aw => (
        <div key={aw.id} className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <Award className="w-6 h-6 text-yellow-500" />
          <div><p className="font-semibold text-slate-900">{getAwardTypeLabel(aw.type)}</p><p className="text-xs text-slate-500">Meeting #01 · 18 Sep 2026</p></div>
        </div>
      ))}
      {myAwards.length === 0 && <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-slate-400">No awards yet.</div>}
    </div>
  );
}
