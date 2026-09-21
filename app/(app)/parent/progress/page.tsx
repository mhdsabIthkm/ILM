'use client';
export default function ParentProgressPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-5">
      <h1 className="text-xl font-bold text-slate-900">Progress</h1>
      <div className="grid grid-cols-2 gap-4">
        {[['Meetings Attended','1 / 1'],['Stage Appearances','1'],['Best Speaker Award','1'],['Ah Counter Score','0 (best)']].map(([k,v]) => (
          <div key={k} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">{v}</p>
            <p className="text-xs text-slate-500 mt-1 leading-tight">{k}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-3">Participation Timeline</h2>
        <div className="flex items-center gap-3 py-2">
          <div className="w-2 h-2 rounded-full bg-indigo-400" />
          <span className="text-sm text-slate-700">Meeting #01 — Prepared Speaker</span>
          <span className="ml-auto text-xs text-slate-400">18 Sep 2026</span>
        </div>
      </div>
    </div>
  );
}
