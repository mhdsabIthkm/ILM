'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Lock, ChevronRight } from 'lucide-react';
import { vahdaMeeting1Report } from '@/lib/mock-data/meetings';
import { StatusBadge } from '@/components/ui/status-badge';

export default function FinalizePage() {
  const params = useParams();
  const meetingId = params.id as string;

  const [sections, setSections] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`meeting-${meetingId}-sections`);
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return vahdaMeeting1Report.sections;
  });

  const [submitted, setSubmitted] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(`meeting-${meetingId}-finalized`) === 'true';
      } catch {}
    }
    return false;
  });

  const handleFinalizeSubmit = () => {
    if (!allRequiredDone) return;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`meeting-${meetingId}-finalized`, 'true');
        localStorage.setItem(`meeting-${meetingId}-status`, 'review');
      } catch {}
    }
    setSubmitted(true);
  };

  const toggleNil = (key: string) => {
    const next = sections.map((s: any) => {
      if (s.key === key) {
        if (s.status === 'nil') {
          return { ...s, status: 'missing', nilReason: undefined };
        } else {
          return { ...s, status: 'nil', nilReason: 'Role was not conducted in this meeting' };
        }
      }
      return s;
    });
    setSections(next);
    try {
      localStorage.setItem(`meeting-${meetingId}-sections`, JSON.stringify(next));
    } catch {}
  };

  const requiredSections = sections.filter((s: any) => s.required);
  const requiredComplete = requiredSections.filter((s: any) => s.status === 'complete' || s.status === 'nil').length;
  const nilCount = sections.filter((s: any) => s.status === 'nil').length;
  const allRequiredDone = requiredComplete === requiredSections.length;

  const progressPct = Math.round((requiredComplete / requiredSections.length) * 100);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-5">
      <Link href={`/admin/meetings/${meetingId}`} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Meeting
      </Link>

      <div>
        <h1 className="text-xl font-bold text-slate-900">Report Finalization</h1>
        <p className="text-sm text-slate-500 mt-0.5">VAHDA · Meeting #01 · 18 September 2026</p>
      </div>

      {/* Progress overview */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-900">Completion Status</h2>
          <span className={`text-sm font-semibold ${allRequiredDone ? 'text-green-700' : 'text-amber-700'}`}>
            {requiredComplete} of {requiredSections.length} required sections complete
            {nilCount > 0 && <span className="text-slate-500 font-normal"> ({nilCount} marked Nil)</span>}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className={`h-2 rounded-full transition-all ${allRequiredDone ? 'bg-green-500' : 'bg-indigo-500'}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-xs text-slate-500">{progressPct}% complete</p>
      </div>

      {/* Section checklist */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-slate-900">Section Checklist</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {sections.map((s: any) => (
            <div key={s.key} className="flex items-center gap-3 px-5 py-3">
              <div className="flex-shrink-0">
                {s.status === 'complete' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : s.status === 'nil' ? (
                  <CheckCircle className="w-5 h-5 text-slate-400" />
                ) : s.status === 'missing' ? (
                  <XCircle className="w-5 h-5 text-red-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{s.label}</p>
                {!s.required && <p className="text-xs text-slate-400">Optional</p>}
                {s.status === 'nil' && <p className="text-[11px] text-slate-500 italic">Role not conducted in this meeting</p>}
              </div>

              {s.status === 'missing' && (
                <button
                  type="button"
                  onClick={() => toggleNil(s.key)}
                  className="text-xs px-2.5 py-1 rounded-md border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold"
                >
                  Mark as Nil
                </button>
              )}

              {s.status === 'nil' && (
                <button
                  type="button"
                  onClick={() => toggleNil(s.key)}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Undo Nil
                </button>
              )}

              <StatusBadge status={s.status} />
              <Link href={`/admin/meetings/${meetingId}/report/${s.key}`} className="text-xs text-indigo-600 hover:underline flex-shrink-0">
                {s.status === 'complete' ? 'Edit' : s.status === 'nil' ? 'View' : 'Fill'}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Missing section warning */}
      {!allRequiredDone && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-sm text-amber-800">
            <p className="font-semibold">Some required sections are missing</p>
            <p className="text-xs text-amber-700 mt-0.5">
              If a role was not conducted in this meeting, you can click <strong>&quot;Mark as Nil&quot;</strong> above to account for it without blocking submission.
            </p>
          </div>
        </div>
      )}

      {/* Finalizer actions */}
      {!submitted ? (
        <div className="space-y-3">
          <button
            onClick={handleFinalizeSubmit}
            disabled={!allRequiredDone}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-colors ${
              allRequiredDone
                ? 'bg-slate-800 text-white hover:bg-slate-900 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Submit to Teacher for Review →
          </button>
          <Link
            href={`/admin/meetings/${meetingId}/final-report`}
            className="block text-center w-full py-2.5 border border-gray-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Preview Final Report
          </Link>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center space-y-3">
          <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />
          <div>
            <p className="font-semibold text-green-800">Report Submitted!</p>
            <p className="text-sm text-green-700 mt-1">The meeting report has been sent to the teacher for review. Status: <strong>Teacher Review</strong></p>
          </div>
          <Link href={`/admin/meetings/${meetingId}`} className="inline-block text-sm text-indigo-600 hover:underline">
            ← Back to Meeting
          </Link>
        </div>
      )}
    </div>
  );
}
