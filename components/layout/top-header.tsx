'use client';

import { UserProfileMenu } from './user-profile-menu';
import { Menu, LogOut } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

interface TopHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export function TopHeader({ onMenuClick, title }: TopHeaderProps) {
  const { logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 flex-shrink-0 z-20 print:hidden">
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

      {/* Top right Profile & Sign Out actions */}
      <div className="flex items-center gap-2">
        <UserProfileMenu />

        {/* Quick Sign Out button in top right of browser */}
        <button
          onClick={handleLogout}
          title="Sign Out"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-gray-200 hover:border-rose-200 transition-colors cursor-pointer"
          aria-label="Sign out"
        >
          <LogOut className="w-3.5 h-3.5 text-slate-500 hover:text-rose-600" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}

