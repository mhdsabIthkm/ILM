'use client';
import Link from 'next/link';
import { vahdaMeeting1 } from '@/lib/mock-data/meetings';
import { formatDate } from '@/lib/utils';
import { Calendar } from 'lucide-react';
export default function ParentMeetingsPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-slate-900">ILM Meetings</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-start gap-3">
        <Calendar className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900">VAHDA · Meeting #01</p>
          <p className="text-sm text-slate-600 truncate">{vahdaMeeting1.theme.english}</p>
          <p className="text-xs text-slate-400">{formatDate(vahdaMeeting1.date)}</p>
          <p className="text-xs text-green-600 mt-0.5">Nafih — Prepared Speaker · Present</p>
        </div>
        <Link href="/admin/meetings/meeting-vahda-01/final-report" className="text-xs text-indigo-600 hover:underline flex-shrink-0">Full Report →</Link>
      </div>
    </div>
  );
}
