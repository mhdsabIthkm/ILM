'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium border',
  {
    variants: {
      variant: {
        default:           'bg-slate-100 text-slate-700 border-slate-200',
        drafted:           'bg-amber-50 text-amber-700 border-amber-200',
        submitted_to_admin:'bg-blue-50 text-blue-700 border-blue-200',
        planned:           'bg-amber-50 text-amber-700 border-amber-200',
        conducted:         'bg-blue-50 text-blue-700 border-blue-200',
        collecting:        'bg-amber-50 text-amber-700 border-amber-200',
        finalizer_review:  'bg-amber-50 text-amber-700 border-amber-200',
        teacher_review:    'bg-blue-50 text-blue-700 border-blue-200',
        submitted:         'bg-blue-50 text-blue-700 border-blue-200',
        approved:          'bg-emerald-50 text-emerald-700 border-emerald-200',
        locked:            'bg-emerald-50 text-emerald-700 border-emerald-200',
        // Section statuses
        not_started:       'bg-slate-100 text-slate-500 border-slate-200',
        in_progress:       'bg-blue-50 text-blue-600 border-blue-200',
        missing:           'bg-red-50 text-red-600 border-red-200',
        complete:          'bg-green-50 text-green-700 border-green-200',
        nil:               'bg-slate-100 text-slate-600 border-slate-300',
        // Timing
        on_time:           'bg-green-50 text-green-700 border-green-200',
        over_time:         'bg-red-50 text-red-600 border-red-200',
        under_time:        'bg-amber-50 text-amber-700 border-amber-200',
        // Attendance
        present:           'bg-green-50 text-green-700 border-green-200',
        absent:            'bg-red-50 text-red-600 border-red-200',
        excused:           'bg-amber-50 text-amber-700 border-amber-200',
        // Role type
        ilm:               'bg-indigo-50 text-indigo-700 border-indigo-200',
        no_ilm:            'bg-slate-100 text-slate-500 border-slate-200',
        // Award types
        award:             'bg-yellow-50 text-yellow-700 border-yellow-300',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

const STATUS_DOTS: Record<string, string> = {
  drafted: 'bg-amber-500',
  submitted_to_admin: 'bg-blue-500',
  planned: 'bg-amber-500',
  conducted: 'bg-blue-500',
  collecting: 'bg-amber-500',
  finalizer_review: 'bg-amber-500',
  teacher_review: 'bg-blue-500',
  submitted: 'bg-blue-500',
  approved: 'bg-emerald-500',
  locked: 'bg-emerald-500',
  not_started: 'bg-slate-400',
  in_progress: 'bg-blue-400',
  missing: 'bg-red-500',
  complete: 'bg-green-500',
  nil: 'bg-slate-400',
};

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: string;
  label?: string;
  showDot?: boolean;
}

export function StatusBadge({ status, label, showDot = true, className, ...props }: StatusBadgeProps) {
  const variant = status as BadgeVariant;
  const dotClass = STATUS_DOTS[status];

  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {showDot && dotClass && (
        <span className={cn('w-1.5 h-1.5 rounded-full', dotClass)} aria-hidden="true" />
      )}
      {label ?? formatStatusLabel(status)}
    </span>
  );
}

function formatStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    drafted: 'Drafted',
    submitted_to_admin: 'Submitted to Admin',
    planned: 'Drafted',
    conducted: 'Submitted to Admin',
    collecting: 'Drafted',
    finalizer_review: 'Drafted',
    teacher_review: 'Submitted to Admin',
    submitted: 'Submitted to Admin',
    approved: 'Approved',
    locked: 'Approved',
    not_started: 'Not Started',
    in_progress: 'In Progress',
    missing: 'Missing',
    complete: 'Complete',
    nil: 'Nil (Not Held)',
    on_time: 'On Time',
    over_time: 'Over Time',
    under_time: 'Under Time',
    present: 'Present',
    absent: 'Absent',
    excused: 'Excused',
    ilm: 'ILM Active',
    no_ilm: 'No ILM',
    award: 'Award',
  };
  return labels[status] ?? status;
}
