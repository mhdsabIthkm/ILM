'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getStudent } from '@/lib/mock-data/students';
import { classYears } from '@/lib/mock-data/cohorts';
import { vahdaMeeting1Evaluations } from '@/lib/mock-data/meetings';
import { vahdaMeeting1Awards } from '@/lib/mock-data/meetings';
import { observationTags } from '@/lib/mock-data/observation-tags';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { StatusBadge } from '@/components/ui/status-badge';
import { WhatsAppPhotoModal } from '@/components/ui/whatsapp-photo-modal';
import { getAwardTypeLabel } from '@/lib/utils';
import { ArrowLeft, Award, Calendar, Mic, Star, Users, AlertCircle, Eye } from 'lucide-react';

const ROLE_HISTORY = [
  { meeting: 'Meeting #01', date: '18 Sep 2026', role: 'Prepared Speaker', classYear: 'VAHDA' },
];

function getTagLabel(id: string) {
  return observationTags.find(t => t.id === id)?.label ?? id;
}

function StudentInsights({ studentId }: { studentId: string }) {
  const evals = vahdaMeeting1Evaluations.filter(e => e.subjectStudentId === studentId);
  if (evals.length === 0) return null;

  const strengthCount: Record<string, number> = {};
  const improvementCount: Record<string, number> = {};

  evals.forEach(e => {
    e.strengthTagIds.forEach(id => { strengthCount[id] = (strengthCount[id] ?? 0) + 1; });
    e.improvementTagIds.forEach(id => { improvementCount[id] = (improvementCount[id] ?? 0) + 1; });
  });

  const topStrengths = Object.entries(strengthCount).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const topImprovements = Object.entries(improvementCount).sort((a, b) => b[1] - a[1]).slice(0, 3);

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Common Strengths</h3>
        {topStrengths.length === 0 ? (
          <p className="text-sm text-slate-400">None recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {topStrengths.map(([id, count]) => (
              <div key={id} className="flex items-center justify-between">
                <span className="text-sm text-slate-700">{getTagLabel(id)}</span>
                <span className="text-xs bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-0.5">
                  mentioned in {count} evaluation{count > 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Current Focus Areas</h3>
        {topImprovements.length === 0 ? (
          <p className="text-sm text-slate-400">None recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {topImprovements.map(([id, count]) => (
              <div key={id} className="flex items-center justify-between">
                <span className="text-sm text-slate-700">{getTagLabel(id)}</span>
                <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-md px-2 py-0.5">
                  {count} recent evaluation{count > 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.id as string;
  const student = getStudent(studentId);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  if (!student) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
        <p className="text-slate-500">Student not found.</p>
      </div>
    );
  }

  const cy = classYears.find(c => c.id === student.classYearId);
  const isVahda = student.classYearId === 'cy-vahda-2627';

  const myEvals = vahdaMeeting1Evaluations.filter(e => e.subjectStudentId === studentId);
  const myAwards = vahdaMeeting1Awards.filter(a => a.studentId === studentId);

  const preparedSpeeches = isVahda && ['vahda-zaid','vahda-hashir','vahda-nafih','vahda-jalal'].includes(studentId) ? 1 : 0;
  const ttSpeeches = isVahda && ['vahda-qubaib','vahda-azeem','vahda-sinan','vahda-thufail','vahda-shahid','vahda-hilal'].includes(studentId) ? 1 : 0;
  const rolesHeld = Object.keys({
    'vahda-adil': 1,'vahda-bilal': 1,'vahda-beeran': 1,'vahda-hafeez': 1,'vahda-haeezp': 1,
    'vahda-muhaviz': 1,'vahda-aflah': 1,'vahda-munzir': 1,'vahda-hafizst': 1,'vahda-hisham': 1,
    'vahda-muhammed': 1,'vahda-s01': 1,'vahda-s02': 1,'vahda-s03': 1,'vahda-s04': 1,
  }).includes(studentId) ? 1 : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-5">
      <Link href="/admin/students" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600">
        <ArrowLeft className="w-3.5 h-3.5" /> All Students
      </Link>

      {/* Profile header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
        <div className="flex items-start gap-4 flex-wrap">
          <div
            className="relative group cursor-pointer"
            onClick={() => setShowPhotoModal(true)}
            title="Click to view full photo"
          >
            <StudentAvatar
              name={student.name}
              admissionNo={student.admissionNo}
              size="xl"
              className="border-2 border-indigo-100 shadow-md group-hover:ring-2 group-hover:ring-indigo-500 transition-all"
            />
            <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Eye className="w-5 h-5 text-white drop-shadow" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-slate-900">{student.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="text-sm font-semibold text-slate-700">Adm. {student.admissionNo}</span>
              {cy && (
                <span className="text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-2.5 py-0.5">
                  Class: {cy.displayName}
                </span>
              )}
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${student.isIlm ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                {student.isIlm ? 'ILM Active' : 'Non-ILM'}
              </span>
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-3 pt-4 border-t border-gray-100">
          {[
            { label: 'Meetings', value: isVahda ? 1 : 0 },
            { label: 'Stage Appearances', value: preparedSpeeches + ttSpeeches + (rolesHeld > 0 ? 1 : 0) },
            { label: 'Prepared Speeches', value: preparedSpeeches },
            { label: 'TT Speeches', value: ttSpeeches },
            { label: 'Roles Completed', value: rolesHeld },
            { label: 'Awards', value: myAwards.length },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      {isVahda && <StudentInsights studentId={studentId} />}

      {/* Evaluator remarks */}
      {myEvals.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Recent Evaluator Remarks</h2>
          <div className="space-y-4">
            {myEvals.map(ev => (
              <div key={ev.id} className="border-l-2 border-indigo-200 pl-4">
                <p className="text-sm text-slate-700 italic">"{ev.remarks}"</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {ev.strengthTagIds.map(id => (
                    <span key={id} className="text-xs bg-green-50 text-green-700 border border-green-200 rounded-md px-1.5 py-0.5">
                      ✓ {getTagLabel(id)}
                    </span>
                  ))}
                  {ev.improvementTagIds.map(id => (
                    <span key={id} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-md px-1.5 py-0.5">
                      → {getTagLabel(id)}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-1.5">Meeting #01 · 18 Sep 2026</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Role history */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Role History</h2>
        {rolesHeld > 0 || preparedSpeeches > 0 || ttSpeeches > 0 ? (
          <div className="space-y-2">
            {ROLE_HISTORY.filter(() => isVahda).map((r, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                <span className="text-sm text-slate-700 flex-1">{r.role}</span>
                <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 rounded px-2 py-0.5">{r.meeting}</span>
                <span className="text-xs text-slate-400">{r.date}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No roles recorded yet.</p>
        )}
      </div>

      {/* Awards */}
      {myAwards.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Awards</h2>
          <div className="flex flex-wrap gap-2">
            {myAwards.map(aw => (
              <div key={aw.id} className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{getAwardTypeLabel(aw.type)}</p>
                  <p className="text-xs text-slate-500">Meeting #01 · 18 Sep 2026</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attendance */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Attendance</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3 py-2">
            <span className="text-sm text-slate-700 flex-1">Meeting #01 — 18 Sep 2026</span>
            <StatusBadge status="present" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 flex gap-4 text-sm">
          <div><span className="font-semibold text-slate-900">1</span> <span className="text-slate-500">Present</span></div>
          <div><span className="font-semibold text-slate-900">0</span> <span className="text-slate-500">Absent</span></div>
          <div><span className="font-semibold text-slate-900">0</span> <span className="text-slate-500">Excused</span></div>
        </div>
      </div>

      {/* WhatsApp Photo Modal */}
      {showPhotoModal && (
        <WhatsAppPhotoModal
          data={{
            name: student.name,
            admissionNo: student.admissionNo,
            className: cy?.displayName,
            fatherName: student.fatherName,
            studentId: student.id,
          }}
          onClose={() => setShowPhotoModal(false)}
        />
      )}
    </div>
  );
}
