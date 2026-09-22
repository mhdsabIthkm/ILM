'use client';

import Link from 'next/link';
import { StatusBadge } from '@/components/ui/status-badge';
import { ClassAvatar } from '@/components/ui/class-avatar';
import { getClassCharacter } from '@/lib/mock-data/class-characters';
import { getClassDetailInfo } from '@/lib/mock-data/class-details';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { Users, Calendar, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { classYears } from '@/lib/mock-data/cohorts';
import { allMeetings } from '@/lib/mock-data/meetings';
import { allStudents } from '@/lib/mock-data/students';
import { cn } from '@/lib/utils';
import { LEVEL_CLASS_NAMES } from '@/app/(app)/student/classes/page';

// Get unique 10 classes for 2026-27 in level order
const currentClasses = classYears
  .filter(cy => cy.academicYearId === 'ay-2026-27' && cy.id !== 'cy-level5-2627')
  .sort((a, b) => a.level - b.level);

export default function ClassesPage() {
  const ilmCount = currentClasses.filter(c => c.ilmEnabled).length;

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex items-start justify-between flex-wrap gap-4 bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-bold text-indigo-700 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            MDIA Academy · Official 10 Classes &amp; Mascots
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Classes &amp; Students Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse any class to view its mascot portrait, enrolled students, high-resolution photo gallery, and academic metrics.
          </p>
        </div>
        <Link
          href="/admin/meetings"
          className="px-4 py-2.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors shadow-2xs self-start"
        >
          View ILM Meetings →
        </Link>
      </div>

      {/* Grid of 10 Classes */}
      <div className="grid grid-cols-1 gap-3.5">
        {currentClasses.map(cy => {
          const classStudents = allStudents.filter(s => s.classYearId === cy.id || (cy.id === 'cy-class5-2627' && s.classNum === 5));
          const previewStudents = classStudents.slice(0, 6);
          const character = getClassCharacter(cy.displayName);
          const detail = getClassDetailInfo(cy.id);

          return (
            <Link
              key={cy.id}
              href={`/admin/classes/${cy.id}`}
              className={cn(
                'group bg-white rounded-2xl border border-gray-200 hover:border-indigo-400 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all block relative overflow-hidden',
                !cy.ilmEnabled && 'bg-slate-50/40 hover:bg-white'
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  {/* High Quality Mascot Portrait */}
                  <ClassAvatar
                    name={cy.displayName}
                    level={cy.level}
                    size="xl"
                    className="w-14 h-14 sm:w-16 sm:h-16 ring-4 ring-indigo-50 group-hover:ring-indigo-100 group-hover:scale-105 transition-all shadow-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-indigo-600 transition-colors">
                        {cy.displayName}
                      </h2>
                      {character && (
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-700 border border-slate-200/80 px-2.5 py-0.5 rounded-full transition-colors">
                          {character.characterName}
                        </span>
                      )}
                      <StatusBadge
                        status={cy.ilmEnabled ? 'ilm' : 'no_ilm'}
                        label={cy.ilmEnabled ? 'ILM Active' : 'Degree / Non-ILM'}
                        showDot={false}
                      />
                    </div>

                    <p className="text-xs text-slate-500 font-medium mt-0.5 truncate max-w-xl">
                      {LEVEL_CLASS_NAMES[cy.level] || `Class ${cy.level}`} · {cy.displayName}
                    </p>
                    
                    {/* Student Photo Cluster Preview */}
                    <div className="flex items-center gap-2.5 mt-2.5">
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
                      <span className="text-xs text-slate-600 font-bold">
                        {classStudents.length} students
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100 flex-shrink-0">
                  <div className="text-left sm:text-center">
                    <p className="font-extrabold text-slate-900 text-sm">{classStudents.length}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Students</p>
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="font-extrabold text-slate-400 text-sm">---</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Attendance</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-2xs">
                    <span>View Students</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

