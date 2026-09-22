'use client';

import Link from 'next/link';
import { allMeetings } from '@/lib/mock-data/meetings';
import { classYears } from '@/lib/mock-data/cohorts';
import { StatusBadge } from '@/components/ui/status-badge';
import { formatDate, getMeetingStatusLabel, getSimplifiedMeetingStatus } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import { Calendar, Users, ArrowRight, Eye, GraduationCap } from 'lucide-react';
import { useState } from 'react';

const classMap = Object.fromEntries(classYears.map(cy => [cy.id, cy.displayName]));

export default function StudentMeetingsPage() {
  const { user } = useUser();
  const [filterClass, setFilterClass] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const ilmClasses = classYears.filter(cy => cy.academicYearId === 'ay-2026-27' && cy.ilmEnabled);

  // Identify student's class (default VAHDA)
  const myClassId = ilmClasses.find(c => c.displayName.toLowerCase() === (user.className || 'VAHDA').toLowerCase())?.id || 'cy-vahda-2627';
  const myClassName = classMap[myClassId] || user.className || 'VAHDA';

  const filtered = allMeetings.filter(m => {
    const matchClass = filterClass === 'all' || m.classYearId === filterClass;
    const simplifiedStatus = getSimplifiedMeetingStatus(m.status);
    const matchStatus = filterStatus === 'all' || simplifiedStatus === filterStatus;
    return matchClass && matchStatus;
  });

  // Two-tier meeting organization: Student's class first, then other classes
  const myClassMeetings = filtered.filter(m => m.classYearId === myClassId);
  const otherClassMeetings = filtered.filter(m => m.classYearId !== myClassId);

  const renderStudentMeetingCard = (m: typeof allMeetings[0], isMyClass: boolean) => (
    <div
      key={m.id}
      className={`bg-white rounded-2xl border transition-all ${
        isMyClass
          ? 'border-indigo-300 shadow-sm hover:border-indigo-500 hover:shadow-md'
          : 'border-slate-200/90 shadow-sm hover:border-indigo-300 hover:shadow-md'
      }`}
    >
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isMyClass ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
          }`}>
            <Calendar className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold rounded-md px-2 py-0.5 border ${
                isMyClass
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                {classMap[m.classYearId]}
              </span>
              <span className="font-semibold text-slate-900">Meeting #{m.meetingNumber}</span>
              {isMyClass && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                  My Class
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 mt-0.5">{formatDate(m.date)}</p>
            <p className="text-sm font-medium text-slate-800 mt-1 truncate">{m.theme.english}</p>
            <p className="text-xs text-slate-400 truncate ml-text mt-0.5">{m.theme.malayalam}</p>

            <div className="mt-2 flex items-center gap-3">
              <Link
                href="/student/class"
                className="text-[11px] text-slate-500 hover:text-indigo-600 flex items-center gap-1 font-medium hover:underline"
              >
                <Users className="w-3 h-3 text-slate-400" />
                Classmates &amp; Photos →
              </Link>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-gray-100">
          <StatusBadge status={m.status} label={getMeetingStatusLabel(m.status)} />
          <Link
            href={`/student/meetings/${m.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
          >
            <Eye className="w-3.5 h-3.5" />
            View Meeting Report →
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">ILM Meetings</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Academic Year 2026–27 · Public Speaking &amp; Leadership Meetings
          </p>
        </div>

        <Link
          href="/student/class"
          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>My Class &amp; Students Directory</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={filterClass}
            onChange={e => setFilterClass(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">All Classes</option>
            {ilmClasses.map(cy => <option key={cy.id} value={cy.id}>{cy.displayName}</option>)}
          </select>

          {/* Simplified Statuses: Drafted, Submitted to Admin, Approved */}
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="drafted">Drafted</option>
            <option value="submitted">Submitted to Admin</option>
            <option value="approved">Approved</option>
          </select>
        </div>

        <span className="text-xs sm:text-sm font-medium text-slate-500">
          Showing {filtered.length} {filtered.length === 1 ? 'meeting' : 'meetings'}
        </span>
      </div>

      {/* TIER 1: Student's Own Class Meetings First */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 ring-2 ring-indigo-200" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
              My Class Meetings — {myClassName}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {myClassMeetings.length}
            </span>
          </div>

          <Link
            href="/student/class"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline"
          >
            <Users className="w-3.5 h-3.5" /> Classmates &amp; Photos →
          </Link>
        </div>

        {myClassMeetings.length === 0 ? (
          <div className="bg-slate-50/70 border border-dashed border-gray-200 rounded-xl p-5 text-center text-xs text-slate-500">
            No {filterStatus !== 'all' ? filterStatus : ''} meetings found for {myClassName}.
          </div>
        ) : (
          <div className="space-y-3">
            {myClassMeetings.map(m => renderStudentMeetingCard(m, true))}
          </div>
        )}
      </div>

      {/* TIER 2: Other Classes Meetings */}
      <div className="space-y-3 pt-3">
        <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
              Other Classes Meetings
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {otherClassMeetings.length}
            </span>
          </div>

          <span className="text-xs text-slate-400">
            Reports across campus
          </span>
        </div>

        {otherClassMeetings.length === 0 ? (
          <div className="bg-slate-50/70 border border-dashed border-gray-200 rounded-xl p-5 text-center text-xs text-slate-500">
            No other class meetings match the selected filter.
          </div>
        ) : (
          <div className="space-y-3">
            {otherClassMeetings.map(m => renderStudentMeetingCard(m, false))}
          </div>
        )}
      </div>
    </div>
  );
}
