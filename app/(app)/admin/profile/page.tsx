'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { classYears } from '@/lib/mock-data/cohorts';
import { allStudents } from '@/lib/mock-data/students';
import {
  Shield, Mail, Building, GraduationCap, Users, Calendar,
  Key, LogOut, CheckCircle2, Award, Clock, ArrowRight,
  Sparkles, Camera, BookOpen, ChevronRight, UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminProfilePage() {
  const { user, userName, logout, setUser } = useUser();
  const router = useRouter();

  const [activePhoto, setActivePhoto] = useState<string>(
    user.adminPhotoUrl || '/avatars/admin.jpg'
  );
  const [photoSaved, setPhotoSaved] = useState(false);

  const adminEmail = user.adminEmail || 'kunjonkunjon@ilm.org';
  const currentClasses = classYears
    .filter(cy => cy.academicYearId === 'ay-2026-27' && cy.id !== 'cy-level5-2627')
    .sort((a, b) => a.level - b.level);

  const ilmClasses = currentClasses.filter(c => c.ilmEnabled);
  const nonIlmClasses = currentClasses.filter(c => !c.ilmEnabled);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleSwitchPhoto = (url: string) => {
    setActivePhoto(url);
    setUser({ ...user, adminPhotoUrl: url });
    setPhotoSaved(true);
    setTimeout(() => setPhotoSaved(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Administrator Profile</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Staff account credentials, photo, and academy administration scope
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded-xl transition-colors border border-red-200 shadow-2xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              Full Access Administrator
            </span>
          </div>
        </div>

        {/* Profile Content with Overlapping Photo */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 sm:-mt-14 mb-5">
            {/* Photo Avatar Frame */}
            <div className="relative group">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-900 relative">
                <Image
                  src={activePhoto}
                  alt={userName}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-1.5 rounded-full shadow-md border-2 border-white">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Quick Actions / Photo switch options */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-400 font-medium">Portrait:</span>
              <button
                type="button"
                onClick={() => handleSwitchPhoto('/avatars/admin.jpg')}
                className={cn(
                  'px-2.5 py-1 text-xs font-semibold rounded-lg transition-all border',
                  activePhoto === '/avatars/admin.jpg'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-600 border-gray-200 hover:bg-slate-50'
                )}
              >
                Ustadh Portrait
              </button>
              <button
                type="button"
                onClick={() => handleSwitchPhoto('/avatars/admin-alt.jpg')}
                className={cn(
                  'px-2.5 py-1 text-xs font-semibold rounded-lg transition-all border',
                  activePhoto === '/avatars/admin-alt.jpg'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-600 border-gray-200 hover:bg-slate-50'
                )}
              >
                Alt Portrait
              </button>
              {photoSaved && (
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                </span>
              )}
            </div>
          </div>

          {/* Admin Name & Credentials */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{userName}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Verified Staff
              </span>
            </div>
            <p className="text-sm font-medium text-indigo-700">
              Lead ILM Program Coordinator &amp; General Evaluator
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-700">{adminEmail}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>Malik Deenar Islamic Academy (MDIA)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Academic Year 2026–27</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scope of Authority & Academy Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <p className="text-xs text-slate-400 font-medium">Academy Classes</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{currentClasses.length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">All 10 Classes</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <p className="text-xs text-slate-400 font-medium">ILM Active Cohorts</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{ilmClasses.length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">SA&apos;DA, SIDRA, SUFFA, VAHDA, ALFA</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <p className="text-xs text-slate-400 font-medium">Total Students</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{allStudents.length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Full student directory</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <p className="text-xs text-slate-400 font-medium">Administrative Role</p>
          <p className="text-lg font-bold text-emerald-600 mt-1">Super Admin</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Read, Write &amp; Finalize</p>
        </div>
      </div>

      {/* Two Column Grid: Account Details & Managed Classes */}
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Account & Security Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Key className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">Account &amp; Security</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <p className="text-slate-400">Primary Email Address</p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="font-semibold text-slate-800 text-sm">{adminEmail}</p>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-md border border-indigo-200">
                  Primary
                </span>
              </div>
            </div>

            <div>
              <p className="text-slate-400">Authentication Method</p>
              <p className="font-medium text-slate-700 mt-0.5">
                Password Login (`kunjonkunjon`) · Google OAuth Ready
              </p>
            </div>

            <div>
              <p className="text-slate-400">Current Session</p>
              <p className="font-medium text-emerald-600 mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Active on this device
              </p>
            </div>

            <div>
              <p className="text-slate-400">Role Permissions</p>
              <ul className="mt-1 space-y-1 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Meeting evaluation &amp; scoring moderation
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Awards and commendation approvals
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Cohorts, timing rules, and class naming
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Student database &amp; admission numbers
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out of Administrator Account
            </button>
          </div>
        </div>

        {/* Classes Under Administration */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">Classes Under Administration</h3>
            </div>
            <Link
              href="/admin/classes"
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
            >
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-bold text-indigo-900 uppercase tracking-wide">
              ILM Active Classes (5)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ilmClasses.map(cy => (
                <Link
                  key={cy.id}
                  href={`/admin/classes/${cy.id}`}
                  className="p-2.5 rounded-xl border border-indigo-100 bg-indigo-50/40 hover:bg-indigo-50 hover:border-indigo-200 transition-all text-left group"
                >
                  <p className="font-bold text-xs text-slate-900 group-hover:text-indigo-600">
                    {cy.displayName}
                  </p>
                  <p className="text-[10px] text-slate-400">Class {cy.level} · ILM Active</p>
                </Link>
              ))}
            </div>

            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide pt-2">
              Non-ILM Classes (5)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {nonIlmClasses.map(cy => (
                <div
                  key={cy.id}
                  className="p-2.5 rounded-xl border border-gray-200 bg-slate-50/60 text-left opacity-80"
                >
                  <p className="font-semibold text-xs text-slate-800">{cy.displayName}</p>
                  <p className="text-[10px] text-slate-400">Class {cy.level} · No ILM</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
            <Link
              href="/admin/students"
              className="text-slate-600 hover:text-indigo-600 font-medium flex items-center gap-1"
            >
              <Users className="w-3.5 h-3.5 text-slate-400" />
              Manage All 278 Students
            </Link>
            <Link
              href="/admin/administration/settings"
              className="text-slate-600 hover:text-indigo-600 font-medium flex items-center gap-1"
            >
              System Settings &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
