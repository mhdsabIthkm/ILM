'use client';

import Link from 'next/link';
import { StatusBadge } from '@/components/ui/status-badge';
import { ClassAvatar } from '@/components/ui/class-avatar';
import { getClassCharacter } from '@/lib/mock-data/class-characters';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { Users, Calendar, ChevronRight, Eye } from 'lucide-react';
import { classYears } from '@/lib/mock-data/cohorts';
import { allMeetings } from '@/lib/mock-data/meetings';
import { allStudents } from '@/lib/mock-data/students';
import { cn } from '@/lib/utils';

// Get unique 10 classes for 2026-27
const currentClasses = classYears
  .filter(cy => cy.academicYearId === 'ay-2026-27' && cy.id !== 'cy-level5-2627')
  .sort((a, b) => a.level - b.level);

const meetingCountByClass: Record<string, number> = {
  'cy-sada-2627': 3,
  'cy-sidra-2627': 2,
  'cy-suffa-2627': 3,
  'cy-vahda-2627': 1,
  'cy-class5-2627': 0,
  'cy-alfa-2627': 5,
  'cy-class7-2627': 0,
  'cy-degree1-2627': 0,
  'cy-degree2-2627': 0,
  'cy-degree3-2627': 0,
};

export default function ClassesPage() {
  const ilmCount = currentClasses.filter(c => c.ilmEnabled).length;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Classes &amp; Students Directory</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Academic Year 2026–27 · {currentClasses.length} classes, {ilmCount} with ILM
          </p>
        </div>
        <Link
          href="/admin/meetings"
          className="px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors shadow-2xs"
        >
          View ILM Meetings →
        </Link>
      </div>

      <div className="space-y-3">
        {currentClasses.map(cy => {
          const meetingCount = meetingCountByClass[cy.id] ?? 0;
          const classStudents = allStudents.filter(s => s.classYearId === cy.id || (cy.id === 'cy-class5-2627' && s.classNum === 5));
          const previewStudents = classStudents.slice(0, 5);
          const character = getClassCharacter(cy.displayName);

          return (
            <div
              key={cy.id}
              className={cn(
                'bg-white rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-all',
                !cy.ilmEnabled && 'bg-slate-50/50'
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-4 min-w-0">
                  <ClassAvatar
                    name={cy.displayName}
                    level={cy.level}
                    size="lg"
                    className="w-13 h-13 sm:w-14 sm:h-14 ring-2 ring-indigo-100 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-bold text-slate-900 text-base">{cy.displayName}</h2>
                      {character && (
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-full">
                          {character.characterName}
                        </span>
                      )}
                      <StatusBadge
                        status={cy.ilmEnabled ? 'ilm' : 'no_ilm'}
                        label={cy.ilmEnabled ? 'ILM Active' : 'Non-ILM'}
                        showDot={false}
                      />
                    </div>
                    
                    {/* Student Photo Cluster Preview */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex -space-x-2 overflow-hidden">
                        {previewStudents.map(st => (
                          <StudentAvatar
                            key={st.id}
                            name={st.name}
                            admissionNo={st.admissionNo}
                            size="xs"
                            className="ring-2 ring-white"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {classStudents.length} students enrolled
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                  <div className="text-left sm:text-center">
                    <p className="font-bold text-slate-900 text-sm">{classStudents.length}</p>
                    <p className="text-[11px] text-slate-400">Students</p>
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="font-bold text-slate-900 text-sm">{meetingCount}</p>
                    <p className="text-[11px] text-slate-400">Meetings</p>
                  </div>

                  <Link
                    href={`/admin/classes/${cy.id}`}
                    className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                    aria-label={`View ${cy.displayName} students and photos`}
                  >
                    <span>View Students</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
