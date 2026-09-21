'use client';

import { academicYears } from '@/lib/mock-data/academic-years';
import { classYears } from '@/lib/mock-data/cohorts';
import { Check } from 'lucide-react';

export default function AcademicYearsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Academic Years</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage academic years and ILM program periods.</p>
      </div>

      <div className="space-y-3">
        {academicYears.map(ay => {
          const classes = classYears.filter(cy => cy.academicYearId === ay.id);
          const ilmClasses = classes.filter(cy => cy.ilmEnabled);
          return (
            <div key={ay.id} className={`bg-white rounded-lg border shadow-sm p-5 ${ay.isCurrent ? 'border-indigo-300 ring-1 ring-indigo-200' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-slate-900">{ay.label}</h2>
                    {ay.isCurrent && (
                      <span className="text-xs bg-indigo-100 text-indigo-700 border border-indigo-300 rounded-md px-2 py-0.5 font-medium">Current</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{ay.startDate} — {ay.endDate}</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-slate-900">{classes.length}</p>
                    <p className="text-xs text-slate-400">Classes</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-slate-900">{ilmClasses.length}</p>
                    <p className="text-xs text-slate-400">ILM Classes</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {classes.map(cy => (
                  <span
                    key={cy.id}
                    className={`flex items-center gap-1 text-xs rounded-md px-2 py-1 border ${cy.ilmEnabled ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}
                  >
                    {cy.ilmEnabled && <Check className="w-3 h-3" />}
                    {cy.displayName}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-dashed border-gray-300 p-5 text-center">
        <p className="text-sm font-medium text-slate-700">Add New Academic Year</p>
        <p className="text-xs text-slate-400 mt-1">Available when setting up a new session.</p>
        <button className="mt-3 px-4 py-2 text-sm text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
          + Add Academic Year
        </button>
      </div>
    </div>
  );
}
