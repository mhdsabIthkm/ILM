'use client';
import Link from 'next/link';
import { classYears } from '@/lib/mock-data/cohorts';
import { ClassAvatar } from '@/components/ui/class-avatar';
import { getClassCharacter } from '@/lib/mock-data/class-characters';

const myClasses = classYears.filter(cy => cy.academicYearId === 'ay-2026-27' && ['cy-vahda-2627','cy-suffa-2627'].includes(cy.id));

export default function TeacherClassesPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-slate-900">My Classes</h1>
      {myClasses.map(cy => {
        const character = getClassCharacter(cy.displayName);
        return (
          <div key={cy.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 shadow-xs">
            <ClassAvatar name={cy.displayName} level={cy.level} size="lg" className="ring-2 ring-indigo-100" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-slate-900 text-base">{cy.displayName}</p>
                {character && (
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-full">
                    {character.characterName}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Level {cy.level} · 35 students</p>
            </div>
            <Link href={`/admin/classes/${cy.id}`} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors">
              View Class →
            </Link>
          </div>
        );
      })}
    </div>
  );
}
