'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { TopHeader } from '@/components/layout/top-header';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ilm-user');
      if (!saved) {
        // Not logged in -> always route to /login as first interface
        router.replace('/login');
      }
    } catch {}
  }, [router, pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Desktop sidebar - Complete, uninterrupted solid dark 288px (w-72) width */}
      <aside className="hidden lg:flex lg:w-72 lg:min-w-[18rem] lg:max-w-[18rem] lg:flex-shrink-0 h-full bg-slate-950 border-r border-slate-800 z-30">
        <AppSidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 z-50 bg-slate-950">
            <AppSidebar onClose={() => setSidebarOpen(false)} />
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Strictly begins at x=288px, cleanly divided from the dark sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-gray-50">
        <TopHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
