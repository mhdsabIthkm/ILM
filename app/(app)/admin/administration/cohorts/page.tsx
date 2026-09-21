'use client';

import { useState } from 'react';
import { classYears } from '@/lib/mock-data/cohorts';
import { cohorts } from '@/lib/mock-data/cohorts';
import { academicYears } from '@/lib/mock-data/academic-years';
import { Edit, Check, X } from 'lucide-react';

export default function CohortsPage() {
  const [data, setData] = useState(() =>
    cohorts.map(cohort => ({
      cohort,
      years: academicYears.map(ay => {
        const cy = classYears.find(c => c.cohortId === cohort.id && c.academicYearId === ay.id);
        return { ayId: ay.id, ayLabel: ay.label, displayName: cy?.displayName ?? '—', ilmEnabled: cy?.ilmEnabled ?? false };
      }),
    }))
  );

  const [editing, setEditing] = useState<{ cohortId: string; ayId: string } | null>(null);
  const [editVal, setEditVal] = useState('');

  const startEdit = (cohortId: string, ayId: string, current: string) => {
    setEditing({ cohortId, ayId });
    setEditVal(current === '—' ? '' : current);
  };

  const saveEdit = () => {
    if (!editing) return;
    setData(prev => prev.map(d => d.cohort.id === editing.cohortId
      ? { ...d, years: d.years.map(y => y.ayId === editing.ayId ? { ...y, displayName: editVal || '—' } : y) }
      : d
    ));
    setEditing(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Classes &amp; Class Names</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage how our 10 classes are named each academic year. Historical reports keep the name they were created with.
        </p>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm text-indigo-800">
        <strong>How this works:</strong> We have 10 classes in the academy. Each academic year, classes progress and receive their official class display name (e.g. SA&apos;DA → SIDRA → SUFFA → VAHDA). Historical meeting reports always retain the class name at time of creation.
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Class Level</th>
                {academicYears.map(ay => (
                  <th key={ay.id} className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {ay.label}
                    {ay.isCurrent && <span className="ml-1 text-indigo-600">(Current)</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map(({ cohort, years }) => (
                <tr key={cohort.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-900">{cohort.id.replace('cohort-', 'Class ').toUpperCase()}</p>
                    <p className="text-xs text-slate-400">Est. {cohort.createdYear}</p>
                  </td>
                  {years.map(y => {
                    const isEditing = editing?.cohortId === cohort.id && editing?.ayId === y.ayId;
                    return (
                      <td key={y.ayId} className="px-4 py-3.5 text-center">
                        {isEditing ? (
                          <div className="flex items-center gap-1 justify-center">
                            <input
                              type="text"
                              value={editVal}
                              onChange={e => setEditVal(e.target.value)}
                              className="w-24 border border-indigo-300 rounded px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              autoFocus
                              onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') setEditing(null); }}
                            />
                            <button onClick={saveEdit} className="text-green-600 hover:text-green-700"><Check className="w-3.5 h-3.5" /></button>
                            <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-600"><X className="w-3.5 h-3.5" /></button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1 group">
                            <span className={`font-semibold ${y.displayName === '—' ? 'text-slate-300' : y.ilmEnabled ? 'text-indigo-700' : 'text-slate-500'}`}>
                              {y.displayName}
                            </span>
                            <button
                              onClick={() => startEdit(cohort.id, y.ayId, y.displayName)}
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-indigo-600 transition-opacity"
                              aria-label="Edit class name"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center">
        Hover over a cell and click the edit icon to rename a class for a specific academic year.
      </p>
    </div>
  );
}
