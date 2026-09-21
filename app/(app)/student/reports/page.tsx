'use client';
import Link from 'next/link';
export default function StudentReportsPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Reports</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
        <div className="flex-1"><p className="font-semibold text-slate-900">VAHDA · Meeting #01 Report</p><p className="text-xs text-slate-400">18 Sep 2026</p></div>
        <Link href="/admin/meetings/meeting-vahda-01/final-report" className="text-xs text-indigo-600 hover:underline">View →</Link>
      </div>
    </div>
  );
}
