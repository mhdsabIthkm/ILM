'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import {
  LogOut, UserCircle, ChevronDown, Shield, Mail,
  GraduationCap, Users, BookOpen, Star, Sparkles,
  ExternalLink, CheckCircle2, Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WhatsAppPhotoModal, PhotoModalData } from '@/components/ui/whatsapp-photo-modal';

export function UserProfileMenu() {
  const pathname = usePathname();
  const { user, role, userName, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [photoModalData, setPhotoModalData] = useState<PhotoModalData | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    router.push('/login');
  };

  const effectiveRole =
    pathname.startsWith('/student')
      ? 'student'
      : pathname.startsWith('/parent')
      ? 'parent'
      : pathname.startsWith('/admin')
      ? 'admin'
      : role;

  const profileHref =
    effectiveRole === 'student'
      ? '/student/profile'
      : effectiveRole === 'parent'
      ? '/parent/my-son'
      : '/admin/profile';

  // Role color styles
  const roleStyles = {
    admin: {
      badge: 'bg-purple-100 text-purple-800 border-purple-200',
      gradient: 'from-slate-900 via-indigo-950 to-slate-900',
      label: 'Admin Staff',
      dot: 'bg-purple-500',
    },
    student: {
      badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      gradient: 'from-indigo-950 via-slate-900 to-indigo-950',
      label: user.className ? `Class ${user.className}` : 'Student',
      dot: 'bg-emerald-500',
    },
    parent: {
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      gradient: 'from-emerald-950 via-slate-900 to-teal-950',
      label: 'Parent',
      dot: 'bg-teal-500',
    },
  }[effectiveRole] ?? {
    badge: 'bg-slate-100 text-slate-800 border-slate-200',
    gradient: 'from-slate-900 to-slate-800',
    label: effectiveRole,
    dot: 'bg-slate-400',
  };

  const displayUserName =
    effectiveRole === 'student'
      ? (user.studentName || (user.admissionNo ? `Student #${user.admissionNo}` : ''))
      : effectiveRole === 'parent'
      ? (user.childName ? `Parent of ${user.childName}` : 'Parent')
      : (user.adminName || 'Ustadh Abdullah');

  // Initials for avatar fallback
  const initials = displayUserName
    ? displayUserName
        .split(' ')
        .map(p => p[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const adminEmail = user.adminEmail || 'kunjonkunjon@ilm.org';
  const adminPhoto = user.adminPhotoUrl || '/avatars/admin.jpg';
  const studentPhoto = user.photoUrl || (user.admissionNo ? `/students/${user.admissionNo}.jpg` : undefined);
  const childPhoto = user.childPhotoUrl || (user.childAdmissionNo ? `/students/${user.childAdmissionNo}.jpg` : undefined);
  const userPhoto = effectiveRole === 'admin' ? adminPhoto : effectiveRole === 'student' ? studentPhoto : childPhoto;

  const [avatarLoadError, setAvatarLoadError] = useState(false);

  useEffect(() => {
    setAvatarLoadError(false);
  }, [userPhoto]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2.5 p-1 sm:pl-2 sm:pr-3 py-1 rounded-xl transition-all',
          'border border-transparent hover:border-gray-200 hover:bg-slate-50',
          isOpen && 'bg-slate-100 border-gray-200 ring-2 ring-indigo-500/20'
        )}
        aria-label="User profile and account options"
        aria-expanded={isOpen}
      >
        {/* Avatar with live status dot */}
        <div className="relative w-8 h-8 rounded-full flex-shrink-0">
          {userPhoto && !avatarLoadError ? (
            <div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-300/50 shadow-sm relative bg-slate-800">
              <img
                src={userPhoto}
                alt={userName}
                onError={() => setAvatarLoadError(true)}
                className="w-full h-full object-cover object-top"
              />
            </div>
          ) : (
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm',
              role === 'student' ? 'bg-gradient-to-tr from-indigo-600 to-blue-500' : role === 'parent' ? 'bg-gradient-to-tr from-emerald-600 to-teal-500' : 'bg-slate-800'
            )}>
              {initials}
            </div>
          )}
          <span
            className={cn(
              'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white',
              roleStyles.dot
            )}
            title="Active"
          />
        </div>

        {/* User Info (hidden on small screens) */}
        <div className="text-left hidden sm:block">
          <p className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[130px]">
            {userName}
          </p>
          <p className="text-[10px] text-slate-400 leading-tight truncate max-w-[130px]">
            {role === 'admin'
              ? adminEmail
              : role === 'student'
              ? `${user.className ?? 'ILM'} · #${user.admissionNo ?? ''}`
              : `Child: ${user.childName?.split(' ')[0] ?? 'Student'}`}
          </p>
        </div>

        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 text-slate-400 transition-transform duration-200 hidden sm:block',
            isOpen && 'rotate-180 text-slate-700'
          )}
        />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Header Banner */}
          <div className={cn('p-4 text-white relative bg-gradient-to-br', roleStyles.gradient)}>
            <div className="flex items-start gap-3.5 relative z-10">
              {/* Photo / Avatar with click-to-preview */}
              <div
                onClick={() => {
                  setPhotoModalData({
                    name: userName,
                    admissionNo: user.admissionNo || user.childAdmissionNo,
                    className: user.className || user.childClassName,
                    photoUrl: userPhoto,
                    fatherName: user.fatherName,
                  });
                }}
                className="relative cursor-pointer group"
                title="Click to view full photo (WhatsApp style)"
              >
                {userPhoto && !avatarLoadError ? (
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/30 shadow-md bg-slate-800 flex-shrink-0 group-hover:ring-2 group-hover:ring-white/80 transition-all">
                    <img
                      src={userPhoto}
                      alt={userName}
                      onError={() => setAvatarLoadError(true)}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                    />
                  </div>
                ) : (
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-md border-2 border-white/20 flex-shrink-0',
                    role === 'student' ? 'bg-gradient-to-tr from-indigo-600 to-blue-500' : role === 'parent' ? 'bg-gradient-to-tr from-emerald-600 to-teal-500' : 'bg-slate-800'
                  )}>
                    {initials}
                  </div>
                )}
                {role === 'admin' && (
                  <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 shadow">
                    <Shield className="w-3 h-3 fill-current" />
                  </div>
                )}
              </div>

              {/* Title & info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/15 text-white/90 backdrop-blur-sm">
                    {roleStyles.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mt-1 truncate">
                  {userName}
                </h3>

                {/* Subtitle based on role */}
                {role === 'admin' && (
                  <div className="flex items-center gap-1 text-[11px] text-indigo-200 mt-0.5 truncate">
                    <Mail className="w-3 h-3 flex-shrink-0 text-indigo-300" />
                    <span className="truncate">{adminEmail}</span>
                  </div>
                )}

                {role === 'student' && (
                  <div className="flex items-center gap-1.5 text-[11px] text-indigo-200 mt-0.5 flex-wrap">
                    <span className="font-medium text-white">Adm. #{user.admissionNo}</span>
                    <span>·</span>
                    <span className="font-semibold text-amber-300">{user.className}</span>
                  </div>
                )}

                {role === 'parent' && (
                  <div className="text-[11px] text-emerald-200 mt-0.5 truncate">
                    Parent of <strong className="text-white">{user.childName}</strong> (Adm. #{user.childAdmissionNo})
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Details Box */}
          <div className="p-3 bg-slate-50/80 border-b border-gray-100 text-xs text-slate-600 space-y-1.5">
            {role === 'admin' && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Designation</span>
                  <span className="font-medium text-slate-700">Academy Administrator</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Managed Classes</span>
                  <span className="font-medium text-indigo-700">All 10 Classes · MDIA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Program</span>
                  <span className="font-medium text-slate-700">ILM Mentorship &amp; Public Speaking</span>
                </div>
              </>
            )}

            {role === 'student' && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Class</span>
                  <span className="font-bold text-indigo-700">{user.className}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Admission No.</span>
                  <span className="font-mono font-bold text-slate-700">#{user.admissionNo}</span>
                </div>
              </>
            )}

            {role === 'parent' && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Child&apos;s Class</span>
                  <span className="font-bold text-emerald-700">{user.childClassName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Admission No.</span>
                  <span className="font-medium text-slate-700">{user.childAdmissionNo}</span>
                </div>
              </>
            )}
          </div>

          {/* Navigation Links */}
          <div className="p-2 space-y-0.5">
            <Link
              href={profileHref}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-xl transition-colors"
            >
              <UserCircle className="w-4 h-4 text-indigo-500" />
              <span>View Full Profile</span>
              <span className="ml-auto text-[10px] text-slate-400">Details &rarr;</span>
            </Link>

            {role === 'student' && (
              <>
                <Link
                  href="/student/evaluations"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-xl transition-colors"
                >
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>My Evaluations &amp; Feedback</span>
                </Link>
                <Link
                  href="/student/class"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-xl transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                  <span>Class {user.className} Members</span>
                </Link>
              </>
            )}

            {role === 'admin' && (
              <>
                <Link
                  href="/admin/students"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-xl transition-colors"
                >
                  <Users className="w-4 h-4 text-indigo-500" />
                  <span>Student Directory (All 278)</span>
                </Link>
                <Link
                  href="/admin/classes"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-xl transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span>All 10 Academy Classes</span>
                </Link>
              </>
            )}
          </div>


        </div>
      )}

      {/* WhatsApp Photo Lightbox Modal */}
      <WhatsAppPhotoModal
        data={photoModalData}
        onClose={() => setPhotoModalData(null)}
      />
    </div>
  );
}
