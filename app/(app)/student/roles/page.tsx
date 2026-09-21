'use client';
export default function StudentRolesPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-slate-900">My Roles</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Meeting #01 — 18 Sep 2026</h2>
        <div className="flex items-center gap-3 py-2 border-b border-gray-50">
          <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
          <span className="text-sm font-medium text-slate-700 flex-1">Prepared Speaker</span>
          <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-md px-2 py-0.5">Meeting #01</span>
        </div>
        <p className="text-xs text-slate-400 mt-3">Speech topic: C. H. Mohammed Koya: A Leader of Muslim Politics</p>
      </div>
    </div>
  );
}
