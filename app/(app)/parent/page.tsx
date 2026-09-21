'use client';

import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { getStudent } from '@/lib/mock-data/students';
import { allMeetings, vahdaMeeting1Awards, vahdaMeeting1Evaluations } from '@/lib/mock-data/meetings';
import { observationTags } from '@/lib/mock-data/observation-tags';
import { getAwardTypeLabel, formatDate } from '@/lib/utils';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { Award, Calendar, Star, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { ObservationBadge } from '@/components/ui/observation-badge';

export default function ParentDashboard() {
  const { user } = useUser();

  const childId = user.childStudentId ?? 'vahda-nafih';
  const child = getStudent(childId);
  const childName = child?.name ?? user.childName ?? 'Your Child';
  const childClass = user.childClassName ?? 'VAHDA';
  const childAdm = child?.admissionNo ?? '—';
  const childClassYearId = user.childClassYearId ?? 'cy-vahda-2627';

  const classMeetings = allMeetings.filter(m => m.classYearId === childClassYearId);
  const myEvals = vahdaMeeting1Evaluations.filter(e => e.subjectStudentId === childId);
  const myAwards = vahdaMeeting1Awards.filter(a => a.studentId === childId);

  // Aggregate strengths/improvements
  const strengthCount: Record<string, number> = {};
  const improvCount: Record<string, number> = {};
  myEvals.forEach(e => {
    e.strengthTagIds.forEach(id => { strengthCount[id] = (strengthCount[id] ?? 0) + 1; });
    e.improvementTagIds.forEach(id => { improvCount[id] = (improvCount[id] ?? 0) + 1; });
  });

  return (
    <div className="p-5 max-w-2xl mx-auto space-y-5">
      {/* Welcome banner */}
      <div className="bg-emerald-600 rounded-xl p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-emerald-200 text-xs font-medium uppercase tracking-wide">Parent Dashboard</p>
            <h1 className="text-xl font-bold">{childName}</h1>
            <p className="text-emerald-200 text-sm">{childClass} · Adm. {childAdm}</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Meetings', value: classMeetings.length },
          { label: 'Awards', value: myAwards.length },
          { label: 'Evaluations', value: myEvals.length },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Child profile card */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
        <StudentAvatar name={childName} size="lg" />
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-slate-900">{childName}</h2>
          <p className="text-sm text-slate-500">{childClass} · Admission No. {childAdm}</p>
          <p className="text-sm text-slate-500">Academic Year 2026–27</p>
        </div>
        <Link href="/parent/my-son" className="text-xs text-indigo-600 hover:underline flex-shrink-0">Details →</Link>
      </div>

      {/* Strengths */}
      {Object.keys(strengthCount).length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" /> Strengths Noted by Evaluators
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(strengthCount).sort((a, b) => b[1] - a[1]).map(([id]) => (
              <ObservationBadge key={id} tagId={id} type="strength" size="sm" />
            ))}
          </div>
        </div>
      )}

      {/* Focus areas */}
      {Object.keys(improvCount).length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-amber-950 flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-amber-600" /> Areas to Practice & Grow
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(improvCount).sort((a, b) => b[1] - a[1]).map(([id]) => (
              <ObservationBadge key={id} tagId={id} type="improvement" size="sm" />
            ))}
          </div>
        </div>
      )}

      {/* Meetings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">ILM Meetings</h2>
          <Link href="/parent/meetings" className="text-xs text-indigo-600 hover:underline">View all</Link>
        </div>
        {classMeetings.length === 0 ? (
          <p className="text-sm text-slate-400 p-4 text-center">No meetings yet.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {classMeetings.map(m => (
              <div key={m.id} className="flex items-center gap-3 px-4 py-3">
                <Calendar className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">Meeting #{m.meetingNumber} · {m.theme.english}</p>
                  <p className="text-xs text-slate-400">{formatDate(m.date)}</p>
                </div>
                <Link href={`/admin/meetings/${m.id}/final-report`} className="text-xs text-indigo-600 hover:underline flex-shrink-0">Report →</Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Awards */}
      {myAwards.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-400" /> Awards
          </h2>
          <div className="flex flex-wrap gap-2">
            {myAwards.map(aw => (
              <div key={aw.id} className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <p className="text-sm font-medium text-slate-900">{getAwardTypeLabel(aw.type)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy note */}
      <p className="text-xs text-slate-400 text-center">
        You can view your child's progress and class reports. Other students' details are not shared.
      </p>
    </div>
  );
}
