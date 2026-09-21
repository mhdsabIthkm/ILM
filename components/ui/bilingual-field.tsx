'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Languages, CheckCircle2 } from 'lucide-react';

interface BilingualFieldProps {
  id?: string;
  label?: string;
  english: string;
  malayalam: string;
  onEnglishChange?: (val: string) => void;
  onMalayalamChange?: (val: string) => void;
  multiline?: boolean;
  readOnly?: boolean;
  className?: string;
}

export function BilingualField({
  id,
  label,
  english,
  malayalam,
  onEnglishChange,
  onMalayalamChange,
  multiline = false,
  readOnly = false,
  className,
}: BilingualFieldProps) {
  const [translating, setTranslating] = useState<'en' | 'ml' | null>(null);
  const [translated, setTranslated] = useState<'en' | 'ml' | null>(null);

  const simulateTranslate = (direction: 'en' | 'ml') => {
    setTranslating(direction);
    setTranslated(null);
    setTimeout(() => {
      setTranslating(null);
      setTranslated(direction);
      if (direction === 'ml' && onMalayalamChange && english) {
        // Mock: just echo back with "(ML)" to show it worked
        onMalayalamChange(malayalam || `[Translation of: ${english}]`);
      }
      if (direction === 'en' && onEnglishChange && malayalam) {
        onEnglishChange(english || `[Translation of Malayalam text]`);
      }
      setTimeout(() => setTranslated(null), 2000);
    }, 1200);
  };

  const inputClass =
    'w-full text-sm border border-gray-200 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-slate-500';

  return (
    <div className={cn('space-y-2', className)}>
      {label && <p className="text-sm font-medium text-slate-700">{label}</p>}
      <div className="grid gap-2">
        {/* English */}
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <label className="text-xs text-slate-500 mb-1 block">English</label>
            {multiline ? (
              <textarea
                id={id ? `${id}-en` : undefined}
                value={english}
                onChange={e => onEnglishChange?.(e.target.value)}
                disabled={readOnly}
                rows={2}
                className={inputClass}
                placeholder="Enter English text…"
              />
            ) : (
              <input
                type="text"
                id={id ? `${id}-en` : undefined}
                value={english}
                onChange={e => onEnglishChange?.(e.target.value)}
                disabled={readOnly}
                className={inputClass}
                placeholder="Enter English text…"
              />
            )}
          </div>
          {!readOnly && (
            <button
              type="button"
              onClick={() => simulateTranslate('ml')}
              disabled={!english || translating !== null}
              className="mt-5 flex-shrink-0 flex items-center gap-1 text-xs text-indigo-600 border border-indigo-200 rounded-md px-2 py-1.5 hover:bg-indigo-50 disabled:opacity-40 transition-colors"
              title="Auto Translate to Malayalam"
            >
              {translating === 'ml' ? (
                <span className="animate-pulse">Translating…</span>
              ) : translated === 'ml' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-green-600">Done</span>
                </>
              ) : (
                <>
                  <Languages className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">→ ML</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Malayalam */}
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <label className="text-xs text-slate-500 mb-1 block">Malayalam</label>
            {multiline ? (
              <textarea
                id={id ? `${id}-ml` : undefined}
                value={malayalam}
                onChange={e => onMalayalamChange?.(e.target.value)}
                disabled={readOnly}
                rows={2}
                className={cn(inputClass, 'ml-text')}
                placeholder="മലയാളം ടൈപ്പ് ചെയ്യുക…"
              />
            ) : (
              <input
                type="text"
                id={id ? `${id}-ml` : undefined}
                value={malayalam}
                onChange={e => onMalayalamChange?.(e.target.value)}
                disabled={readOnly}
                className={cn(inputClass, 'ml-text')}
                placeholder="മലയാളം ടൈപ്പ് ചെയ്യുക…"
              />
            )}
          </div>
          {!readOnly && (
            <button
              type="button"
              onClick={() => simulateTranslate('en')}
              disabled={!malayalam || translating !== null}
              className="mt-5 flex-shrink-0 flex items-center gap-1 text-xs text-indigo-600 border border-indigo-200 rounded-md px-2 py-1.5 hover:bg-indigo-50 disabled:opacity-40 transition-colors"
              title="Auto Translate to English"
            >
              {translating === 'en' ? (
                <span className="animate-pulse">Translating…</span>
              ) : translated === 'en' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-green-600">Done</span>
                </>
              ) : (
                <>
                  <Languages className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">→ EN</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
