'use client';

import { useState } from 'react';
import { ilmRoles } from '@/lib/mock-data/roles';

export default function ILMRolesPage() {
  const [roles] = useState(ilmRoles);

  const categories = Array.from(new Set(roles.map(r => r.category)));

  const catLabel: Record<string, string> = {
    opening: 'Opening',
    prepared_speech: 'Prepared Speech Session',
    table_topics: 'Table Topics',
    ice_breaking: 'Ice Breaking',
    evaluation: 'Evaluation Session',
    closing: 'Closing',
    misc: 'Miscellaneous',
    award: 'Awards',
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">ILM Roles</h1>
        <p className="text-sm text-slate-500 mt-0.5">All configurable roles in the ILM program. {roles.length} roles total.</p>
      </div>

      {categories.map(cat => {
        const catRoles = roles.filter(r => r.category === cat);
        return (
          <div key={cat} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 border-b border-gray-100">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{catLabel[cat] ?? cat}</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {catRoles.map(role => (
                <div key={role.id} className="px-5 py-3.5 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900">{role.name}</span>
                      {role.expandedName && (
                        <span className="text-xs text-slate-500 bg-slate-100 rounded-md px-2 py-0.5">{role.expandedName}</span>
                      )}
                      {role.isFixed ? (
                        <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-md px-2 py-0.5">Fixed</span>
                      ) : (
                        <span className="text-xs bg-slate-100 text-slate-500 rounded-md px-2 py-0.5">Repeating</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{role.description}</p>
                    {role.defaultDurationMinutes && (
                      <p className="text-xs text-slate-400 mt-0.5">Default: {role.defaultDurationMinutes} minutes</p>
                    )}
                  </div>
                  <button className="text-xs text-indigo-600 hover:underline flex-shrink-0 mt-1">Edit</button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
