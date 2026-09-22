'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Printer, Download, ArrowLeft } from 'lucide-react';
import { vahdaMeeting1, vahdaMeeting1PreparedSpeeches, vahdaMeeting1TableTopics, vahdaMeeting1IceBreaking, vahdaMeeting1Evaluations, vahdaMeeting1GrammarianReport, vahdaMeeting1AhCounterReport, vahdaMeeting1TimerReport, vahdaMeeting1Awards, vahdaMeeting1Attendance, vahdaMeeting1Roles } from '@/lib/mock-data/meetings';
import { getStudent } from '@/lib/mock-data/students';
import { getRoleById } from '@/lib/mock-data/roles';
import { getAwardTypeLabel, getTimingResultLabel, formatDate } from '@/lib/utils';
import { observationTags } from '@/lib/mock-data/observation-tags';

function getTagLabel(id: string) { return observationTags.find(t => t.id === id)?.label ?? id; }
function sName(id: string) { return getStudent(id)?.name ?? id; }

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 print:mb-6 break-inside-avoid print-break-inside-avoid">
      <h2 className="text-base font-bold text-slate-900 border-b-2 border-indigo-600 pb-1 mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function FinalReportPage() {
  const params = useParams();
  const [printTimestamp, setPrintTimestamp] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setPrintTimestamp(`${dateStr}, ${timeStr}`);
  }, []);

  const presentCount = vahdaMeeting1Attendance.filter(a => a.status === 'present').length;
  const absentCount = vahdaMeeting1Attendance.filter(a => a.status === 'absent').length;
  const excusedCount = vahdaMeeting1Attendance.filter(a => a.status === 'excused').length;

  const getRoleStudent = (roleId: string) => {
    const ra = vahdaMeeting1Roles.find(r => r.roleId === roleId);
    return ra ? sName(ra.studentId) : '—';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const originalTitle = document.title;
    document.title = `MDIA_ILM_Meeting_01_Report_VAHDA_${vahdaMeeting1.date}`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  return (
    <div>
      {/* No-print action bar */}
      <div className="no-print bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3 print:hidden">
        <Link href={`/admin/meetings/${params.id}`} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 font-semibold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Meeting
        </Link>
        <div className="flex-1" />
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-3.5 py-2 text-sm border border-gray-200 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer transition-colors shadow-2xs"
        >
          <Printer className="w-4 h-4 text-slate-600" /> Print
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-1.5 px-3.5 py-2 text-sm bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold cursor-pointer transition-colors shadow-xs"
        >
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      {/* Printable report */}
      <div className="max-w-3xl mx-auto p-8 bg-white print:p-0 print:max-w-none print:w-full print:min-h-0" id="print-report">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-slate-200">
          <p className="text-xs sm:text-sm font-bold tracking-widest text-slate-500 uppercase mb-1">
            MDIA ILM — Malik Deenar Islamic Academy
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Integrated Learning Program
          </h1>
          <div className="mt-3">
            <span className="text-xl font-black text-indigo-700">VAHDA</span>
            <span className="text-slate-400 mx-2 font-bold">·</span>
            <span className="text-lg font-bold text-slate-800">ILM Meeting #01</span>
          </div>
          <p className="mt-2 text-base font-bold text-slate-800">{vahdaMeeting1.theme.english}</p>
          <p className="text-sm text-slate-500 ml-text">{vahdaMeeting1.theme.malayalam}</p>
          <div className="flex items-center justify-center gap-3 mt-2 text-xs text-slate-500 font-medium flex-wrap">
            <span>Meeting Date: {formatDate(vahdaMeeting1.date)}</span>
            <span>·</span>
            <span>Duration: {vahdaMeeting1.startTime} – {vahdaMeeting1.endTime}</span>
          </div>
          {/* Exact Print Date & Timestamp Bar */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono flex-wrap gap-2">
            <span className="font-semibold text-slate-600">Official Academy Meeting Record</span>
            <span>Printed / Exported: {printTimestamp || '22 September 2026, 04:30 PM'}</span>
          </div>
        </div>

        {/* Attendance */}
        <Section title="Attendance Summary">
          <div className="flex gap-6 text-sm">
            <div><strong className="text-slate-900">{presentCount}</strong> <span className="text-slate-500">Present</span></div>
            <div><strong className="text-slate-900">{absentCount}</strong> <span className="text-slate-500">Absent</span></div>
            <div><strong className="text-slate-900">{excusedCount}</strong> <span className="text-slate-500">Excused</span></div>
            <div><strong className="text-slate-900">35</strong> <span className="text-slate-500">Total</span></div>
          </div>
        </Section>

        {/* Program Roles */}
        <Section title="Program Roles">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {[
                ["ILM President", getRoleStudent('role-president')],
                ["QIRA'TH", getRoleStudent('role-qirath')],
                ["Dua", getRoleStudent('role-dua')],
                ["Welcome Speech", getRoleStudent('role-welcome')],
                ["Inauguration", getRoleStudent('role-inauguration')],
                ["LMOD (Learning Master of the Day)", getRoleStudent('role-lmod')],
                ["TT Master (Table Topic Master)", getRoleStudent('role-tt-master')],
                ["Ice Breaking Speaker", getRoleStudent('role-ice-breaking')],
                ["Grammarian", getRoleStudent('role-grammarian')],
                ["Ah Counter", getRoleStudent('role-ah-counter')],
                ["Evaluator 1", getRoleStudent('role-evaluator1')],
                ["Evaluator 2", getRoleStudent('role-evaluator2')],
                ["Evaluator 3", getRoleStudent('role-evaluator3')],
                ["General Evaluator", getRoleStudent('role-general-evaluator')],
                ["Timer", getRoleStudent('role-timer')],
                ["Thank You Speech", getRoleStudent('role-thankyou')],
              ].map(([role, student]) => (
                <tr key={role} className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-slate-500 w-56">{role}</td>
                  <td className="py-2 font-medium text-slate-900">{student}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* Prepared Speeches */}
        <Section title="Prepared Speeches">
          <div className="space-y-4">
            {vahdaMeeting1PreparedSpeeches.map((ps, i) => (
              <div key={ps.id} className="flex gap-3">
                <span className="text-slate-400 text-sm w-5 flex-shrink-0">{i + 1}.</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{sName(ps.studentId)}</p>
                  <p className="text-sm text-slate-700">{ps.subject.english}</p>
                  <p className="text-xs text-slate-400 ml-text">{ps.subject.malayalam}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Table Topics */}
        <Section title="Table Topics">
          <p className="text-sm text-slate-600 mb-3"><strong>TT Master:</strong> {getRoleStudent('role-tt-master')}</p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-1.5 text-xs text-slate-500 font-semibold w-8">#</th>
                <th className="text-left py-1.5 text-xs text-slate-500 font-semibold">Speaker</th>
                <th className="text-left py-1.5 text-xs text-slate-500 font-semibold">Topic</th>
              </tr>
            </thead>
            <tbody>
              {vahdaMeeting1TableTopics.map((tt, i) => (
                <tr key={tt.id} className="border-b border-gray-100">
                  <td className="py-1.5 text-slate-400">{i + 1}</td>
                  <td className="py-1.5 font-medium text-slate-900">{sName(tt.studentId)}</td>
                  <td className="py-1.5 text-slate-600">{tt.topic.english}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* Ice Breaking */}
        <Section title="Ice Breaking Speech">
          <p className="text-sm text-slate-900"><strong>Speaker:</strong> {sName(vahdaMeeting1IceBreaking.studentId)}</p>
          <p className="text-sm text-slate-700"><strong>Topic:</strong> {vahdaMeeting1IceBreaking.topic?.english}</p>
        </Section>

        {/* Evaluator Reports */}
        <Section title="Evaluator Reports">
          {vahdaMeeting1Evaluations.map(ev => (
            <div key={ev.id} className="mb-4 pl-3 border-l-2 border-indigo-200">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                {ev.evaluatorRole === 'evaluator1' ? 'Evaluator 1' : ev.evaluatorRole === 'evaluator2' ? 'Evaluator 2' : ev.evaluatorRole === 'evaluator3' ? 'Evaluator 3' : 'GE'} → {sName(ev.subjectStudentId)}
              </p>
              <p className="text-sm text-slate-700 mt-1">{ev.remarks}</p>
              {ev.strengthTagIds.length > 0 && (
                <p className="text-xs text-green-700 mt-0.5">Strengths: {ev.strengthTagIds.map(getTagLabel).join(', ')}</p>
              )}
              {ev.improvementTagIds.length > 0 && (
                <p className="text-xs text-amber-700 mt-0.5">Focus: {ev.improvementTagIds.map(getTagLabel).join(', ')}</p>
              )}
            </div>
          ))}
        </Section>

        {/* Grammarian */}
        <Section title="Grammarian Report">
          <p className="text-sm text-slate-600 mb-3"><strong>Grammarian:</strong> {sName(vahdaMeeting1GrammarianReport.grammarianStudentId)}</p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-1.5 text-xs text-slate-500 font-semibold">Speaker</th>
                <th className="text-left py-1.5 text-xs text-slate-500 font-semibold">Error</th>
                <th className="text-left py-1.5 text-xs text-slate-500 font-semibold">Correction</th>
              </tr>
            </thead>
            <tbody>
              {vahdaMeeting1GrammarianReport.observations.map(obs => (
                <tr key={obs.id} className="border-b border-gray-100">
                  <td className="py-1.5 font-medium text-slate-900">{sName(obs.speakerStudentId)}</td>
                  <td className="py-1.5 text-red-600 italic">"{obs.whatWasSaid}"</td>
                  <td className="py-1.5 text-green-700">"{obs.suggestedCorrection}"</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-slate-700 mt-3 italic">"{vahdaMeeting1GrammarianReport.overallRemarks}"</p>
        </Section>

        {/* Ah Counter */}
        <Section title="Ah Counter Report">
          <p className="text-sm text-slate-600 mb-3"><strong>Ah Counter:</strong> {sName(vahdaMeeting1AhCounterReport.ahCounterStudentId)}</p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-1.5 text-xs text-slate-500 font-semibold">Speaker</th>
                <th className="text-center py-1.5 text-xs text-slate-500 font-semibold">Pause Count</th>
                <th className="text-left py-1.5 text-xs text-slate-500 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {vahdaMeeting1AhCounterReport.records.map(rec => (
                <tr key={rec.id} className="border-b border-gray-100">
                  <td className="py-1.5 font-medium text-slate-900">{sName(rec.speakerStudentId)}</td>
                  <td className="py-1.5 text-center font-semibold text-slate-700">{rec.pauseCount}</td>
                  <td className="py-1.5 text-slate-500">{rec.notes ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* Timer */}
        <Section title="Timer Report">
          <p className="text-sm text-slate-600 mb-3"><strong>Timer:</strong> {sName(vahdaMeeting1TimerReport.timerStudentId)} · Meeting: {vahdaMeeting1TimerReport.meetingStartTime} – {vahdaMeeting1TimerReport.meetingEndTime}</p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-1.5 text-xs text-slate-500 font-semibold">Activity</th>
                <th className="text-center py-1.5 text-xs text-slate-500 font-semibold">Allowed</th>
                <th className="text-center py-1.5 text-xs text-slate-500 font-semibold">Actual</th>
                <th className="text-left py-1.5 text-xs text-slate-500 font-semibold">Result</th>
              </tr>
            </thead>
            <tbody>
              {vahdaMeeting1TimerReport.entries.map(e => (
                <tr key={e.id} className="border-b border-gray-100">
                  <td className="py-1.5 text-slate-900">{e.activityLabel}</td>
                  <td className="py-1.5 text-center text-slate-500">{e.allowedMinutes}m</td>
                  <td className="py-1.5 text-center font-medium text-slate-900">{e.actualDurationMinutes}m</td>
                  <td className={`py-1.5 text-xs font-medium ${e.timingResult === 'on_time' ? 'text-green-700' : e.timingResult === 'over_time' ? 'text-red-600' : 'text-amber-700'}`}>
                    {getTimingResultLabel(e.timingResult)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* Awards */}
        <Section title="Awards">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {vahdaMeeting1Awards.map(aw => (
                <tr key={aw.id} className="border-b border-gray-100">
                  <td className="py-2 text-slate-500 w-48">{getAwardTypeLabel(aw.type)}</td>
                  <td className="py-2 font-semibold text-slate-900">{aw.studentId ? sName(aw.studentId) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-slate-500 break-inside-avoid print-break-inside-avoid">
          <p className="font-semibold text-slate-700">MDIA ILM — Malik Deenar Islamic Academy · Integrated Learning Program</p>
          <p className="mt-1 font-mono text-[11px] text-slate-400">Official Academy Record · Printed / Exported on {printTimestamp || '22 September 2026, 04:30 PM'}</p>
        </div>
      </div>
    </div>
  );
}
