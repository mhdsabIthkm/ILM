'use client';

import { useState } from 'react';
import { timingRules } from '@/lib/mock-data/timing-rules';
import { Edit, Check, X, Clock } from 'lucide-react';

export default function TimingRulesPage() {
  const [rules, setRules] = useState(timingRules);
  const [editing, setEditing] = useState<string | null>(null);
  const [editVal, setEditVal] = useState('');
  const [saved, setSaved] = useState(false);

  const startEdit = (id: string, current: number) => {
    setEditing(id);
    setEditVal(String(current));
    setSaved(false);
  };

  const saveEdit = (id: string) => {
    const val = parseInt(editVal);
    if (!isNaN(val) && val > 0) {
      setRules(prev => prev.map(r => r.id === id ? { ...r, defaultMinutes: val } : r));
    }
    setEditing(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Timing Rules</h1>
        <p className="text-sm text-slate-500 mt-0.5">Configure default allowed time for each ILM activity. These are prototype defaults — adjust as needed.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
        <strong>Note:</strong> Changes here update the default allowed time shown to the Timer role during meetings. They do not affect historical records.
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Activity</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Default (minutes)</th>
              <th className="px-4 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rules.map(rule => (
              <tr key={rule.id} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="font-medium text-slate-900">{rule.activityLabel}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  {editing === rule.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={editVal}
                        onChange={e => setEditVal(e.target.value)}
                        className="w-16 border border-indigo-300 rounded px-2 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        autoFocus
                        onKeyDown={e => { if (e.key === 'Enter') saveEdit(rule.id); if (e.key === 'Escape') setEditing(null); }}
                      />
                      <span className="text-slate-500 text-xs">min</span>
                      <button onClick={() => saveEdit(rule.id)} className="text-green-600 hover:text-green-700"><Check className="w-4 h-4" /></button>
                      <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <span className="font-semibold text-slate-900">{rule.defaultMinutes} min</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {rule.isEditable && editing !== rule.id && (
                    <button
                      onClick={() => startEdit(rule.id, rule.defaultMinutes)}
                      className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 ml-auto"
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => setSaved(true)}
        className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${saved ? 'bg-green-50 text-green-700 border border-green-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
      >
        {saved ? '✓ Changes Saved' : 'Save All Changes'}
      </button>
    </div>
  );
}
