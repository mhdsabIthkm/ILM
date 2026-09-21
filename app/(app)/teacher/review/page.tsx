'use client';
import Link from 'next/link';
import { allMeetings } from '@/lib/mock-data/meetings';
import { classYears } from '@/lib/mock-data/cohorts';
import { StatusBadge } from '@/components/ui/status-badge';
import { getMeetingStatusLabel } from '@/lib/utils';
const classMap = Object.fromEntries(classYears.map(cy => [cy.id, cy.displayName]));
const forReview = allMeetings.filter(m => m.status === 'teacher_review' && ['cy-vahda-2627','cy-suffa-2627'].includes(m.classYearId));
export default function TeacherReviewPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Reports Awaiting Review</h1>
      {forReview.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-slate-400">
          No reports currently awaiting your review. 🎉
        </div>
      ) : forReview.map(m => (
        <div key={m.id} className="bg-white rounded-lg border border-amber-200 p-4 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900">{classMap[m.classYearId]} · Meeting #{m.meetingNumber}</p>
            <p className="text-sm text-slate-600 truncate">{m.theme.english}</p>
          </div>
          <StatusBadge status={m.status} label={getMeetingStatusLabel(m.status)} />
          <div className="flex gap-2">
            <Link href={`/admin/meetings/${m.id}/final-report`} className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 text-slate-700 hover:bg-slate-50">Preview</Link>
            <Link href={`/admin/meetings/${m.id}`} className="text-xs bg-indigo-600 text-white rounded-lg px-2.5 py-1.5 hover:bg-indigo-700">Approve →</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
