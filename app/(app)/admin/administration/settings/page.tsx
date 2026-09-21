'use client';
export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Campus-wide application settings</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Campus Name</label>
          <input defaultValue="Malik Deenar Islamic Academy" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Campus Location</label>
          <input defaultValue="Kerala, India" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">ILM Program Name</label>
          <input defaultValue="Integrated Learning Program" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Default Language</label>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>English + Malayalam (Bilingual)</option>
            <option>English Only</option>
          </select>
        </div>
        <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}
