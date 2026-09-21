'use client';

import { useState } from 'react';

const FLAGS = [
  { key: 'allowClassMemberComparison', label: 'Allow Class Member Comparison', description: 'Allow class members to inspect other students\' detailed performance for competition/transparency. Default: OFF', default: false },
  { key: 'enablePhotoGallery', label: 'Enable Photo Gallery', description: 'Allow photo uploads and viewing for ILM meetings.', default: true },
  { key: 'enableHandwritingScanner', label: 'Enable Handwriting Scanner', description: 'Allow AI-assisted scanning of handwritten reports.', default: true },
  { key: 'requireBilingualTopics', label: 'Require Bilingual Topics', description: 'Require both English and Malayalam for all speech topics before submission.', default: false },
];

export default function PermissionsPage() {
  const [flags, setFlags] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(FLAGS.map(f => [f.key, f.default]))
  );
  const [saved, setSaved] = useState(false);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Permissions &amp; Feature Flags</h1>
        <p className="text-sm text-slate-500 mt-0.5">Control which features are enabled for this campus.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm divide-y divide-gray-50">
        {FLAGS.map(flag => (
          <div key={flag.key} className="px-5 py-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">{flag.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{flag.description}</p>
            </div>
            <button
              role="switch"
              aria-checked={flags[flag.key]}
              onClick={() => { setFlags(p => ({ ...p, [flag.key]: !p[flag.key] })); setSaved(false); }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 mt-0.5 ${flags[flag.key] ? 'bg-indigo-600' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${flags[flag.key] ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setSaved(true)}
        className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${saved ? 'bg-green-50 text-green-700 border border-green-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
      >
        {saved ? '✓ Settings Saved' : 'Save Settings'}
      </button>
    </div>
  );
}
