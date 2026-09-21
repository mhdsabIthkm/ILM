'use client';
import Link from 'next/link';
import { allMeetings } from '@/lib/mock-data/meetings';
import { classYears } from '@/lib/mock-data/cohorts';
import { formatDate } from '@/lib/utils';
const classMap = Object.fromEntries(classYears.map(cy => [cy.id, cy.displayName]));
const myMeetings = allMeetings.filter(m => ['cy-vahda-2627','cy-suffa-2627'].includes(m.classYearId));
export default function TeacherReportsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Reports</h1>
      {myMeetings.map(m => (
        <div key={m.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900">{classMap[m.classYearId]} · Meeting #{m.meetingNumber}</p>
            <p className="text-xs text-slate-400">{formatDate(m.date)}</p>
          </div>
          <Link href={`/admin/meetings/${m.id}/final-report`} className="text-xs text-indigo-600 hover:underline flex-shrink-0">View Report →</Link>
        </div>
      ))}
    </div>
  );
}
