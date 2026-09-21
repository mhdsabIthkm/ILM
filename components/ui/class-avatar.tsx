'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getClassCharacter } from '@/lib/mock-data/class-characters';
import { cn } from '@/lib/utils';

interface ClassAvatarProps {
  name?: string;
  level?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showBorder?: boolean;
}

const SIZE_MAP = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-20 h-20 text-xl',
};

export function ClassAvatar({
  name,
  level,
  size = 'md',
  className,
  showBorder = true,
}: ClassAvatarProps) {
  const [loadError, setLoadError] = useState(false);
  const character = getClassCharacter(name ?? level);
  const letters = (name ?? (level ? `C${level}` : 'CL')).replace(/^CLASS\s+/i, '').slice(0, 2).toUpperCase();

  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;

  if (character && !loadError) {
    return (
      <div
        className={cn(
          'relative rounded-full overflow-hidden flex-shrink-0 bg-slate-100 shadow-2xs',
          sizeClass,
          showBorder && 'ring-2 ring-white/90 border border-slate-200/80 shadow-xs',
          className
        )}
        title={`Class ${character.className} · Mascot: ${character.characterName}`}
      >
        <img
          src={character.photoUrl}
          alt={`${character.characterName} (Class ${character.className})`}
          onError={() => setLoadError(true)}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback to circular letters if character not found or failed to load
  return (
    <div
      className={cn(
        'relative rounded-full flex items-center justify-center font-bold flex-shrink-0 bg-indigo-100 text-indigo-700 shadow-2xs',
        sizeClass,
        showBorder && 'border border-indigo-200 shadow-xs',
        className
      )}
      title={`Class ${name ?? level}`}
    >
      <span>{letters}</span>
    </div>
  );
}
