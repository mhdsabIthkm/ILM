'use client';

import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { getStudent, findStudentByAdmissionNo } from '@/lib/mock-data/students';
import { classYears } from '@/lib/mock-data/cohorts';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { vahdaMeeting1Awards, vahdaMeeting1Evaluations } from '@/lib/mock-data/meetings';
import { observationTags } from '@/lib/mock-data/observation-tags';
import { getAwardTypeLabel } from '@/lib/utils';
import { Award, TrendingUp, Info, CheckCircle } from 'lucide-react';
import { ObservationBadge } from '@/components/ui/observation-badge';

export default function MySonPage() {
  const { user } = useUser();
  const child =
    (user.childStudentId ? getStudent(user.childStudentId) : null) ||
    (user.childAdmissionNo ? findStudentByAdmissionNo(user.childAdmissionNo) : null) ||
    getStudent('st-1056') ||
    getStudent('vahda-nafih')!;

  const cy = classYears.find(c => c.id === child?.classYearId);
  const className = cy?.displayName ?? child?.className ?? user.childClassName ?? 'VAHDA';

  const myEvals = vahdaMeeting1Evaluations.filter(e => e.subjectStudentId === child.id);
  const myAwards = vahdaMeeting1Awards.filter(a => a.studentId === child.id);

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-5">
      <h1 className="text-xl font-bold text-slate-900">My Child&apos;s Profile</h1>
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col sm:flex-row items-start gap-4 shadow-xs">
        <StudentAvatar name={child.name} admissionNo={child.admissionNo} size="xl" className="border-2 border-slate-200 shadow-md" />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-900">{child.name}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Class: {className}
            </span>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
              Adm. #{child.admissionNo}
            </span>
            {child.fatherName && (
              <span className="text-xs text-slate-500 font-medium">S/o {child.fatherName}</span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            Academic Year 2026–27 · Malik Deenar Islamic Academy
          </p>

          <div className="mt-3 p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
            <span>Official student photo verified for Academic Year 2026–27.</span>
          </div>
        </div>
      </div>
      {myAwards.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Recent Awards</h2>
          {myAwards.map(aw => (
            <div key={aw.id} className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <p className="text-sm font-medium text-slate-900">{getAwardTypeLabel(aw.type)}</p>
            </div>
          ))}
        </div>
      )}
      {myEvals.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <h2 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" /> Recent Feedback
          </h2>
          {myEvals.slice(0,1).map(ev => (
            <div key={ev.id} className="border-l-2 border-indigo-200 pl-4 space-y-2">
              <p className="text-sm text-slate-700 italic">"{ev.remarks}"</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {ev.strengthTagIds.map(id => (
                  <ObservationBadge key={id} tagId={id} type="strength" size="sm" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <Link href="/parent" className="text-xs text-indigo-600 hover:underline">← Back to Dashboard</Link>
    </div>
  );
}
