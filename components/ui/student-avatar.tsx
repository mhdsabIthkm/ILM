'use client';

import { cn } from '@/lib/utils';

import { useState, useEffect } from 'react';
import { allStudents } from '@/lib/mock-data/students';
import { hasStudentPhoto } from '@/lib/mock-data/available-photos';

// Fast lookup map from student name to admission number
const studentNameMap = new Map<string, string>();
allStudents.forEach(s => {
  studentNameMap.set(s.name.trim().toLowerCase(), s.admissionNo);
});

interface StudentAvatarProps {
  name: string;
  admissionNo?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  imageUrl?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const COLORS = [
  'bg-indigo-100 text-indigo-700',
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-violet-100 text-violet-700',
  'bg-cyan-100 text-cyan-700',
  'bg-orange-100 text-orange-700',
];

function getColorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

export function StudentAvatar({ name, admissionNo, size = 'md', className, imageUrl, onClick }: StudentAvatarProps) {
  const [hasImgError, setHasImgError] = useState(false);
  const color = getColorForName(name);
  const initials = getInitials(name);

  // Determine admission number from prop or name lookup
  let effectiveAdNo = admissionNo?.trim();
  if (!effectiveAdNo && name) {
    effectiveAdNo = studentNameMap.get(name.trim().toLowerCase());
  }

  const photoSrc =
    imageUrl ||
    (effectiveAdNo && hasStudentPhoto(effectiveAdNo)
      ? `/students/${effectiveAdNo}.jpg`
      : undefined);

  useEffect(() => {
    setHasImgError(false);
  }, [photoSrc]);

  if (photoSrc && !hasImgError) {
    return (
      <img
        src={photoSrc}
        alt={name}
        onClick={onClick}
        onError={() => setHasImgError(true)}
        className={cn(
          'rounded-full object-cover flex-shrink-0 border border-slate-200 shadow-2xs',
          onClick && 'cursor-pointer hover:scale-105 hover:ring-2 hover:ring-indigo-400 transition-all',
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-full flex items-center justify-center font-semibold flex-shrink-0',
        onClick && 'cursor-pointer hover:scale-105 transition-transform',
        color,
        sizes[size],
        className
      )}
      aria-label={name}
      title={name}
    >
      {initials}
    </div>
  );
}
