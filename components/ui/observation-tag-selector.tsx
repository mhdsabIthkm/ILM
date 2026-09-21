'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  Check,
  Zap,
  Volume2,
  Layers,
  Eye,
  Users,
  Clock,
  BookOpen,
  Activity,
  CheckCircle2,
  Target,
  Pause,
  PenTool,
  Repeat,
  ShieldAlert,
  MicOff,
  AlignLeft,
  EyeOff,
  Hourglass,
  FileQuestion,
  TrendingUp,
  ArrowUpRight,
  RotateCcw,
  LucideIcon,
} from 'lucide-react';
import { observationTags } from '@/lib/mock-data/observation-tags';

interface ObservationTagSelectorProps {
  label?: string;
  selectedStrengths: string[];
  selectedImprovements: string[];
  onStrengthToggle: (id: string) => void;
  onImprovementToggle: (id: string) => void;
  onClearStrengths?: () => void;
  onClearImprovements?: () => void;
  className?: string;
}

// Map tag IDs to curated Lucide icons
const TAG_ICONS: Record<string, LucideIcon> = {
  // Strengths
  'str-confidence': Zap,
  'str-fluency': Activity,
  'str-vocabulary': BookOpen,
  'str-clarity': Target,
  'str-pronunciation': Volume2,
  'str-structure': Layers,
  'str-eye-contact': Eye,
  'str-engagement': Users,
  'str-timing': Clock,
  'str-preparation': CheckCircle2,

  // Improvements
  'imp-pausing': Pause,
  'imp-grammar': PenTool,
  'imp-repetition': Repeat,
  'imp-pace': Activity,
  'imp-clarity': Target,
  'imp-confidence': ShieldAlert,
  'imp-pronunciation': MicOff,
  'imp-structure': AlignLeft,
  'imp-eye-contact': EyeOff,
  'imp-timing': Hourglass,
  'imp-preparation': FileQuestion,
};

const CATEGORIES = [
  { id: 'all', label: 'All Tags' },
  { id: 'stage_presence', label: 'Presence' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'language', label: 'Language' },
  { id: 'content', label: 'Content' },
  { id: 'time', label: 'Timing' },
];

export function ObservationTagSelector({
  label,
  selectedStrengths,
  selectedImprovements,
  onStrengthToggle,
  onImprovementToggle,
  onClearStrengths,
  onClearImprovements,
  className,
}: ObservationTagSelectorProps) {
  const [strengthCategory, setStrengthCategory] = useState('all');
  const [improvementCategory, setImprovementCategory] = useState('all');

  const allStrengths = observationTags.filter(t => t.type === 'strength');
  const allImprovements = observationTags.filter(t => t.type === 'improvement');

  const filteredStrengths = strengthCategory === 'all'
    ? allStrengths
    : allStrengths.filter(t => t.category === strengthCategory);

  const filteredImprovements = improvementCategory === 'all'
    ? allImprovements
    : allImprovements.filter(t => t.category === improvementCategory);

  return (
    <div className={cn('space-y-5', className)}>
      {label && (
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <p className="text-sm font-bold text-slate-800 tracking-tight">{label}</p>
        </div>
      )}

      {/* ── STRENGTHS ZONE ─────────────────────────────────────── */}
      <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/80 via-teal-50/35 to-emerald-50/50 p-4 sm:p-5 shadow-xs transition-all">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xs shadow-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 uppercase tracking-wider">
                  Observed Strengths
                </h4>
                {selectedStrengths.length > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-emerald-600 text-white rounded-full px-2 py-0.5 shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    {selectedStrengths.length} selected
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-700/80 mt-0.5">
                Standout techniques and commendable skills
              </p>
            </div>
          </div>

          {/* Quick Clear button if any selected */}
          {selectedStrengths.length > 0 && onClearStrengths && (
            <button
              type="button"
              onClick={onClearStrengths}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-100/80 hover:bg-emerald-200/80 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 mb-3.5 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isActive = strengthCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setStrengthCategory(cat.id)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150',
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white/80 text-emerald-900/80 hover:bg-white hover:text-emerald-950 border border-emerald-200/60'
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tags Selection Grid */}
        <div className="flex flex-wrap gap-2.5">
          {filteredStrengths.map(tag => {
            const selected = selectedStrengths.includes(tag.id);
            const TagIcon = TAG_ICONS[tag.id] || Sparkles;

            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => onStrengthToggle(tag.id)}
                aria-pressed={selected}
                className={cn(
                  'group relative inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all duration-150 select-none cursor-pointer border shadow-2xs active:scale-95',
                  selected
                    ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white border-transparent shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400/50 scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200/85 hover:border-emerald-400 hover:text-emerald-900 hover:bg-emerald-50/70 hover:shadow-xs hover:-translate-y-0.5'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-lg flex items-center justify-center transition-colors',
                    selected
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                  )}
                >
                  {selected ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <TagIcon className="w-3.5 h-3.5" />
                  )}
                </div>
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── NEEDS IMPROVEMENT ZONE ─────────────────────────────── */}
      <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/80 via-orange-50/35 to-amber-50/50 p-4 sm:p-5 shadow-xs transition-all">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-xs shadow-orange-500/20">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-amber-950 uppercase tracking-wider">
                  Needs Improvement
                </h4>
                {selectedImprovements.length > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-amber-600 text-white rounded-full px-2 py-0.5 shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    {selectedImprovements.length} selected
                  </span>
                )}
              </div>
              <p className="text-[11px] text-amber-700/80 mt-0.5">
                Constructive focus areas for growth and practice
              </p>
            </div>
          </div>

          {/* Quick Clear button if any selected */}
          {selectedImprovements.length > 0 && onClearImprovements && (
            <button
              type="button"
              onClick={onClearImprovements}
              className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 mb-3.5 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isActive = improvementCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setImprovementCategory(cat.id)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150',
                  isActive
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white/80 text-amber-900/80 hover:bg-white hover:text-amber-950 border border-amber-200/60'
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tags Selection Grid */}
        <div className="flex flex-wrap gap-2.5">
          {filteredImprovements.map(tag => {
            const selected = selectedImprovements.includes(tag.id);
            const TagIcon = TAG_ICONS[tag.id] || Target;

            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => onImprovementToggle(tag.id)}
                aria-pressed={selected}
                className={cn(
                  'group relative inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all duration-150 select-none cursor-pointer border shadow-2xs active:scale-95',
                  selected
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white border-transparent shadow-md shadow-orange-500/25 ring-2 ring-amber-400/50 scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200/85 hover:border-amber-400 hover:text-amber-900 hover:bg-amber-50/70 hover:shadow-xs hover:-translate-y-0.5'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-lg flex items-center justify-center transition-colors',
                    selected
                      ? 'bg-white/20 text-white'
                      : 'bg-amber-50 text-amber-600 group-hover:bg-amber-100 group-hover:text-amber-700'
                  )}
                >
                  {selected ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <TagIcon className="w-3.5 h-3.5" />
                  )}
                </div>
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
