'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  vahdaMeeting1, vahdaMeeting1Roles, vahdaMeeting1PreparedSpeeches,
  vahdaMeeting1TableTopics, vahdaMeeting1IceBreaking, vahdaMeeting1Awards,
  vahdaMeeting1Attendance, vahdaMeeting1GrammarianReport, vahdaMeeting1AhCounterReport,
  vahdaMeeting1TimerReport, vahdaMeeting1Evaluations,
  allMeetings
} from '@/lib/mock-data/meetings';
import { getStudent } from '@/lib/mock-data/students';
import { getRoleById } from '@/lib/mock-data/roles';
import { StatusBadge } from '@/components/ui/status-badge';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { formatDate, getAwardTypeLabel, getTimingResultLabel } from '@/lib/utils';
import { observationTags } from '@/lib/mock-data/observation-tags';
import {
  ArrowLeft, Calendar, Clock, MapPin, Users, CheckCircle,
  ShieldCheck, Mic, Award, BookOpen, Star, Sparkles,
  MessageSquare, FileText, ChevronRight
} from 'lucide-react';
import { classYears } from '@/lib/mock-data/cohorts';

function getTagLabel(id: string) {
  return observationTags.find(t => t.id === id)?.label ?? id;
}

export default function StudentMeetingViewPage() {
  const params = useParams();
  const meetingId = params.id as string;

  const meeting = meetingId === 'meeting-vahda-01' ? vahdaMeeting1 : allMeetings.find(m => m.id === meetingId) || vahdaMeeting1;
  const isVahda = meeting.classYearId === 'cy-vahda-2026' || meetingId === 'meeting-vahda-01';
  const cy = classYears.find(c => c.id === meeting.classYearId);

  // Key officers
  const president = vahdaMeeting1Roles.find(r => r.roleId === 'role-president');
  const lmod = vahdaMeeting1Roles.find(r => r.roleId === 'role-lmod');
  const ttMaster = vahdaMeeting1Roles.find(r => r.roleId === 'role-tt-master');
  const grammarian = vahdaMeeting1Roles.find(r => r.roleId === 'role-grammarian');
  const ahCounter = vahdaMeeting1Roles.find(r => r.roleId === 'role-ah-counter');
  const timer = vahdaMeeting1Roles.find(r => r.roleId === 'role-timer');

  const presentCount = vahdaMeeting1Attendance.filter(a => a.status === 'present').length;
  const absentCount = vahdaMeeting1Attendance.filter(a => a.status === 'absent').length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Back navigation */}
      <Link
        href="/student/meetings"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to ILM Meetings
      </Link>

      {/* Meeting Header Hero Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
              Class {cy?.displayName ?? 'VAHDA'}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Official Verified Record
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Academic Session 2026–27
          </span>
        </div>

        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
            Meeting #{meeting.meetingNumber}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
            {meeting.theme.english}
          </h1>
          {meeting.theme.malayalam && (
            <p className="text-sm sm:text-base font-semibold text-slate-600 mt-1 font-serif">
              {meeting.theme.malayalam}
            </p>
          )}
        </div>

        {/* Meeting metadata pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs text-slate-600">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Date</p>
              <p className="font-bold text-slate-800">{formatDate(meeting.date)}</p>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Time</p>
              <p className="font-bold text-slate-800">{meeting.startTime} – {meeting.endTime}</p>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
            <Users className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Attendance</p>
              <p className="font-bold text-slate-800">{presentCount}/35 Present</p>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Venue</p>
              <p className="font-bold text-slate-800">Academic Hall</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Main Session Details & Technical Evaluation Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column (2 Cols): Speeches & Roles */}
        <div className="lg:col-span-2 space-y-6">

          {/* Presiding Officers Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Meeting Leadership &amp; Anchor
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {president && (
                <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center gap-3">
                  <StudentAvatar name={getStudent(president.studentId)?.name ?? 'President'} size="md" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                      ILM President
                    </span>
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {getStudent(president.studentId)?.name}
                    </p>
                  </div>
                </div>
              )}
              {lmod && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                  <StudentAvatar name={getStudent(lmod.studentId)?.name ?? 'LMOD'} size="md" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Learning Master of Day
                    </span>
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {getStudent(lmod.studentId)?.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Prepared Speeches Showcase */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Mic className="w-4 h-4 text-indigo-600" />
                Prepared Speeches &amp; Evaluations
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {vahdaMeeting1PreparedSpeeches.length} Speeches Delivered
              </span>
            </div>

            <div className="space-y-4">
              {vahdaMeeting1PreparedSpeeches.map((sp, idx) => {
                const spStudent = getStudent(sp.studentId);
                const evalData = vahdaMeeting1Evaluations.find(e => e.subjectStudentId === sp.studentId);
                const evaluatorStudent = evalData?.evaluatorStudentId ? getStudent(evalData.evaluatorStudentId) : null;

                return (
                  <div key={sp.id} className="p-4 rounded-xl border border-gray-200 bg-slate-50/40 hover:bg-slate-50 transition-colors space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <StudentAvatar name={spStudent?.name ?? 'Speaker'} size="md" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                              Speaker #{idx + 1}
                            </span>
                            <span className="text-xs font-mono text-slate-400">
                              #{spStudent?.admissionNo}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 mt-0.5">
                            {spStudent?.name}
                          </p>
                        </div>
                      </div>
                      {evalData && (
                        <div className="text-right flex-shrink-0">
                          <span className="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            Evaluated
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Speech Title */}
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-xs font-bold text-slate-800">
                        {sp.subject?.english || 'Speech Presentation'}
                      </p>
                      {sp.subject?.malayalam && (
                        <p className="text-[11px] text-slate-500 font-medium font-serif mt-0.5">
                          {sp.subject.malayalam}
                        </p>
                      )}
                    </div>

                    {/* Evaluator notes & feedback tags */}
                    {evalData && (
                      <div className="text-xs space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-slate-500">
                          <span className="font-semibold text-slate-700">
                            Evaluator: {evaluatorStudent?.name || 'Assigned Evaluator'}
                          </span>
                        </div>
                        {evalData.remarks && (
                          <p className="text-slate-600 bg-white/80 p-2.5 rounded-lg border border-gray-100 italic">
                            &ldquo;{evalData.remarks}&rdquo;
                          </p>
                        )}
                        {evalData.strengthTagIds && evalData.strengthTagIds.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {evalData.strengthTagIds.map(tid => (
                              <span key={tid} className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                                ✓ {getTagLabel(tid)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Table Topics (Impromptu Speeches) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Table Topics (Impromptu Session)
              </h2>
              {ttMaster && (
                <span className="text-xs text-slate-500">
                  Master: <strong>{getStudent(ttMaster.studentId)?.name}</strong>
                </span>
              )}
            </div>

            <div className="space-y-2.5">
              {vahdaMeeting1TableTopics.map((tt, idx) => {
                const s = getStudent(tt.studentId);
                const englishTopic = typeof tt.topic === 'string' ? tt.topic : tt.topic?.english || 'Impromptu Topic';
                const malayalamTopic = typeof tt.topic === 'object' ? tt.topic?.malayalam : null;
                return (
                  <div key={tt.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <StudentAvatar name={s?.name ?? 'Speaker'} size="sm" />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate">{s?.name}</p>
                        <p className="text-[11px] text-slate-500 italic truncate">
                          {englishTopic}
                          {malayalamTopic ? ` · ${malayalamTopic}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold bg-white border border-gray-200 flex-shrink-0">
                      TT #{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (1 Col): Awards, Technical Reports & Official Verification */}
        <div className="space-y-6">

          {/* Awards & Commendations Card */}
          <div className="bg-gradient-to-br from-amber-50/70 to-yellow-50/40 rounded-2xl border border-amber-200 p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-amber-950 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              Session Honors &amp; Awards
            </h2>

            <div className="space-y-2.5">
              {vahdaMeeting1Awards.map(a => {
                const s = a.studentId ? getStudent(a.studentId) : null;
                return (
                  <div key={a.id} className="p-3 bg-white rounded-xl border border-amber-200 flex items-center gap-3 shadow-2xs">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                      🏆
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                        {getAwardTypeLabel(a.type)}
                      </span>
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {s?.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grammarian's Report */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Grammarian Report</h3>
              {grammarian && (
                <span className="text-[11px] text-slate-400">
                  {getStudent(grammarian.studentId)?.name}
                </span>
              )}
            </div>

            {/* Overall remarks */}
            {vahdaMeeting1GrammarianReport.overallRemarks && (
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Grammarian Assessment</span>
                <p className="text-slate-700 mt-1 leading-relaxed">
                  &ldquo;{vahdaMeeting1GrammarianReport.overallRemarks}&rdquo;
                </p>
              </div>
            )}

            {/* Observations / Grammar corrections */}
            <div className="space-y-2 pt-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Noted Language Corrections</p>
              <div className="space-y-1.5 text-xs">
                {vahdaMeeting1GrammarianReport.observations.map(obs => (
                  <div key={obs.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                    <p className="text-red-700 line-through text-[11px]">&ldquo;{obs.whatWasSaid}&rdquo;</p>
                    <p className="text-emerald-700 font-semibold text-[11px]">→ &ldquo;{obs.suggestedCorrection}&rdquo;</p>
                    {obs.note && <p className="text-[10px] text-slate-400">Note: {obs.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Official Verification Box */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Record Lock &amp; Verification</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              This meeting report was completed by the designated student scribe and verified by the ILM Coordinator Ustadh. Edits are locked to preserve institutional records.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
