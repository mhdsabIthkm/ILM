'use client';
import Link from 'next/link';
import { classYears } from '@/lib/mock-data/cohorts';
const myClasses = classYears.filter(cy => cy.academicYearId === 'ay-2026-27' && ['cy-vahda-2627','cy-suffa-2627'].includes(cy.id));
export default function TeacherClassesPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-slate-900">My Classes</h1>
      {myClasses.map(cy => (
        <div key={cy.id} className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center font-bold text-indigo-700">{cy.displayName.slice(0,2)}</div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900">{cy.displayName}</p>
            <p className="text-xs text-slate-500">Level {cy.level} · 35 students</p>
          </div>
          <Link href={`/admin/classes/${cy.id}`} className="text-xs text-indigo-600 hover:underline">View →</Link>
        </div>
      ))}
    </div>
  );
}
