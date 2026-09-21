'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Users, BookOpen, FileText, Award, Image,
  Settings, GraduationCap, Calendar, ClipboardList, Bell,
  ChevronDown, ChevronRight, Home, Star, UserCircle,
  BarChart2, Layers, Shield, Clock, Key, ToggleLeft,
  BookMarked, School, ClipboardCheck, Eye, Sparkles,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const adminNav: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'My Profile', href: '/admin/profile', icon: UserCircle },
  {
    label: 'ILM Meetings', icon: Calendar,
    children: [
      { label: 'Meetings', href: '/admin/meetings', icon: Calendar },
      { label: 'Classes', href: '/admin/classes', icon: School },
      { label: 'Students', href: '/admin/students', icon: Users },
    ],
  },
  {
    label: 'Reports', icon: FileText,
    children: [
      { label: 'Meeting Reports', href: '/admin/reports/meeting-reports' },
      { label: 'Campus Reports', href: '/admin/reports/campus-reports' },
      { label: 'Awards', href: '/admin/reports/awards' },
      { label: 'Gallery', href: '/admin/reports/gallery' },
    ],
  },
  {
    label: 'Administration', icon: Settings,
    children: [
      { label: 'Academic Years', href: '/admin/administration/academic-years' },
      { label: 'Classes & Class Names', href: '/admin/administration/cohorts' },
      { label: 'Users', href: '/admin/administration/users' },
      { label: 'ILM Roles', href: '/admin/administration/ilm-roles' },
      { label: 'Timing Rules', href: '/admin/administration/timing-rules' },
      { label: 'Permissions', href: '/admin/administration/permissions' },
      { label: 'Settings', href: '/admin/administration/settings' },
    ],
  },
];

const studentNav: NavItem[] = [
  { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
  { label: 'My Profile', href: '/student/profile', icon: UserCircle },
  { label: 'My Class', href: '/student/class', icon: GraduationCap },
  { label: 'ILM Meetings', href: '/student/meetings', icon: Calendar },
  { label: 'My Roles', href: '/student/roles', icon: Layers },
  { label: 'My Evaluations', href: '/student/evaluations', icon: Star },
  { label: 'Awards', href: '/student/awards', icon: Award },
  { label: 'Reports', href: '/student/reports', icon: FileText },
  { label: 'Photos', href: '/student/photos', icon: Image },
];

const parentNav: NavItem[] = [
  { label: 'Dashboard', href: '/parent', icon: LayoutDashboard },
  { label: 'My Child', href: '/parent/my-son', icon: UserCircle },
  { label: 'Progress', href: '/parent/progress', icon: BarChart2 },
  {
    label: 'ILM Meetings', icon: Calendar,
    children: [
      { label: 'Meetings', href: '/parent/meetings', icon: Calendar },
      { label: 'Class Reports', href: '/parent/reports', icon: FileText },
    ],
  },
  { label: 'Awards', href: '/parent/awards', icon: Award },
  { label: 'Photos', href: '/parent/photos', icon: Image },
];

const navByRole: Record<string, NavItem[]> = {
  admin: adminNav,
  student: studentNav,
  parent: parentNav,
};


interface NavItemProps {
  item: NavItem;
  depth?: number;
}

function NavItemComponent({ item, depth = 0 }: NavItemProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() => {
    if (!item.children) return false;
    if (item.label === 'ILM Meetings') return true;
    return item.children.some(c => c.href && pathname.startsWith(c.href));
  });

  useEffect(() => {
    if (item.children && item.children.some(c => c.href && pathname.startsWith(c.href))) {
      setOpen(true);
    }
  }, [pathname, item.children]);

  const Icon = item.icon;
  const isAnyChildActive = item.children?.some(c => c.href && pathname.startsWith(c.href));
  const active = item.href ? pathname === item.href : false;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(o => !o)}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all group',
            isAnyChildActive
              ? 'text-white bg-white/10 font-bold'
              : 'text-slate-300 hover:text-white hover:bg-white/8'
          )}
        >
          <div className="flex items-center gap-2.5">
            {Icon && (
              <Icon
                className={cn(
                  'w-4 h-4 transition-colors',
                  isAnyChildActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-400'
                )}
              />
            )}
            <span>{item.label}</span>
          </div>
          {open ? (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          )}
        </button>
        {open && (
          <div className="ml-4 pl-2 border-l border-slate-800 space-y-0.5 mt-0.5">
            {item.children.map(child => (
              <NavItemComponent key={child.label} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      className={cn(
        'flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all',
        active
          ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/40'
          : 'text-slate-300 hover:text-white hover:bg-white/8',
        depth > 0 && 'pl-3 text-[13px]'
      )}
    >
      {Icon && (
        <Icon className={cn('w-3.5 h-3.5 flex-shrink-0', active ? 'text-white' : 'text-slate-400')} />
      )}
      <span>{item.label}</span>
    </Link>
  );
}

import { WhatsAppPhotoModal, PhotoModalData } from '@/components/ui/whatsapp-photo-modal';

interface AppSidebarProps {
  onClose?: () => void;
}

export function AppSidebar({ onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const { role, user, userName } = useUser();

  const effectiveRole =
    pathname.startsWith('/student')
      ? 'student'
      : pathname.startsWith('/parent')
      ? 'parent'
      : pathname.startsWith('/admin')
      ? 'admin'
      : role;

  const nav = navByRole[effectiveRole] ?? studentNav;
  const [whatsappModalPhoto, setWhatsappModalPhoto] = useState<PhotoModalData | null>(null);
  const [avatarError, setAvatarError] = useState(false);

  // Resolve user info dynamically from active login session
  const displayAdmissionNo = user.admissionNo;
  const displayClassName = user.className || (effectiveRole === 'student' && user.admissionNo ? 'VAHDA' : undefined);
  const displayUserName =
    effectiveRole === 'student'
      ? (user.studentName || (user.admissionNo ? `Student #${user.admissionNo}` : ''))
      : effectiveRole === 'parent'
      ? (user.childName ? `Parent of ${user.childName}` : 'Parent')
      : (user.adminName || 'Ustadh Abdullah');

  const studentPhoto = user.photoUrl || (displayAdmissionNo ? `/students/${displayAdmissionNo}.jpg` : undefined);
  const childPhoto = user.childPhotoUrl || (user.childAdmissionNo ? `/students/${user.childAdmissionNo}.jpg` : undefined);
  const adminPhoto = user.adminPhotoUrl || '/avatars/admin.jpg';
  const userPhoto = effectiveRole === 'admin' ? adminPhoto : effectiveRole === 'student' ? studentPhoto : childPhoto;

  useEffect(() => {
    setAvatarError(false);
  }, [userPhoto]);

  const initials = displayUserName
    ? displayUserName
        .split(' ')
        .map(p => p[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <>
      <div className="w-full flex flex-col h-full bg-slate-950 text-slate-100 flex-shrink-0 select-none">
        {/* Academy Brand Header — Seamlessly integrated with full dark luxury theme */}
        <div className="w-full p-4 border-b border-slate-800/80 flex-shrink-0 bg-slate-950 relative overflow-hidden">
          {/* Subtle warm ambient glow */}
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-28 h-28 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-6 -mb-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 w-full">
            <div className="flex items-center gap-3.5">
              {/* Prestigious Academy Crest Emblem */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-500 p-0.5 shadow-lg shadow-amber-400/20 flex-shrink-0">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex flex-col items-center justify-center text-amber-300">
                  <BookMarked className="w-6 h-6 stroke-[2.3] text-amber-400" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-black tracking-widest text-amber-300 uppercase">
                    MDIA
                  </span>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    ILM Portal
                  </span>
                </div>
                <h2 className="text-sm font-black tracking-tight text-white leading-tight mt-0.5 truncate">
                  Malik Deenar
                </h2>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase leading-tight truncate">
                  Islamic Academy
                </p>
              </div>
            </div>

            {/* Program Sub-badge */}
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-300 font-medium truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Public Speaking &amp; Leadership
              </span>
              <span className="font-mono font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded text-[10px] border border-amber-400/20">
                2026–27
              </span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Main navigation">
          {nav.map(item => (
            <NavItemComponent key={item.href ?? item.label} item={item} />
          ))}

          {/* Academic Term Progress & Cohort Widget (fills middle empty space with high utility) */}
          <div className="mt-6 mx-1 p-3.5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-indigo-950/40 border border-slate-800/80 shadow-md" suppressHydrationWarning>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-amber-300 flex items-center gap-1.5" suppressHydrationWarning>
                <GraduationCap className="w-4 h-4 text-amber-400" />
                Class {displayClassName || (effectiveRole === 'student' ? 'VAHDA' : 'Active')}
              </span>
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Official ILM Leadership Class
            </p>
            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>Term Progress</span>
              <span className="font-mono font-bold text-indigo-300">Meeting #01 Done</span>
            </div>
          </div>
        </nav>

        {/* Bottom: Official Academy ID Profile Card with WhatsApp Lightbox Preview */}
        <div className="p-3.5 border-t border-slate-800/80 flex-shrink-0 bg-slate-900/80">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 shadow-xl transition-all">
            <div className="flex items-center gap-3.5">
              {/* Photo with click-to-preview WhatsApp style */}
              <div
                onClick={() => {
                  setWhatsappModalPhoto({
                    name: displayUserName,
                    admissionNo: displayAdmissionNo,
                    className: displayClassName,
                    photoUrl: userPhoto,
                    fatherName: user.fatherName,
                  });
                }}
                className="relative flex-shrink-0 cursor-pointer group"
                title="Click to view full photo (WhatsApp style)"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl overflow-hidden ring-2 ring-indigo-500/40 shadow-lg group-hover:ring-indigo-400 group-hover:scale-105 transition-all bg-slate-800 p-0.5">
                  {userPhoto && !avatarError ? (
                    <img
                      src={userPhoto}
                      alt={displayUserName}
                      onError={() => setAvatarError(true)}
                      className="w-full h-full object-cover object-top rounded-[14px]"
                    />
                  ) : (
                    <div className="w-full h-full rounded-[14px] bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-600 flex items-center justify-center font-black text-white text-base">
                      {initials}
                    </div>
                  )}
                  {/* WhatsApp-style view hover hint */}
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white drop-shadow" />
                  </div>
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-xs"
                  title="Active"
                />
              </div>

              {/* Name & metadata */}
              <div className="min-w-0 flex-1" suppressHydrationWarning>
                <Link
                  href={effectiveRole === 'student' ? '/student/profile' : effectiveRole === 'parent' ? '/parent/my-son' : '/admin/profile'}
                  className="block group/link"
                >
                  <p className="text-xs sm:text-[13px] font-black text-white group-hover/link:text-indigo-300 truncate transition-colors leading-tight" suppressHydrationWarning>
                    {displayUserName}
                  </p>
                </Link>

                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap" suppressHydrationWarning>
                  {(displayClassName || effectiveRole === 'admin') && (
                    <span className="text-[10px] font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-700/50" suppressHydrationWarning>
                      {effectiveRole === 'admin'
                        ? 'Admin Staff'
                        : effectiveRole === 'student'
                        ? `Class: ${displayClassName || 'VAHDA'}`
                        : 'Parent'}
                    </span>
                  )}
                  {displayAdmissionNo && (
                    <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-600/30" suppressHydrationWarning>
                      #{displayAdmissionNo}
                    </span>
                  )}
                </div>

                {/* Quick Action: Click to view photo */}
                <button
                  type="button"
                  onClick={() => {
                    setWhatsappModalPhoto({
                      name: displayUserName,
                      admissionNo: displayAdmissionNo,
                      className: displayClassName,
                      photoUrl: userPhoto,
                      fatherName: user.fatherName,
                    });
                  }}
                  className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-1.5 group-hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Tap to view photo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp-style Photo Modal */}
      <WhatsAppPhotoModal
        data={whatsappModalPhoto}
        onClose={() => setWhatsappModalPhoto(null)}
      />
    </>
  );
}
