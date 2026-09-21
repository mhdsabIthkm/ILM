'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: { value: number; label: string };
  className?: string;
  accent?: boolean;
}

export function StatCard({ title, value, description, icon: Icon, className, accent }: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-5 shadow-sm',
        accent && 'border-indigo-200 bg-indigo-50',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">{title}</p>
          <p className={cn('text-2xl font-semibold', accent ? 'text-indigo-700' : 'text-slate-900')}>
            {value}
          </p>
          {description && (
            <p className="text-xs text-slate-500 mt-1">{description}</p>
          )}
        </div>
        {Icon && (
          <div className={cn(
            'flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ml-3',
            accent ? 'bg-indigo-100' : 'bg-slate-100'
          )}>
            <Icon className={cn('w-4 h-4', accent ? 'text-indigo-600' : 'text-slate-600')} />
          </div>
        )}
      </div>
    </div>
  );
}
