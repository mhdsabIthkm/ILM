'use client';

import { UserProfileMenu } from './user-profile-menu';
import { Menu } from 'lucide-react';

interface TopHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export function TopHeader({ onMenuClick, title }: TopHeaderProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 flex-shrink-0 z-20">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-600"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Page title */}
      {title && (
        <h1 className="text-sm font-semibold text-slate-700 hidden sm:block truncate">{title}</h1>
      )}

      <div className="flex-1" />

      {/* Interactive User Profile & Account Menu */}
      <UserProfileMenu />
    </header>
  );
}
