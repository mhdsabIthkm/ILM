import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatTime(timeStr?: string): string {
  if (!timeStr) return '—';
  return timeStr;
}

export type SimplifiedMeetingStatus = 'drafted' | 'submitted' | 'approved';

export function getSimplifiedMeetingStatus(status: string): SimplifiedMeetingStatus {
  const s = status.toLowerCase();
  if (['teacher_review', 'submitted', 'submitted_to_admin'].includes(s)) return 'submitted';
  if (['approved', 'locked', 'completed'].includes(s)) return 'approved';
  return 'drafted';
}

export function getMeetingStatusLabel(status: string): string {
  const simplified = getSimplifiedMeetingStatus(status);
  switch (simplified) {
    case 'submitted':
      return 'Submitted to Admin';
    case 'approved':
      return 'Approved';
    case 'drafted':
    default:
      return 'Drafted';
  }
}

export function getTimingResultLabel(result?: string): string {
  if (!result) return '—';
  const labels: Record<string, string> = {
    under_time: 'Under Time',
    on_time: 'On Time',
    over_time: 'Over Time',
  };
  return labels[result] ?? result;
}

export function getAwardTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    star_of_the_week: 'Star of the Week',
    best_evaluator: 'Best Evaluator',
    best_speaker: 'Best Speaker',
    best_tt_speaker: 'Best TT Speaker',
    best_class_of_week: 'Best Class of the Week',
    other: 'Award',
  };
  return labels[type] ?? type;
}

export function getSectionStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    submitted: 'Submitted',
    complete: 'Complete',
    missing: 'Missing',
  };
  return labels[status] ?? status;
}
