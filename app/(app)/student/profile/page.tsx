'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { getStudent, findStudentByAdmissionNo, allStudents } from '@/lib/mock-data/students';
import { classYears } from '@/lib/mock-data/cohorts';
import { vahdaMeeting1Evaluations, vahdaMeeting1Awards } from '@/lib/mock-data/meetings';
import {
  GraduationCap, Calendar, Star, Award,
  LogOut, ShieldCheck, Building,
  ChevronRight, Eye, MapPin,
} from 'lucide-react';

import { WhatsAppPhotoModal } from '@/components/ui/whatsapp-photo-modal';
import { CampusPhotoModal } from '@/components/ui/campus-photo-modal';

export default function StudentProfilePage() {
  const { user, logout } = useUser();
  const router = useRouter();

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isCampusModalOpen, setIsCampusModalOpen] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  // Dynamically resolve student by user context first, then admission lookup
  const student =
    (user.studentId ? getStudent(user.studentId) : null) ||
    (user.admissionNo ? findStudentByAdmissionNo(user.admissionNo) : null);

  const cy = classYears.find(c => c.id === student?.classYearId);
  const className = user.className ?? cy?.displayName ?? student?.className ?? 'VAHDA';
  const studentName = user.studentName || student?.name || (user.admissionNo ? `Student #${user.admissionNo}` : 'Student');
  const admissionNo = user.admissionNo || student?.admissionNo || '';

  // Direct reactive photo url: priority to user context photo, then local /students/<admissionNo>.jpg
  const photoUrl = user.photoUrl || (admissionNo ? `/students/${admissionNo}.jpg` : null);

  // Auto-reset photoError whenever photoUrl changes
  useEffect(() => {
    setPhotoError(false);
  }, [photoUrl]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const studentId = student?.id ?? user.studentId ?? 'vahda-muhammed';
  const myEvals = vahdaMeeting1Evaluations.filter(e => e.subjectStudentId === studentId);
  const myAwards = vahdaMeeting1Awards.filter(a => a.studentId === studentId);

  const initials = studentName
    .split(' ')
    .map(p => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">

        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Student Profile</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Your official MDIA identity and ILM mentorship records
            </p>
          </div>
        </div>

        {/* Student identity card with subtle campus banner */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Subtle Campus Banner */}
          <div
            onClick={() => setIsCampusModalOpen(true)}
            className="relative h-36 sm:h-44 w-full overflow-hidden cursor-pointer group bg-slate-900"
          >
            <img
              src="/campus.jpg"
              alt="Malik Deenar Islamic Academy Campus"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20">
                <MapPin className="w-3 h-3 text-amber-400" />
                Malik Deenar Campus
              </span>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-semibold text-white/90 border border-white/20 group-hover:bg-black/60 transition-colors">
                <Eye className="w-3 h-3 text-amber-300" />
                View Campus
              </span>
            </div>

            <div className="absolute bottom-2 right-3 text-[10px] text-white/60 font-medium">
              Thalangara, Kasaragod
            </div>
          </div>

          {/* Student details with overlapping avatar */}
          <div className="px-5 pb-5 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14 mb-3">
              {/* Student photo */}
              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="relative group flex-shrink-0 cursor-pointer self-start"
                title="View full photo"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-slate-100 flex items-center justify-center">
                  {photoUrl && !photoError ? (
                    <img
                      key={photoUrl}
                      src={photoUrl}
                      alt={studentName}
                      onError={() => setPhotoError(true)}
                      className="w-full h-full object-cover select-none"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-700 via-blue-600 to-indigo-800 flex flex-col items-center justify-center text-white p-2 text-center">
                      <span className="text-2xl font-bold tracking-wider">{initials}</span>
                      <span className="text-[9px] uppercase tracking-wider text-indigo-200 mt-1 font-semibold">
                        Student
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                    <span className="text-[10px] text-white font-bold bg-black/60 px-2 py-0.5 rounded-full">
                      View
                    </span>
                  </div>
                </div>
              </button>

              {/* Name + tags */}
              <div className="flex-1 min-w-0 space-y-1 sm:mb-1">
                <div className="flex items-center flex-wrap gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">{studentName}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Class: {className}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ILM Active
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <span className="text-slate-400">Adm No:</span>
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {admissionNo}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Malik Deenar Islamic Academy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Assigned Class', value: className, sub: 'Academic Year 2026–27', color: 'text-indigo-600' },
            { label: 'ILM Status', value: 'Enrolled', sub: 'Active Participant', color: 'text-emerald-600' },
            { label: 'Evaluations', value: myEvals.length > 0 ? `${myEvals.length}` : '1', sub: 'Sessions recorded', color: 'text-slate-900' },
            { label: 'Awards Won', value: `${myAwards.length}`, sub: 'Commendations', color: 'text-amber-600' },
          ].map(s => (
            <div key={s.label} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs text-slate-400 font-medium">{s.label}</p>
              <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Details grid */}
        <div className="grid sm:grid-cols-2 gap-5">

          {/* Enrollment Details */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">Enrollment &amp; Academy Details</h3>
            </div>
            <div className="space-y-3 text-xs">
              {[
                { label: 'Student Full Name', value: studentName },
                { label: 'Admission Number', value: admissionNo, mono: true },
                { label: 'Official Class', value: className },
                { label: 'ILM Program', value: 'Active & Eligible', green: true },
                { label: 'Academic Year', value: '2026–27' },
              ].map((row: any) => (
                <div key={row.label} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                  <span className="text-slate-400">{row.label}</span>
                  {row.mono ? (
                    <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {row.value}
                    </span>
                  ) : row.green ? (
                    <span className="font-semibold text-emerald-600">{row.value}</span>
                  ) : (
                    <span className="font-semibold text-slate-800">{row.value}</span>
                  )}
                </div>
              ))}
              {/* Campus link */}
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Campus</span>
                <button
                  type="button"
                  onClick={() => setIsCampusModalOpen(true)}
                  className="inline-flex items-center gap-1.5 font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  <Building className="w-3.5 h-3.5" />
                  Malik Deenar Academy
                  <Eye className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <Link
                href="/student/class"
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                View Class {className} Peers →
              </Link>
            </div>
          </div>

          {/* Mentorship & Progress */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900">ILM Mentorship &amp; Progress</h3>
              </div>
              <Link
                href="/student/evaluations"
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
              >
                Evaluations <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  href: '/student/evaluations',
                  icon: <Star className="w-4 h-4" />,
                  iconBg: 'bg-amber-100 text-amber-700',
                  title: 'Evaluator Feedback & Tags',
                  sub: 'Strengths, improvement focus, and evaluator remarks',
                },
                {
                  href: '/student/meetings',
                  icon: <Calendar className="w-4 h-4" />,
                  iconBg: 'bg-indigo-100 text-indigo-700',
                  title: 'ILM Meetings & Agendas',
                  sub: 'Upcoming meetings and attendance record',
                },
                {
                  href: '/student/awards',
                  icon: <Award className="w-4 h-4" />,
                  iconBg: 'bg-emerald-100 text-emerald-700',
                  title: 'Awards & Certificates',
                  sub: 'Best Speaker, Table Topics, and evaluator accolades',
                },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block p-3 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.iconBg}`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">{item.title}</p>
                        <p className="text-[10px] text-slate-400">{item.sub}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Modals */}
      <WhatsAppPhotoModal
        data={isPhotoModalOpen ? {
          name: studentName,
          admissionNo,
          className,
          photoUrl: photoUrl || undefined,
          fatherName,
        } : null}
        onClose={() => setIsPhotoModalOpen(false)}
      />
      <CampusPhotoModal
        isOpen={isCampusModalOpen}
        onClose={() => setIsCampusModalOpen(false)}
      />
    </>
  );
}
