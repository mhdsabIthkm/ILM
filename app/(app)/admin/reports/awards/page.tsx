'use client';
import { vahdaMeeting1Awards } from '@/lib/mock-data/meetings';
import { getStudent } from '@/lib/mock-data/students';
import { getAwardTypeLabel } from '@/lib/utils';
import { Award } from 'lucide-react';
import { StudentAvatar } from '@/components/ui/student-avatar';

export default function AwardsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Awards</h1>
        <p className="text-sm text-slate-500 mt-0.5">All ILM awards — Academic Year 2026–27</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {vahdaMeeting1Awards.map(aw => {
          const s = aw.studentId ? getStudent(aw.studentId) : null;
          return (
            <div key={aw.id} className="bg-white rounded-lg border border-yellow-200 p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900">{getAwardTypeLabel(aw.type)}</p>
                <p className="text-xs text-slate-500 mt-0.5">VAHDA · Meeting #01 · 18 Sep 2026</p>
              </div>
              {s && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StudentAvatar name={s.name} size="sm" />
                  <span className="text-sm font-medium text-slate-900 hidden sm:block">{s.name}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-6 text-center text-slate-400 text-sm">
        Awards from other classes will appear here as meetings are finalized.
      </div>
    </div>
  );
}
