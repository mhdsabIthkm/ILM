'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Save, CheckCircle, CheckCircle2, Sparkles, MessageSquareQuote, Check, Award, Clock, Users, ShieldCheck, AlertCircle, ArrowUpRight, ChevronRight, RotateCcw, Info } from 'lucide-react';
import { getStudent } from '@/lib/mock-data/students';
import { vahdaMeeting1AhCounterReport, vahdaMeeting1GrammarianReport, vahdaMeeting1TimerReport, vahdaMeeting1Evaluations, vahdaMeeting1Awards, vahdaMeeting1Report } from '@/lib/mock-data/meetings';
import { vahdaStudents } from '@/lib/mock-data/students';
import { StatusBadge } from '@/components/ui/status-badge';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { ObservationTagSelector } from '@/components/ui/observation-tag-selector';
import { getAwardTypeLabel, getTimingResultLabel } from '@/lib/utils';

// ---- Attendance Section ----
function AttendanceSection({ meetingId }: { meetingId: string }) {
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'excused'>>(() => {
    const init: Record<string, 'present' | 'absent' | 'excused'> = {};
    vahdaStudents.forEach((s, i) => {
      init[s.id] = i === 30 ? 'absent' : i === 31 ? 'excused' : 'present';
    });
    return init;
  });
  const [saved, setSaved] = useState(false);

  const counts = { present: 0, absent: 0, excused: 0 };
  Object.values(attendance).forEach(v => counts[v]++);

  const setAll = (status: 'present') => {
    const next: Record<string, 'present'> = {};
    vahdaStudents.forEach(s => { next[s.id] = status; });
    setAttendance(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1">
          {(['present','absent','excused'] as const).map(s => (
            <div key={s} className="flex items-center gap-1 mr-3">
              <StatusBadge status={s} />
              <span className="text-sm text-slate-600">{counts[s]}</span>
            </div>
          ))}
        </div>
        <button onClick={() => setAll('present')} className="text-xs text-indigo-600 border border-indigo-200 rounded px-2.5 py-1.5 hover:bg-indigo-50">
          Mark All Present
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {vahdaStudents.map((s, i) => (
          <div key={s.id} className={`flex items-center gap-3 px-4 py-3 ${i !== vahdaStudents.length - 1 ? 'border-b border-gray-50' : ''}`}>
            <StudentAvatar name={s.name} size="sm" />
            <span className="flex-1 text-sm font-medium text-slate-900">{s.name}</span>
            <span className="text-xs text-slate-400 hidden sm:block">{s.admissionNo}</span>
            <div className="flex gap-1.5">
              {(['present','absent','excused'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setAttendance(prev => ({ ...prev, [s.id]: status }))}
                  className={`px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors ${
                    attendance[s.id] === status
                      ? status === 'present' ? 'bg-green-100 text-green-700 border border-green-300'
                      : status === 'absent' ? 'bg-red-100 text-red-600 border border-red-300'
                      : 'bg-amber-100 text-amber-700 border border-amber-300'
                      : 'bg-slate-100 text-slate-500 border border-transparent hover:border-slate-300'
                  }`}
                >
                  {status.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setSaved(true)}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-colors ${
          saved ? 'bg-green-50 text-green-700 border border-green-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {saved ? <><CheckCircle className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save Attendance</>}
      </button>
    </div>
  );
}

// ---- Grammarian Section ----
function GrammarianSection() {
  const [observations, setObservations] = useState(vahdaMeeting1GrammarianReport.observations);
  const [overall, setOverall] = useState(vahdaMeeting1GrammarianReport.overallRemarks);
  const [saved, setSaved] = useState(false);

  const addObs = () => {
    setObservations(prev => [...prev, {
      id: `go-new-${Date.now()}`,
      meetingId: 'meeting-vahda-01',
      grammarianStudentId: 'vahda-hafeez',
      speakerStudentId: '',
      whatWasSaid: '',
      suggestedCorrection: '',
      note: '',
    }]);
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600">
        <strong>Grammarian:</strong> Hafeez — Record language or grammar mistakes and corrections.
      </div>

      {observations.map((obs, i) => {
        const speaker = getStudent(obs.speakerStudentId);
        return (
          <div key={obs.id} className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Observation {i + 1}</span>
              <button onClick={() => setObservations(prev => prev.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Speaker</label>
              <select
                value={obs.speakerStudentId}
                onChange={e => setObservations(prev => prev.map((o, idx) => idx === i ? { ...o, speakerStudentId: e.target.value } : o))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select speaker...</option>
                {vahdaStudents.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">What was said / mistake</label>
                <input
                  type="text"
                  value={obs.whatWasSaid}
                  onChange={e => setObservations(prev => prev.map((o, idx) => idx === i ? { ...o, whatWasSaid: e.target.value } : o))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., womens rights"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Suggested correction</label>
                <input
                  type="text"
                  value={obs.suggestedCorrection}
                  onChange={e => setObservations(prev => prev.map((o, idx) => idx === i ? { ...o, suggestedCorrection: e.target.value } : o))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., women's rights"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Optional note</label>
              <input
                type="text"
                value={obs.note}
                onChange={e => setObservations(prev => prev.map((o, idx) => idx === i ? { ...o, note: e.target.value } : o))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Subject-verb agreement"
              />
            </div>
          </div>
        );
      })}

      <button onClick={addObs} className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-200 rounded-lg text-sm text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
        <Plus className="w-4 h-4" /> Add Observation
      </button>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">Overall Grammarian Remarks</label>
        <textarea
          value={overall}
          onChange={e => setOverall(e.target.value)}
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button onClick={() => setSaved(true)} className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-colors ${saved ? 'bg-green-50 text-green-700 border border-green-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
        {saved ? <><CheckCircle className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save Grammarian Report</>}
      </button>
    </div>
  );
}

// ---- Ah Counter Section ----
function AhCounterSection() {
  const [records, setRecords] = useState(vahdaMeeting1AhCounterReport.records);
  const [overall, setOverall] = useState(vahdaMeeting1AhCounterReport.overallRemarks ?? '');
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600">
        <strong>Ah Counter:</strong> Aflah — Record pauses and stuck moments for each speaker.
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Speaker</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase">Pause Count</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {records.map((rec, i) => {
              const s = getStudent(rec.speakerStudentId);
              return (
                <tr key={rec.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <StudentAvatar name={s?.name ?? '?'} size="sm" />
                      <span className="font-medium text-slate-900">{s?.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => setRecords(prev => prev.map((r, idx) => idx === i ? { ...r, pauseCount: Math.max(0, r.pauseCount - 1) } : r))} className="w-7 h-7 rounded border border-gray-200 text-slate-600 hover:bg-slate-100">−</button>
                      <span className="w-8 text-center font-semibold text-slate-900">{rec.pauseCount}</span>
                      <button onClick={() => setRecords(prev => prev.map((r, idx) => idx === i ? { ...r, pauseCount: r.pauseCount + 1 } : r))} className="w-7 h-7 rounded border border-gray-200 text-slate-600 hover:bg-slate-100">+</button>
                    </div>
                  </td>
                  <td className="px-3 py-3 hidden sm:table-cell">
                    <input
                      type="text"
                      value={rec.notes ?? ''}
                      onChange={e => setRecords(prev => prev.map((r, idx) => idx === i ? { ...r, notes: e.target.value } : r))}
                      className="w-full border border-transparent hover:border-gray-200 focus:border-gray-200 rounded px-2 py-1 text-xs focus:outline-none"
                      placeholder="Optional note"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">Overall Remarks</label>
        <textarea value={overall} onChange={e => setOverall(e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <button onClick={() => setSaved(true)} className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-colors ${saved ? 'bg-green-50 text-green-700 border border-green-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
        {saved ? <><CheckCircle className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save Ah Counter Report</>}
      </button>
    </div>
  );
}

// ---- Quick suggestion chips for feedback ----
const QUICK_FEEDBACK_CHIPS = [
  'Vocal variety was expressive',
  'Strong opening hook',
  'Good stage presence',
  'Clear transitions between points',
  'Needs better eye contact',
  'Pace was a bit fast',
  'Mind the timer limit',
];

function getSpeakerEvalStatus(ev: { remarks: string; strengths: string[]; improvements: string[] } | undefined) {
  if (!ev) return 'pending';
  const hasRemarks = (ev.remarks ?? '').trim().length > 0;
  const hasStrengths = (ev.strengths ?? []).length > 0;
  const hasImprovements = (ev.improvements ?? []).length > 0;
  if (hasRemarks && hasStrengths && hasImprovements) return 'complete';
  if (hasRemarks || hasStrengths || hasImprovements) return 'in_progress';
  return 'pending';
}

// ---- Evaluator Section ----
const EVAL_ASSIGNMENTS = {
  evaluator1: { name: 'Evaluator 1', studentId: 'vahda-s02', speakers: ['vahda-zaid','vahda-hashir','vahda-qubaib','vahda-azeem'] },
  evaluator2: { name: 'Evaluator 2', studentId: 'vahda-s03', speakers: ['vahda-nafih','vahda-jalal','vahda-sinan','vahda-thufail'] },
  evaluator3: { name: 'Evaluator 3', studentId: 'vahda-s04', speakers: ['vahda-shahid','vahda-hilal','vahda-muhammed'] },
};

function EvaluatorSection({ section }: { section: string }) {
  const ev = EVAL_ASSIGNMENTS[section as keyof typeof EVAL_ASSIGNMENTS];
  const initEvals: Record<string, { remarks: string; strengths: string[]; improvements: string[] }> = {};
  ev.speakers.forEach(sid => {
    const existing = vahdaMeeting1Evaluations.find(e => e.evaluatorStudentId === ev.studentId && e.subjectStudentId === sid);
    initEvals[sid] = {
      remarks: existing?.remarks ?? '',
      strengths: existing?.strengthTagIds ?? [],
      improvements: existing?.improvementTagIds ?? [],
    };
  });

  const [evals, setEvals] = useState(initEvals);
  const [saved, setSaved] = useState(false);

  const evaluatorName = getStudent(ev.studentId)?.name ?? ev.name;

  const completedCount = ev.speakers.filter(sid => getSpeakerEvalStatus(evals[sid]) === 'complete').length;
  const progressPercent = Math.round((completedCount / ev.speakers.length) * 100);

  return (
    <div className="space-y-6">
      {/* ── Evaluator Workspace Hero Banner ── */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-xs">
                  {ev.name}
                </span>
                <span className="text-xs text-indigo-200">Evaluator: <strong>{evaluatorName}</strong></span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold mt-1 text-white">
                Assigned Speaker Evaluations
              </h2>
              <p className="text-xs text-indigo-200/90 mt-0.5">
                Review each assigned speaker with personalized remarks and observation tags.
              </p>
            </div>

            {/* Quick jump to speakers */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {ev.speakers.map((sid, idx) => {
                const s = getStudent(sid);
                const status = getSpeakerEvalStatus(evals[sid]);
                return (
                  <button
                    key={sid}
                    type="button"
                    onClick={() => {
                      document.getElementById(`speaker-${sid}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      status === 'complete'
                        ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 hover:bg-emerald-500/40'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <span>{s?.name?.split(' ')[0]}</span>
                    {status === 'complete' && <Check className="w-3 h-3 text-emerald-300 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress bar */}
          <div className="pt-1">
            <div className="flex items-center justify-between text-xs text-indigo-200 mb-1.5 font-medium">
              <span>Evaluation Progress</span>
              <span>{completedCount} of {ev.speakers.length} Completed ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2 bg-indigo-950/60 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-300"
                style={{ width: `${Math.max(5, progressPercent)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Speaker Cards ── */}
      {ev.speakers.map((sid, idx) => {
        const s = getStudent(sid);
        const status = getSpeakerEvalStatus(evals[sid]);

        return (
          <div
            key={sid}
            id={`speaker-${sid}`}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 p-5 sm:p-7 space-y-6 scroll-mt-20"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <StudentAvatar name={s?.name ?? '?'} size="md" className="ring-2 ring-indigo-500/20" />
                  {status === 'complete' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold shadow-xs">
                      ✓
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">{s?.name}</h3>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/70 rounded-full px-2.5 py-0.5">
                      Speaker #{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Admission No: {s?.admissionNo ?? '—'}</p>
                </div>
              </div>

              {/* Status Badge */}
              {status === 'complete' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Evaluation Ready
                </span>
              ) : status === 'in_progress' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  In Progress
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                  Pending Feedback
                </span>
              )}
            </div>

            {/* Remarks Section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <MessageSquareQuote className="w-4 h-4 text-indigo-600" />
                  Personalized Evaluator Remarks
                </label>
                <span className="text-[11px] text-slate-400">
                  {evals[sid]?.remarks?.length ?? 0} characters
                </span>
              </div>

              {/* Quick Suggestion Chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Quick Suggestions:</span>
                {QUICK_FEEDBACK_CHIPS.map(chip => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      const curr = evals[sid]?.remarks ?? '';
                      const next = curr ? `${curr.trim().replace(/\.$/, '')}. ${chip}.` : `${chip}.`;
                      setEvals(prev => ({ ...prev, [sid]: { ...prev[sid], remarks: next } }));
                    }}
                    className="text-[11px] font-medium text-slate-600 hover:text-indigo-700 bg-slate-100 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-300 rounded-lg px-2 py-0.5 transition-all duration-150 active:scale-95"
                  >
                    + {chip}
                  </button>
                ))}
              </div>

              <textarea
                value={evals[sid]?.remarks ?? ''}
                onChange={e => setEvals(prev => ({ ...prev, [sid]: { ...prev[sid], remarks: e.target.value } }))}
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 bg-slate-50/40 focus:bg-white transition-all shadow-2xs resize-y"
                placeholder="Write constructive observations, highlights, and growth advice for this speaker..."
              />
            </div>

            {/* Observation Tags */}
            <ObservationTagSelector
              selectedStrengths={evals[sid]?.strengths ?? []}
              selectedImprovements={evals[sid]?.improvements ?? []}
              onStrengthToggle={id => setEvals(prev => ({
                ...prev, [sid]: {
                  ...prev[sid],
                  strengths: prev[sid].strengths.includes(id) ? prev[sid].strengths.filter(x => x !== id) : [...prev[sid].strengths, id]
                }
              }))}
              onImprovementToggle={id => setEvals(prev => ({
                ...prev, [sid]: {
                  ...prev[sid],
                  improvements: prev[sid].improvements.includes(id) ? prev[sid].improvements.filter(x => x !== id) : [...prev[sid].improvements, id]
                }
              }))}
              onClearStrengths={() => setEvals(prev => ({
                ...prev, [sid]: { ...prev[sid], strengths: [] }
              }))}
              onClearImprovements={() => setEvals(prev => ({
                ...prev, [sid]: { ...prev[sid], improvements: [] }
              }))}
            />
          </div>
        );
      })}

      {/* ── Sticky Bottom Action Bar ── */}
      <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
            completedCount === ev.speakers.length ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
          }`}>
            {completedCount === ev.speakers.length ? '✓' : `${completedCount}/${ev.speakers.length}`}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">
              {completedCount === ev.speakers.length ? 'All Speaker Evaluations Ready!' : `${ev.speakers.length - completedCount} Speaker(s) Pending Completion`}
            </p>
            <p className="text-xs text-slate-500">
              Save your evaluations to include them in the meeting final report
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSaved(true)}
          className={`flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 ${
            saved
              ? 'bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-400'
              : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white shadow-indigo-500/25'
          }`}
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Evaluations Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Submit Evaluations
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ---- General Evaluator Section ----
const GE_GROUPS = {
  'Prepared Speeches': ['vahda-zaid','vahda-hashir','vahda-nafih','vahda-jalal'],
  'Table Topics': ['vahda-qubaib','vahda-azeem','vahda-sinan','vahda-thufail','vahda-shahid','vahda-hilal'],
  'Ice Breaking Speech': ['vahda-muhammed'],
};

function GeneralEvaluatorSection() {
  const [remarks, setRemarks] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    Object.values(GE_GROUPS).flat().forEach(sid => {
      const ev = vahdaMeeting1Evaluations.find(e => e.evaluatorStudentId === 'vahda-hisham' && e.subjectStudentId === sid);
      init[sid] = ev?.remarks ?? '';
    });
    return init;
  });
  const [strengths, setStrengths] = useState<Record<string, string[]>>({});
  const [improvements, setImprovements] = useState<Record<string, string[]>>({});
  const [saved, setSaved] = useState(false);

  const allSids = Object.values(GE_GROUPS).flat();
  const completedCount = allSids.filter(sid => {
    const r = (remarks[sid] ?? '').trim().length > 0;
    const s = (strengths[sid] ?? []).length > 0;
    const i = (improvements[sid] ?? []).length > 0;
    return r && s && i;
  }).length;
  const progressPercent = Math.round((completedCount / allSids.length) * 100);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-xs">
                General Evaluator
              </span>
              <span className="text-xs text-indigo-200">Role Holder: <strong>Hisham</strong></span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold mt-1 text-white">
              Overall Meeting & Speaker Evaluation
            </h2>
            <p className="text-xs text-indigo-200/90 mt-0.5">
              Evaluate speakers across Prepared Speeches, Table Topics, and Ice Breaking sessions.
            </p>
          </div>

          {/* Progress bar */}
          <div className="pt-1">
            <div className="flex items-center justify-between text-xs text-indigo-200 mb-1.5 font-medium">
              <span>Overall Evaluation Progress</span>
              <span>{completedCount} of {allSids.length} Completed ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2 bg-indigo-950/60 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-300"
                style={{ width: `${Math.max(5, progressPercent)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {Object.entries(GE_GROUPS).map(([group, sids]) => (
        <div key={group} className="space-y-4">
          <div className="flex items-center gap-2 pt-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{group}</h3>
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {sids.length} speakers
            </span>
          </div>

          <div className="space-y-4">
            {sids.map((sid, idx) => {
              const s = getStudent(sid);
              const hasRemarks = (remarks[sid] ?? '').trim().length > 0;
              const hasStrengths = (strengths[sid] ?? []).length > 0;
              const hasImprovements = (improvements[sid] ?? []).length > 0;
              const isComplete = hasRemarks && hasStrengths && hasImprovements;
              const isInProgress = hasRemarks || hasStrengths || hasImprovements;

              return (
                <div
                  key={sid}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 p-5 sm:p-7 space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <StudentAvatar name={s?.name ?? '?'} size="md" className="ring-2 ring-indigo-500/20" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-base">{s?.name}</h4>
                          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">
                            {group} #{idx + 1}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">Admission No: {s?.admissionNo ?? '—'}</p>
                      </div>
                    </div>

                    {isComplete ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Complete
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        In Progress
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                        Pending
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        <MessageSquareQuote className="w-4 h-4 text-indigo-600" />
                        General Evaluator Remarks
                      </label>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Suggestions:</span>
                      {QUICK_FEEDBACK_CHIPS.slice(0, 4).map(chip => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => {
                            const curr = remarks[sid] ?? '';
                            const next = curr ? `${curr.trim().replace(/\.$/, '')}. ${chip}.` : `${chip}.`;
                            setRemarks(prev => ({ ...prev, [sid]: next }));
                          }}
                          className="text-[11px] font-medium text-slate-600 hover:text-indigo-700 bg-slate-100 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-300 rounded-lg px-2 py-0.5 transition-all duration-150 active:scale-95"
                        >
                          + {chip}
                        </button>
                      ))}
                    </div>

                    <textarea
                      value={remarks[sid] ?? ''}
                      onChange={e => setRemarks(prev => ({ ...prev, [sid]: e.target.value }))}
                      rows={2}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 bg-slate-50/40 focus:bg-white transition-all shadow-2xs resize-y"
                      placeholder="Write general evaluator remarks for this speaker..."
                    />
                  </div>

                  <ObservationTagSelector
                    selectedStrengths={strengths[sid] ?? []}
                    selectedImprovements={improvements[sid] ?? []}
                    onStrengthToggle={id => setStrengths(prev => ({ ...prev, [sid]: prev[sid]?.includes(id) ? prev[sid].filter(x => x !== id) : [...(prev[sid] ?? []), id] }))}
                    onImprovementToggle={id => setImprovements(prev => ({ ...prev, [sid]: prev[sid]?.includes(id) ? prev[sid].filter(x => x !== id) : [...(prev[sid] ?? []), id] }))}
                    onClearStrengths={() => setStrengths(prev => ({ ...prev, [sid]: [] }))}
                    onClearImprovements={() => setImprovements(prev => ({ ...prev, [sid]: [] }))}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
            completedCount === allSids.length ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
          }`}>
            {completedCount === allSids.length ? '✓' : `${completedCount}/${allSids.length}`}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">
              {completedCount === allSids.length ? 'All GE Evaluations Ready!' : `${allSids.length - completedCount} Speaker(s) Pending`}
            </p>
            <p className="text-xs text-slate-500">Save general evaluator feedback for final report</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSaved(true)}
          className={`flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 ${
            saved
              ? 'bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-400'
              : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white shadow-indigo-500/25'
          }`}
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> GE Report Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Submit GE Report
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ---- Timer Section ----
function TimerSection() {
  const [entries, setEntries] = useState(vahdaMeeting1TimerReport.entries);
  const [start, setStart] = useState(vahdaMeeting1TimerReport.meetingStartTime ?? '');
  const [end, setEnd] = useState(vahdaMeeting1TimerReport.meetingEndTime ?? '');
  const [saved, setSaved] = useState(false);

  const RESULT_COLORS: Record<string, string> = {
    on_time: 'text-green-700 bg-green-50 border-green-200',
    over_time: 'text-red-600 bg-red-50 border-red-200',
    under_time: 'text-amber-700 bg-amber-50 border-amber-200',
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600">
        <strong>Timer:</strong> Hafiz ST — Record actual times for all activities.
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Meeting Start Time</label>
          <input type="time" value={start} onChange={e => setStart(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Meeting End Time</label>
          <input type="time" value={end} onChange={e => setEnd(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        {start && end && (
          <div className="flex items-end pb-2">
            <p className="text-sm text-slate-700">Total: <strong className="text-slate-900">{end > start ? `${Math.round((new Date(`2000-01-01T${end}`).getTime() - new Date(`2000-01-01T${start}`).getTime()) / 60000)} min` : '—'}</strong></p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Activity</th>
                <th className="text-center px-2 py-3 text-xs font-semibold text-slate-500 uppercase">Allowed</th>
                <th className="text-center px-2 py-3 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Start</th>
                <th className="text-center px-2 py-3 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">End</th>
                <th className="text-center px-2 py-3 text-xs font-semibold text-slate-500 uppercase">Duration</th>
                <th className="text-center px-2 py-3 text-xs font-semibold text-slate-500 uppercase">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {entries.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-2.5">
                    <p className="text-sm text-slate-900 font-medium">{e.activityLabel}</p>
                  </td>
                  <td className="px-2 py-2.5 text-center text-xs text-slate-500">{e.allowedMinutes}m</td>
                  <td className="px-2 py-2.5 text-center hidden sm:table-cell">
                    <input type="time" defaultValue={e.actualStartTime} className="text-xs border border-gray-100 rounded px-1 py-0.5 w-20 focus:outline-none focus:border-indigo-300" />
                  </td>
                  <td className="px-2 py-2.5 text-center hidden sm:table-cell">
                    <input type="time" defaultValue={e.actualEndTime} className="text-xs border border-gray-100 rounded px-1 py-0.5 w-20 focus:outline-none focus:border-indigo-300" />
                  </td>
                  <td className="px-2 py-2.5 text-center text-sm font-medium text-slate-700">{e.actualDurationMinutes}m</td>
                  <td className="px-2 py-2.5 text-center">
                    {e.timingResult && (
                      <span className={`text-xs font-medium border rounded-md px-2 py-0.5 ${RESULT_COLORS[e.timingResult]}`}>
                        {getTimingResultLabel(e.timingResult)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button onClick={() => setSaved(true)} className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-colors ${saved ? 'bg-green-50 text-green-700 border border-green-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
        {saved ? <><CheckCircle className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save Timer Report</>}
      </button>
    </div>
  );
}

// ---- Awards Section ----
const AWARD_WINNERS: Record<string, string> = {
  star_of_the_week: 'vahda-hafizst',
  best_evaluator: 'vahda-hisham',
  best_speaker: 'vahda-nafih',
  best_tt_speaker: 'vahda-sinan',
};

function AwardsSection() {
  const [winners, setWinners] = useState(AWARD_WINNERS);
  const [saved, setSaved] = useState(false);

  const AWARD_TYPES = ['star_of_the_week','best_evaluator','best_speaker','best_tt_speaker'] as const;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">Select the award winners for this meeting.</p>
      {AWARD_TYPES.map(type => (
        <div key={type} className="bg-white rounded-lg border border-gray-200 p-4">
          <label className="text-sm font-semibold text-slate-700 mb-2 block">{getAwardTypeLabel(type)}</label>
          <select
            value={winners[type] ?? ''}
            onChange={e => setWinners(prev => ({ ...prev, [type]: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select student...</option>
            {vahdaStudents.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          {winners[type] && (
            <div className="flex items-center gap-2 mt-2">
              <StudentAvatar name={getStudent(winners[type])?.name ?? '?'} size="sm" />
              <span className="text-sm text-slate-700">{getStudent(winners[type])?.name}</span>
            </div>
          )}
        </div>
      ))}

      <button onClick={() => setSaved(true)} className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-colors ${saved ? 'bg-green-50 text-green-700 border border-green-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
        {saved ? <><CheckCircle className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save Awards</>}
      </button>
    </div>
  );
}

// ---- Main page ----
const SECTION_META: Record<string, { label: string; description: string }> = {
  attendance:       { label: 'Attendance', description: 'Mark presence for all 35 VAHDA students' },
  grammarian:       { label: 'Grammarian Report', description: 'Record grammar observations and corrections' },
  ah_counter:       { label: 'Ah Counter Report', description: 'Record pause counts for each speaker' },
  evaluator1:       { label: 'Evaluator 1 Report', description: 'Evaluate assigned speakers: Zaid, Hashir, Qubaib, Azeem' },
  evaluator2:       { label: 'Evaluator 2 Report', description: 'Evaluate assigned speakers: Nafih, Jalal, Sinan, Thufail' },
  evaluator3:       { label: 'Evaluator 3 Report', description: 'Evaluate assigned speakers: Shahid, Hilal, Muhammed' },
  general_evaluator:{ label: 'General Evaluator Report', description: 'Evaluate all speakers across the full program' },
  timer:            { label: 'Timer Report', description: 'Record actual start/end times for all activities' },
  awards:           { label: 'Awards', description: 'Select award winners for this meeting' },
  gallery:          { label: 'Gallery', description: 'Upload photos from this meeting' },
};

export default function ReportSectionPage() {
  const params = useParams();
  const meetingId = params.id as string;
  const section = params.section as string;
  const router = useRouter();

  const meta = SECTION_META[section];

  // Nil state for this specific section
  const [isNil, setIsNil] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`meeting-${meetingId}-sections`);
        if (saved) {
          const list = JSON.parse(saved);
          const found = list.find((s: any) => s.key === section);
          return found?.status === 'nil';
        }
      } catch {}
    }
    return false;
  });

  const toggleCurrentNil = () => {
    const nextNil = !isNil;
    setIsNil(nextNil);
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`meeting-${meetingId}-sections`);
        const list = saved ? JSON.parse(saved) : vahdaMeeting1Report.sections;
        const nextList = list.map((s: any) => {
          if (s.key === section) {
            return {
              ...s,
              status: nextNil ? 'nil' : 'missing',
              nilReason: nextNil ? 'Role was not conducted in this meeting' : undefined,
            };
          }
          return s;
        });
        localStorage.setItem(`meeting-${meetingId}-sections`, JSON.stringify(nextList));
      } catch {}
    }
  };

  const renderSection = () => {
    switch (section) {
      case 'attendance': return <AttendanceSection meetingId={meetingId} />;
      case 'grammarian': return <GrammarianSection />;
      case 'ah_counter': return <AhCounterSection />;
      case 'evaluator1': return <EvaluatorSection section="evaluator1" />;
      case 'evaluator2': return <EvaluatorSection section="evaluator2" />;
      case 'evaluator3': return <EvaluatorSection section="evaluator3" />;
      case 'general_evaluator': return <GeneralEvaluatorSection />;
      case 'timer': return <TimerSection />;
      case 'awards': return <AwardsSection />;
      case 'gallery': return (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-slate-500">Photo gallery upload coming soon. This section is optional.</p>
        </div>
      );
      default: return <p className="text-slate-500">Unknown section: {section}</p>;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-5">
      <Link href={`/admin/meetings/${meetingId}/enter-report`} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Report Entry
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{meta?.label ?? section}</h1>
          <p className="text-sm text-slate-500 mt-0.5">{meta?.description}</p>
          <p className="text-xs text-slate-400 mt-1">VAHDA · Meeting #01 · 18 September 2026</p>
        </div>

        {isNil ? (
          <span className="self-start sm:self-auto px-3 py-1 bg-slate-100 border border-slate-300 rounded-full text-xs font-semibold text-slate-600">
            • Marked as Nil (Not Held)
          </span>
        ) : (
          <button
            type="button"
            onClick={toggleCurrentNil}
            className="self-start sm:self-auto px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold transition-all shadow-2xs flex items-center gap-1.5"
            title="Mark this role as Nil if not conducted in this meeting"
          >
            <Info className="w-3.5 h-3.5 text-amber-600" />
            No {meta?.label}? Mark as Nil
          </button>
        )}
      </div>

      {/* Nil / Role Not Held Banner */}
      {isNil && (
        <div className="p-4 bg-slate-100 border border-slate-300 rounded-xl flex items-center justify-between gap-3 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <span>
              This section is marked as <strong>Nil / Not Conducted</strong> for this meeting. It will satisfy the checklist and not block finalization.
            </span>
          </div>
          <button
            type="button"
            onClick={toggleCurrentNil}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors flex-shrink-0 shadow-xs"
          >
            Undo Nil &amp; Fill Form
          </button>
        </div>
      )}

      {/* If marked Nil, optionally collapse or show section with low opacity */}
      <div className={isNil ? 'opacity-40 pointer-events-none filter grayscale-[0.3]' : ''}>
        {renderSection()}
      </div>
    </div>
  );
}
