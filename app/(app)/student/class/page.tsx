'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import {
  allStudents,
  findStudentByAdmissionNo,
} from '@/lib/mock-data/students';
import { classYears } from '@/lib/mock-data/cohorts';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { ClassAvatar } from '@/components/ui/class-avatar';
import { getClassCharacter } from '@/lib/mock-data/class-characters';
import { getClassDetailInfo } from '@/lib/mock-data/class-details';
import {
  WhatsAppPhotoModal,
  PhotoModalData,
} from '@/components/ui/whatsapp-photo-modal';
import {
  GraduationCap,
  Users,
  Search,
  LayoutGrid,
  List,
  Sparkles,
  Eye,
  Award,
  Calendar,
  Star,
  BookOpen,
  ChevronRight,
  School,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LEVEL_CLASS_NAMES } from '@/app/(app)/student/classes/page';

export default function StudentClassPage() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activePhotoModal, setActivePhotoModal] = useState<PhotoModalData | null>(null);

  // Find current student record & determine their official class
  const currentStudent = user.admissionNo
    ? findStudentByAdmissionNo(user.admissionNo)
    : null;

  const currentClassName = currentStudent?.className ?? user.className ?? 'VAHDA';
  
  const myClassObj =
    classYears.find(
      c => c.displayName.toUpperCase() === currentClassName.toUpperCase() && c.academicYearId === 'ay-2026-27'
    ) ||
    classYears.find(c => c.id === currentStudent?.classYearId) ||
    classYears[3]; // Fallback to VAHDA

  // The student's "My Class" interface strictly shows their own class only
  const classStudents = allStudents.filter(
    s => s.classYearId === myClassObj.id || s.className?.toUpperCase() === myClassObj.displayName.toUpperCase()
  );

  const character = getClassCharacter(myClassObj.displayName);
  const detailInfo = getClassDetailInfo(myClassObj.id);

  // Filter classmates by search query
  const filteredStudents = classStudents.filter(s => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      s.name.toLowerCase().includes(query) ||
      s.admissionNo.includes(query)
    );
  });

  const openWhatsAppPhoto = (s: typeof classStudents[0]) => {
    setActivePhotoModal({
      name: s.name,
      admissionNo: s.admissionNo,
      className: myClassObj.displayName,
      photoUrl: s.avatarUrl || `/students/${s.admissionNo}.jpg`,
      studentId: s.id,
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Hero Banner — Strictly for the Logged-in Student's Class */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-40 h-40 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Mascot Character Avatar with Centered Face */}
            <ClassAvatar
              name={myClassObj.displayName}
              level={myClassObj.level}
              size="2xl"
              className="w-18 h-18 sm:w-22 sm:h-22 ring-4 ring-white/25 shadow-xl flex-shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200 mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                Academic Year 2026–27 · Your Official Class
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  My Class — {myClassObj.displayName}
                </h1>
                {character && (
                  <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 backdrop-blur-md flex items-center gap-1">
                    <span>Mascot:</span>
                    <span>{character.characterName}</span>
                  </span>
                )}
              </div>
              {!myClassObj.ilmEnabled ? (
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20">
                    <School className="w-3.5 h-3.5 text-amber-400" />
                    <span>{LEVEL_CLASS_NAMES[myClassObj.level] || `Class ${myClassObj.level}`} · Academic Year 2026–27</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/40 backdrop-blur-md px-3 py-1 rounded-xl border border-emerald-400/30">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{classStudents.length} Enrolled Scholars</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-200 bg-indigo-900/40 backdrop-blur-md px-3 py-1 rounded-xl border border-indigo-400/30">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
                    <span>{myClassObj.level >= 8 ? 'Degree Stream' : 'Secondary Stream'}</span>
                  </span>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                  {detailInfo?.focusDescription || `You are enrolled in Class ${myClassObj.displayName} with ${classStudents.length} classmates.`}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start md:self-auto flex-shrink-0">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/70 flex items-center justify-center text-white">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black leading-none">{classStudents.length}</p>
                <p className="text-[10px] text-slate-300 uppercase tracking-wider font-extrabold mt-0.5">
                  Classmates
                </p>
              </div>
            </div>

            <Link
              href="/student/classes"
              className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all backdrop-blur-md shadow-xs group"
              title="Explore all 10 academy classes & student directory"
            >
              <School className="w-4 h-4 text-amber-300" />
              <span>All Classes</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Class Metric Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Class Level</p>
          <p className="text-lg font-black text-slate-900 mt-0.5">{LEVEL_CLASS_NAMES[myClassObj.level] || `Class ${myClassObj.level}`}</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{myClassObj.displayName} Batch</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Attendance</p>
          <p className="text-lg font-black text-slate-400 mt-0.5">---</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Class Average</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Presentations</p>
          <p className="text-lg font-black text-slate-400 mt-0.5">---</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Total Sessions</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Class Status</p>
          <p className="text-lg font-black text-slate-900 mt-0.5">
            {myClassObj.ilmEnabled ? 'ILM Active' : 'Degree Class'}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">MDIA Academy</p>
        </div>
      </div>

      {/* Search & View Controls Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Search ${classStudents.length} classmates in ${myClassObj.displayName} by name or admission #...`}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-end sm:self-auto border border-gray-200/80">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              viewMode === 'grid'
                ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            )}
            title="Grid card view with photos"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              viewMode === 'list'
                ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            )}
            title="Compact table view"
          >
            <List className="w-3.5 h-3.5" />
            <span>Roster</span>
          </button>
        </div>
      </div>

      {/* Classmates Cards Grid View */}
      {/* CARDS / GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredStudents.map((s, idx) => {
            const isMe = s.admissionNo === user.admissionNo;

            return (
              <div
                key={s.id}
                onClick={() => openWhatsAppPhoto(s)}
                className={cn(
                  'group bg-white rounded-2xl border p-4 shadow-xs hover:shadow-md transition-all cursor-pointer relative flex items-center justify-between gap-3.5 overflow-hidden',
                  isMe
                    ? 'border-indigo-400 ring-2 ring-indigo-100 bg-indigo-50/20'
                    : 'border-gray-200 hover:border-indigo-300'
                )}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="relative flex-shrink-0">
                    <StudentAvatar
                      name={s.name}
                      admissionNo={s.admissionNo}
                      size="lg"
                      className="group-hover:scale-105 group-hover:ring-2 group-hover:ring-indigo-500 transition-all shadow-2xs"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white drop-shadow" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 truncate transition-colors leading-snug">
                        {s.name}
                      </h3>
                      {isMe && (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider bg-indigo-600 text-white px-1.5 py-0.2 rounded-full">
                          You
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/80">
                        #{s.admissionNo}
                      </span>
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                        Class {myClassObj.displayName} Scholar
                      </span>
                    </div>
                  </div>
                </div>

                {/* Serial Number Badge & Actions */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0 pl-1">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80 group-hover:bg-indigo-50 group-hover:text-indigo-700 group-hover:border-indigo-200 transition-colors shadow-2xs">
                    #{idx + 1}
                  </span>
                  <span className="text-[10px] text-indigo-600 font-bold group-hover:underline flex items-center gap-0.5">
                    <Eye className="w-3 h-3" /> View
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW: Clean Roster Table */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filteredStudents.map((s, idx) => {
              const isMe = user.admissionNo === s.admissionNo || user.studentId === s.id;

              return (
                <div
                  key={s.id}
                  onClick={() => openWhatsAppPhoto(s)}
                  className={cn(
                    'p-3.5 sm:px-5 flex items-center gap-3.5 hover:bg-slate-50 transition-colors cursor-pointer',
                    isMe && 'bg-indigo-50/30'
                  )}
                >
                  <span className="text-xs font-mono font-bold text-slate-400 w-6 flex-shrink-0 text-center">
                    {idx + 1}
                  </span>

                  <StudentAvatar
                    name={s.name}
                    admissionNo={s.admissionNo}
                    size="md"
                    className="flex-shrink-0"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {s.name}
                      </p>
                      {isMe && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-indigo-600 text-white">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="font-mono">Adm #{s.admissionNo}</span>
                      {s.className && (
                        <>
                          <span>·</span>
                          <span className="font-semibold text-indigo-700">Class {s.className} Scholar</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold flex-shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Photo</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* WhatsApp Full-Screen Photo Modal */}
      <WhatsAppPhotoModal
        data={activePhotoModal}
        onClose={() => setActivePhotoModal(null)}
      />
    </div>
  );
}
