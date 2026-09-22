'use client';
import Link from 'next/link';
import { allMeetings } from '@/lib/mock-data/meetings';
import { classYears } from '@/lib/mock-data/cohorts';
import { StatusBadge } from '@/components/ui/status-badge';
import { formatDate, getMeetingStatusLabel } from '@/lib/utils';
import { FileText } from 'lucide-react';

const classMap = Object.fromEntries(classYears.map(cy => [cy.id, cy.displayName]));

export default function MeetingReportsPage() {
  const approvedMeetings = allMeetings.filter(m => ['approved','locked'].includes(m.status));
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Meeting Reports</h1>
        <p className="text-sm text-slate-500 mt-0.5">Approved and finalized meeting reports</p>
      </div>
      <div className="space-y-3">
        {allMeetings.map(m => (
          <div key={m.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all p-4 sm:p-5 flex items-center gap-4">
            <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900">{classMap[m.classYearId]} · Meeting #{m.meetingNumber}</p>
              <p className="text-xs text-slate-500">{formatDate(m.date)} · {m.theme.english}</p>
            </div>
            <StatusBadge status={m.status} label={getMeetingStatusLabel(m.status)} />
            <Link href={`/admin/meetings/${m.id}/final-report`} className="text-xs text-indigo-600 hover:underline flex-shrink-0">View Report →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
