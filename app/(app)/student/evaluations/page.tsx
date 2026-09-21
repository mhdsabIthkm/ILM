'use client';

import { vahdaMeeting1Evaluations } from '@/lib/mock-data/meetings';
import { ObservationBadge } from '@/components/ui/observation-badge';
import { Sparkles, MessageSquareQuote, TrendingUp, ArrowUpRight, Calendar, Award } from 'lucide-react';

const myEvals = vahdaMeeting1Evaluations.filter(e => e.subjectStudentId === 'vahda-nafih');

export default function StudentEvaluationsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-indigo-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Personal Growth & Feedback</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">My Speech Evaluations</h1>
          <p className="text-xs sm:text-sm text-indigo-200/90 mt-1">
            Review detailed feedback, highlighted strengths, and constructive tips from your evaluators.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {myEvals.map((ev, idx) => (
          <div
            key={ev.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Meeting #01 · 18 Sep 2026</span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/70">
                Speech #{idx + 1}
              </span>
            </div>

            <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100 flex items-start gap-3">
              <MessageSquareQuote className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-slate-800 italic leading-relaxed">
                "{ev.remarks}"
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {ev.strengthTagIds.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Observed Strengths</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ev.strengthTagIds.map(id => (
                      <ObservationBadge key={id} tagId={id} type="strength" />
                    ))}
                  </div>
                </div>
              )}

              {ev.improvementTagIds.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />
                    <span>Areas to Practice</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ev.improvementTagIds.map(id => (
                      <ObservationBadge key={id} tagId={id} type="improvement" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {myEvals.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
            <Award className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-slate-600">No evaluations recorded yet</p>
            <p className="text-xs text-slate-400 mt-1">Evaluations will appear here once your meeting reports are submitted.</p>
          </div>
        )}
      </div>
    </div>
  );
}
