'use client';
import Link from 'next/link';
import { allMeetings } from '@/lib/mock-data/meetings';
import { classYears } from '@/lib/mock-data/cohorts';
import { StatusBadge } from '@/components/ui/status-badge';
import { formatDate, getMeetingStatusLabel } from '@/lib/utils';
const myMeetings = allMeetings.filter(m => ['cy-vahda-2627','cy-suffa-2627'].includes(m.classYearId));
const classMap = Object.fromEntries(classYears.map(cy => [cy.id, cy.displayName]));
export default function TeacherMeetingsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Meetings</h1>
      {myMeetings.map(m => (
        <div key={m.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all p-4 sm:p-5 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900">{classMap[m.classYearId]} · Meeting #{m.meetingNumber}</p>
            <p className="text-sm text-slate-600 truncate">{m.theme.english}</p>
            <p className="text-xs text-slate-400">{formatDate(m.date)}</p>
          </div>
          <StatusBadge status={m.status} label={getMeetingStatusLabel(m.status)} />
          <Link href={`/admin/meetings/${m.id}`} className="text-xs text-indigo-600 hover:underline flex-shrink-0">View →</Link>
        </div>
      ))}
    </div>
  );
}
