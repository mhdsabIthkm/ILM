'use client';
export default function CampusReportsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-slate-900 mb-2">Campus Reports</h1>
      <p className="text-sm text-slate-500 mb-6">Cross-class reports and analytics for the academic year.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {['Attendance Summary', 'Participation Rates', 'Class Comparison', 'Award Winners'].map(r => (
          <div key={r} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow cursor-pointer">
            <p className="font-semibold text-slate-900">{r}</p>
            <p className="text-xs text-slate-400 mt-1">Click to view report</p>
          </div>
        ))}
      </div>
    </div>
  );
}
