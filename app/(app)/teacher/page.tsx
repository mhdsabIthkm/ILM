'use client';

import Link from 'next/link';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { allMeetings } from '@/lib/mock-data/meetings';
import { classYears } from '@/lib/mock-data/cohorts';
import { formatDate, getMeetingStatusLabel } from '@/lib/utils';
import { BookOpen, Calendar, ClipboardCheck, AlertCircle, School } from 'lucide-react';

const myClassIds = ['cy-vahda-2627', 'cy-suffa-2627'];
const myClasses = classYears.filter(cy => myClassIds.includes(cy.id));
const myMeetings = allMeetings.filter(m => myClassIds.includes(m.classYearId));
const forReview = myMeetings.filter(m => m.status === 'teacher_review');
const classMap = Object.fromEntries(classYears.map(cy => [cy.id, cy.displayName]));

export default function TeacherDashboard() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Good morning, Ustadh Ibrahim</h1>
        <p className="text-sm text-slate-500 mt-0.5">Academic Year 2026–27 · 18 September 2026</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="My Classes" value={2} icon={School} />
        <StatCard title="Students" value={70} description="VAHDA + SUFFA" icon={BookOpen} />
        <StatCard title="Meetings This Month" value={2} icon={Calendar} />
        <StatCard title="Awaiting Review" value={forReview.length} icon={ClipboardCheck} accent={forReview.length > 0} />
      </div>

      {/* Reports awaiting review */}
      {forReview.length > 0 && (
        <div className="bg-white rounded-lg border border-amber-200 shadow-sm">
          <div className="px-5 py-4 border-b border-amber-100 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-semibold text-slate-900">Reports Awaiting My Review</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {forReview.map(m => (
              <div key={m.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{classMap[m.classYearId]} · Meeting #{m.meetingNumber}</p>
                  <p className="text-xs text-slate-500">{formatDate(m.date)} · {m.theme.english}</p>
                </div>
                <StatusBadge status={m.status} label={getMeetingStatusLabel(m.status)} />
                <div className="flex gap-2 flex-shrink-0">
                  <Link href={`/admin/meetings/${m.id}/final-report`} className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 text-slate-600 hover:bg-slate-50">Preview</Link>
                  <Link href={`/admin/meetings/${m.id}`} className="text-xs bg-indigo-600 text-white rounded-lg px-2.5 py-1.5 hover:bg-indigo-700">Review →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My classes */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-slate-900">My Classes</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {myClasses.map(cy => (
            <div key={cy.id} className="flex items-center gap-4 px-5 py-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-base text-indigo-700">
                {cy.displayName.slice(0, 2)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{cy.displayName}</p>
                <p className="text-xs text-slate-500">35 students · Level {cy.level}</p>
              </div>
              <Link href={`/admin/classes/${cy.id}`} className="text-xs text-indigo-600 hover:underline">View Class →</Link>
            </div>
          ))}
        </div>
      </div>

      {/* All my meetings */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-slate-900">All Meetings</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {myMeetings.map(m => (
            <div key={m.id} className="flex items-center gap-4 px-5 py-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900">{classMap[m.classYearId]} · Meeting #{m.meetingNumber}</p>
                <p className="text-xs text-slate-500 truncate">{m.theme.english}</p>
              </div>
              <StatusBadge status={m.status} label={getMeetingStatusLabel(m.status)} />
              <Link href={`/admin/meetings/${m.id}`} className="text-xs text-indigo-600 hover:underline flex-shrink-0">View →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
