'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import {
  vahdaMeeting1, vahdaMeeting1Roles, vahdaMeeting1PreparedSpeeches,
  vahdaMeeting1TableTopics, vahdaMeeting1IceBreaking, vahdaMeeting1Awards,
  vahdaMeeting1Attendance, vahdaMeeting1GrammarianReport, vahdaMeeting1AhCounterReport,
  vahdaMeeting1TimerReport, vahdaMeeting1Media, vahdaMeeting1Report,
  allMeetings
} from '@/lib/mock-data/meetings';
import { getStudent } from '@/lib/mock-data/students';
import { getRoleById } from '@/lib/mock-data/roles';
import { StatusBadge } from '@/components/ui/status-badge';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { formatDate, getAwardTypeLabel, getTimingResultLabel, getMeetingStatusLabel } from '@/lib/utils';
import {
  ArrowLeft, Calendar, Edit, Upload, FileText, Download, Printer,
  ChevronDown, ChevronUp, AlertCircle, Award, Camera, Clock
} from 'lucide-react';
import { useState } from 'react';
import { classYears } from '@/lib/mock-data/cohorts';

function StudentName({ id }: { id: string }) {
  const s = getStudent(id);
  return (
    <div className="flex items-center gap-2">
      <StudentAvatar name={s?.name ?? '?'} size="sm" />
      <Link href={`/admin/students/${id}`} className="text-sm font-medium text-slate-900 hover:text-indigo-600">
        {s?.name ?? id}
      </Link>
    </div>
  );
}

function RoleRow({ roleId, studentId }: { roleId: string; studentId: string }) {
  const role = getRoleById(roleId);
  const s = getStudent(studentId);
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <div className="w-36 flex-shrink-0">
        <p className="text-xs font-semibold text-slate-500">{role?.name ?? roleId}</p>
        {role?.expandedName && (
          <p className="text-[10px] text-slate-400">{role.expandedName}</p>
        )}
      </div>
      <StudentName id={studentId} />
    </div>
  );
}

function SectionCard({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-slate-50/70 hover:bg-slate-100/70 border-b border-slate-100 transition-colors"
      >
        <span className="font-bold text-slate-900 text-sm tracking-tight">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
      </button>
      {open && <div className="p-5 sm:p-6">{children}</div>}
    </div>
  );
}

export default function MeetingDetailPage() {
  const params = useParams();
  const meetingId = params.id as string;

  const meeting = meetingId === 'meeting-vahda-01' ? vahdaMeeting1 : allMeetings.find(m => m.id === meetingId);
  const isVahda = meetingId === 'meeting-vahda-01';

  if (!meeting) {
    return <div className="p-6 text-slate-500 text-center">Meeting not found.</div>;
  }

  const cy = classYears.find(c => c.id === meeting.classYearId);
  const president = vahdaMeeting1Roles.find(r => r.roleId === 'role-president');
  const qirath = vahdaMeeting1Roles.find(r => r.roleId === 'role-qirath');
  const dua = vahdaMeeting1Roles.find(r => r.roleId === 'role-dua');
  const welcome = vahdaMeeting1Roles.find(r => r.roleId === 'role-welcome');
  const inauguration = vahdaMeeting1Roles.find(r => r.roleId === 'role-inauguration');
  const lmod = vahdaMeeting1Roles.find(r => r.roleId === 'role-lmod');
  const ttMaster = vahdaMeeting1Roles.find(r => r.roleId === 'role-tt-master');
  const iceBreaking = vahdaMeeting1Roles.find(r => r.roleId === 'role-ice-breaking');
  const grammarian = vahdaMeeting1Roles.find(r => r.roleId === 'role-grammarian');
  const ahCounter = vahdaMeeting1Roles.find(r => r.roleId === 'role-ah-counter');
  const ev1 = vahdaMeeting1Roles.find(r => r.roleId === 'role-evaluator1');
  const ev2 = vahdaMeeting1Roles.find(r => r.roleId === 'role-evaluator2');
  const ev3 = vahdaMeeting1Roles.find(r => r.roleId === 'role-evaluator3');
  const ge = vahdaMeeting1Roles.find(r => r.roleId === 'role-general-evaluator');
  const timer = vahdaMeeting1Roles.find(r => r.roleId === 'role-timer');
  const thankYou = vahdaMeeting1Roles.find(r => r.roleId === 'role-thankyou');
  const ttSpeakers = vahdaMeeting1Roles.filter(r => r.roleId === 'role-tt-speaker').sort((a, b) => (a.slot ?? 0) - (b.slot ?? 0));

  const presentCount = vahdaMeeting1Attendance.filter(a => a.status === 'present').length;

  const [sections, setSections] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`meeting-${meetingId}-sections`);
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return vahdaMeeting1Report.sections;
  });

  const completeSections = sections.filter((s: any) => s.status === 'complete' || s.status === 'nil').length;
  const totalRequired = sections.filter((s: any) => s.required).length;

  const { user } = useUser();

  const [isFinalized, setIsFinalized] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(`meeting-${meetingId}-finalized`) === 'true';
      } catch {}
    }
    return false;
  });

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Card — Non-sticky, elegant elevated card with crisp borders */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-7 space-y-5">
        <Link href="/admin/meetings" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> All Meetings
        </Link>

        <div className="flex items-start gap-4 flex-wrap justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-2.5 py-0.5">
                Class {cy?.displayName ?? 'VAHDA'}
              </span>
              <StatusBadge
                status={isFinalized ? 'completed' : meeting.status}
                label={isFinalized ? 'Report Finalized' : getMeetingStatusLabel(meeting.status)}
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">ILM Meeting #{meeting.meetingNumber}</h1>
            <div className="mt-1">
              <p className="text-base sm:text-lg text-slate-800 font-bold">{meeting.theme.english}</p>
              {meeting.theme.malayalam && (
                <p className="text-sm sm:text-base text-slate-600 font-semibold ml-text mt-0.5">{meeting.theme.malayalam}</p>
              )}
            </div>
            <div className="flex items-center gap-3 mt-3 text-xs text-slate-600 flex-wrap">
              <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80 font-medium">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" /> {formatDate(meeting.date)}
              </span>
              {isVahda && (
                <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80 font-medium">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" /> {meeting.startTime} – {meeting.endTime}
                </span>
              )}
              {isVahda && (
                <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200/80 font-semibold">
                  {presentCount}/35 present
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start">
            {!isFinalized && user.role === 'admin' && (
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            )}
            {!isFinalized && (
              <Link href={`/admin/meetings/${meetingId}/enter-report`} className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-xs transition-colors">
                <FileText className="w-3.5 h-3.5" /> Enter Report
              </Link>
            )}
            <Link href={`/admin/meetings/${meetingId}/final-report`} className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors">
              <Printer className="w-3.5 h-3.5" /> Full Report
            </Link>
          </div>
        </div>

        {/* Report progress bar & Finalized notice */}
        {isVahda && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
            <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${(completeSections / totalRequired) * 100}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-600 flex-shrink-0">
              {completeSections}/{totalRequired} sections complete
            </span>
            {!isFinalized ? (
              <Link href={`/admin/meetings/${meetingId}/finalize`} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex-shrink-0">
                Finalize →
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-bold flex-shrink-0">
                Finalized &amp; Locked
              </span>
            )}
          </div>
        )}

        {/* Locked alert banner once finalized — Scrolls naturally with header */}
        {isFinalized && (
          <div className="p-3.5 bg-emerald-50/90 border border-emerald-300/80 rounded-2xl flex items-center justify-between text-xs text-emerald-950 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 flex-shrink-0" />
              <span><strong>Official Report Finalized:</strong> All 9 sections have been submitted. Editing is locked.</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-200/80 px-2.5 py-1 rounded-lg flex-shrink-0">Verified Record</span>
          </div>
        )}
      </div>

      {/* Body — 9 Report Sections */}
      <div className="space-y-4">

        {/* ILM President */}
        {isVahda && president && (
          <div className="bg-white border border-indigo-200/90 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 shadow-sm">
            <div className="text-xs font-bold text-indigo-700 uppercase tracking-wide bg-indigo-50 border border-indigo-200/80 px-3 py-1.5 rounded-xl flex-shrink-0">
              ILM President
            </div>
            <StudentName id={president.studentId} />
          </div>
        )}

        {/* Section 1: Opening */}
        <SectionCard title="Section 1 — Opening">
          {isVahda ? (
            <div className="space-y-0">
              {qirath && <RoleRow roleId="role-qirath" studentId={qirath.studentId} />}
              {dua && <RoleRow roleId="role-dua" studentId={dua.studentId} />}
              {welcome && <RoleRow roleId="role-welcome" studentId={welcome.studentId} />}
              {inauguration && <RoleRow roleId="role-inauguration" studentId={inauguration.studentId} />}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No data for this meeting.</p>
          )}
        </SectionCard>

        {/* Section 2: Prepared Speeches */}
        <SectionCard title="Section 2 — Prepared Speech Session">
          {isVahda && lmod ? (
            <div className="space-y-4">
              <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 flex items-center gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">LMOD — Learning Master of the Day</p>
                  <div className="mt-1"><StudentName id={lmod.studentId} /></div>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Prepared Speeches</p>
                <div className="space-y-3">
                  {vahdaMeeting1PreparedSpeeches.map((ps, i) => {
                    const s = getStudent(ps.studentId);
                    return (
                      <div key={ps.id} className="bg-slate-50/50 border border-slate-200/90 rounded-xl p-3.5 hover:bg-slate-50 transition-colors shadow-2xs">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-slate-400 w-4">{i + 1}.</span>
                          <StudentAvatar name={s?.name ?? '?'} size="sm" />
                          <span className="font-bold text-slate-900 text-sm">{s?.name}</span>
                        </div>
                        <div className="ml-6">
                          <p className="text-sm font-semibold text-slate-800">{ps.subject.english}</p>
                          <p className="text-xs text-slate-500 ml-text mt-0.5">{ps.subject.malayalam}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400">No data for this meeting.</p>
          )}
        </SectionCard>

        {/* Section 3: Table Topics */}
        <SectionCard title="Section 3 — Table Topics">
          {isVahda && ttMaster ? (
            <div className="space-y-4">
              <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">TT Master — Table Topic Master</p>
                <div className="mt-1"><StudentName id={ttMaster.studentId} /></div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Speakers</p>
                <div className="space-y-2">
                  {ttSpeakers.map((tt, i) => {
                    const topic = vahdaMeeting1TableTopics[i];
                    const s = getStudent(tt.studentId);
                    return (
                      <div key={tt.id} className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
                        <span className="text-xs font-bold text-slate-400 w-4">{i + 1}.</span>
                        <StudentAvatar name={s?.name ?? '?'} size="sm" />
                        <span className="text-sm font-bold text-slate-900">{s?.name}</span>
                        <span className="ml-auto text-xs font-medium text-slate-600 text-right max-w-[200px] truncate">{topic?.topic.english}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400">No data for this meeting.</p>
          )}
        </SectionCard>

        {/* Section 4: Ice Breaking */}
        <SectionCard title="Section 4 — Ice Breaking Speech">
          {isVahda && iceBreaking ? (
            <div className="space-y-3">
              <RoleRow roleId="role-ice-breaking" studentId={iceBreaking.studentId} />
              {vahdaMeeting1IceBreaking.topic && (
                <div className="ml-36 mt-1">
                  <p className="text-sm font-semibold text-slate-800">{vahdaMeeting1IceBreaking.topic.english}</p>
                  <p className="text-xs text-slate-500 ml-text mt-0.5">{vahdaMeeting1IceBreaking.topic.malayalam}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No data for this meeting.</p>
          )}
        </SectionCard>

        {/* Section 5: Evaluation */}
        <SectionCard title="Section 5 — Evaluation Session">
          {isVahda ? (
            <div className="space-y-0">
              {grammarian && <RoleRow roleId="role-grammarian" studentId={grammarian.studentId} />}
              {ahCounter && <RoleRow roleId="role-ah-counter" studentId={ahCounter.studentId} />}
              {ev1 && <RoleRow roleId="role-evaluator1" studentId={ev1.studentId} />}
              {ev2 && <RoleRow roleId="role-evaluator2" studentId={ev2.studentId} />}
              {ev3 && <RoleRow roleId="role-evaluator3" studentId={ev3.studentId} />}
              {ge && <RoleRow roleId="role-general-evaluator" studentId={ge.studentId} />}
              {timer && <RoleRow roleId="role-timer" studentId={timer.studentId} />}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No data for this meeting.</p>
          )}
        </SectionCard>

        {/* Awards */}
        <SectionCard title="Awards">
          {isVahda ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {vahdaMeeting1Awards.map(aw => {
                const s = aw.studentId ? getStudent(aw.studentId) : null;
                return (
                  <div key={aw.id} className="flex items-center gap-3.5 bg-amber-50/70 border border-amber-200/90 rounded-xl p-3.5 shadow-2xs">
                    <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">{getAwardTypeLabel(aw.type)}</p>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{s?.name ?? '—'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No awards recorded.</p>
          )}
        </SectionCard>

        {/* Thank You */}
        <SectionCard title="Thank You Speech">
          {isVahda && thankYou ? (
            <RoleRow roleId="role-thankyou" studentId={thankYou.studentId} />
          ) : (
            <p className="text-sm text-slate-400">No data for this meeting.</p>
          )}
        </SectionCard>

        {/* Gallery */}
        <SectionCard title="Gallery" defaultOpen={false}>
          {isVahda ? (
            <div className="grid grid-cols-3 gap-3">
              {vahdaMeeting1Media.map(media => (
                <div key={media.id} className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 shadow-2xs">
                  <div className="text-center">
                    <Camera className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                    <p className="text-[10px] font-medium text-slate-500">{media.caption}</p>
                  </div>
                </div>
              ))}
              <button className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 flex items-center justify-center transition-colors">
                <div className="text-center">
                  <Upload className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-slate-500">Add Photo</p>
                </div>
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-400">No photos uploaded.</p>
          )}
        </SectionCard>

        {/* Entry shortcuts */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3.5">Enter Report Sections</h2>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {sections.map((s: any) => (
              <Link
                key={s.key}
                href={`/admin/meetings/${meetingId}/report/${s.key}`}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/70 transition-all group shadow-2xs"
              >
                <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700">{s.label}</span>
                <StatusBadge status={s.status} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
