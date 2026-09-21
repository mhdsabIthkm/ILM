'use client';

import { cn } from '@/lib/utils';
import {
  Sparkles,
  Zap,
  Activity,
  BookOpen,
  Target,
  Volume2,
  Layers,
  Eye,
  Users,
  Clock,
  CheckCircle2,
  Pause,
  PenTool,
  Repeat,
  ShieldAlert,
  MicOff,
  AlignLeft,
  EyeOff,
  Hourglass,
  FileQuestion,
  LucideIcon,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { observationTags } from '@/lib/mock-data/observation-tags';

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

interface ObservationBadgeProps {
  tagId: string;
  type?: 'strength' | 'improvement';
  size?: 'sm' | 'md';
  className?: string;
}

export function ObservationBadge({ tagId, type, size = 'md', className }: ObservationBadgeProps) {
  const tag = observationTags.find(t => t.id === tagId);
  const resolvedType = type || tag?.type || (tagId.startsWith('str') ? 'strength' : 'improvement');
  const label = tag?.label ?? tagId;
  const TagIcon = TAG_ICONS[tagId] || (resolvedType === 'strength' ? Sparkles : Target);

  const isStrength = resolvedType === 'strength';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold rounded-xl border shadow-2xs transition-all select-none',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs sm:text-sm',
        isStrength
          ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80 hover:border-emerald-300'
          : 'bg-amber-50 text-amber-800 border-amber-200/80 hover:border-amber-300',
        className
      )}
    >
      <span
        className={cn(
          'flex items-center justify-center rounded-md',
          size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4',
          isStrength ? 'text-emerald-600' : 'text-amber-600'
        )}
      >
        <TagIcon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </span>
      <span>{label}</span>
    </span>
  );
}
