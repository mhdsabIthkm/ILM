'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import {
  allStudents,
  getStudentsByClassNum,
  vahdaStudents,
  findStudentByAdmissionNo,
} from '@/lib/mock-data/students';
import { classYears } from '@/lib/mock-data/cohorts';
import { StudentAvatar } from '@/components/ui/student-avatar';
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
  ShieldCheck,
  Eye,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CLASS_OPTIONS = [
  { id: 'cy-vahda-2627', name: 'VAHDA', num: 4 },
  { id: 'cy-sada-2627', name: "SA'DA", num: 1 },
  { id: 'cy-sidra-2627', name: 'SIDRA', num: 2 },
  { id: 'cy-suffa-2627', name: 'SUFFA', num: 3 },
  { id: 'cy-class5-2627', name: 'HUDA', num: 5 },
  { id: 'cy-alfa-2627', name: 'ALFA', num: 6 },
  { id: 'cy-class7-2627', name: 'SAFWA', num: 7 },
  { id: 'cy-degree1-2627', name: 'THUFA', num: 8 },
  { id: 'cy-degree2-2627', name: 'NAJWA', num: 9 },
  { id: 'cy-degree3-2627', name: 'WIDAD', num: 10 },
  { id: 'all', name: 'All Classes', num: 0 },
];

export default function StudentClassPage() {
  const { user } = useUser();
  const [selectedClassId, setSelectedClassId] = useState('cy-vahda-2627');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activePhotoModal, setActivePhotoModal] = useState<PhotoModalData | null>(null);

  // Find current student record
  const currentStudent = user.admissionNo
    ? findStudentByAdmissionNo(user.admissionNo)
    : null;

  const currentClassName = currentStudent?.className ?? user.className ?? 'VAHDA';

  const classOptions = CLASS_OPTIONS.map(c => ({
    ...c,
    isMyClass: c.name.toLowerCase() === currentClassName.toLowerCase(),
  }));

  // Determine which students to show
  let targetStudents = allStudents;
  if (selectedClassId !== 'all') {
    const selectedOption = classOptions.find(c => c.id === selectedClassId);
    if (selectedOption?.num === 4 || selectedOption?.name === 'VAHDA') {
      targetStudents = vahdaStudents;
    } else if (selectedOption && selectedOption.num > 0) {
      targetStudents = getStudentsByClassNum(selectedOption.num);
      if (targetStudents.length === 0) {
        targetStudents = allStudents.filter(s => s.classYearId === selectedClassId || s.className === selectedOption.name);
      }
    } else {
      targetStudents = allStudents.filter(s => s.classYearId === selectedClassId);
    }
  }

  // Filter students by search query
  const filteredStudents = targetStudents.filter(s => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      s.name.toLowerCase().includes(query) ||
      s.admissionNo.includes(query) ||
      (s.className && s.className.toLowerCase().includes(query))
    );
  });

  const selectedClassObj = classOptions.find(c => c.id === selectedClassId);
  const isMyClassSelected = selectedClassObj?.isMyClass || selectedClassObj?.name === currentClassName;

  const openWhatsAppPhoto = (s: typeof targetStudents[0]) => {
    setActivePhotoModal({
      name: s.name,
      admissionNo: s.admissionNo,
      className: s.className || selectedClassObj?.name || currentClassName,
      photoUrl: s.avatarUrl || `/students/${s.admissionNo}.jpg`,
      studentId: s.id,
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-40 h-40 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200 mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              Academic Year 2026–27 · MDIA Academy
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isMyClassSelected ? `My Class — ${selectedClassObj?.name}` : selectedClassId === 'all' ? 'All Classes Student Directory' : `Class — ${selectedClassObj?.name}`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              {targetStudents.length} enrolled students. Click any student&apos;s photo to view their high-resolution photo and profile details.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/60 flex items-center justify-center text-white">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-black leading-none">{targetStudents.length}</p>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold mt-0.5">
                Students
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Class Selector Switcher - Easily switch to other classes or all students */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
          <span>SELECT CLASS TO VIEW STUDENTS &amp; PHOTOS:</span>
          <Link href="/student/meetings" className="text-indigo-600 hover:underline">
            View ILM Meetings →
          </Link>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {classOptions.map(c => {
            const isSelected = selectedClassId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedClassId(c.id)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border shadow-2xs',
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 border-gray-200 hover:bg-slate-50 hover:border-gray-300'
                )}
              >
                <span>{c.name}</span>
                {c.isMyClass && (
                  <span className={cn(
                    'text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-extrabold',
                    isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-indigo-100 text-indigo-700'
                  )}>
                    My Class
                  </span>
                )}
              </button>
            );
          })}
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
            placeholder={`Search ${targetStudents.length} students by name, admission #, or class...`}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
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
            title="List roster view"
          >
            <List className="w-3.5 h-3.5" />
            <span>Roster</span>
          </button>
        </div>
      </div>

      {/* Student Count / Results Notice */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredStudents.length}</strong> of {targetStudents.length} students
        </span>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Tip: Click any student photo to preview full image
        </span>
      </div>

      {/* GRID VIEW: Visual ID Cards with Prominent Photos */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredStudents.map((s, idx) => {
            const isMe = user.admissionNo === s.admissionNo || user.studentId === s.id;

            return (
              <div
                key={s.id}
                onClick={() => openWhatsAppPhoto(s)}
                className={cn(
                  'group bg-white rounded-2xl border p-4 shadow-xs hover:shadow-md transition-all cursor-pointer relative flex items-center gap-3.5 overflow-hidden',
                  isMe
                    ? 'border-indigo-300 ring-2 ring-indigo-500/20 bg-indigo-50/20'
                    : 'border-gray-200 hover:border-indigo-300'
                )}
              >
                {/* Roll index indicator */}
                <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-indigo-400 transition-colors absolute top-2 right-3">
                  #{idx + 1}
                </span>

                {/* Avatar with click-to-preview WhatsApp style */}
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

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 truncate transition-colors leading-tight">
                      {s.name}
                    </h3>
                    {isMe && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-indigo-600 text-white flex-shrink-0 shadow-2xs">
                        You
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      Adm #{s.admissionNo}
                    </span>
                    {s.className && (
                      <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                        {s.className}
                      </span>
                    )}
                  </div>

                  <p className="text-[10px] text-indigo-600 font-semibold mt-1.5 flex items-center gap-1 group-hover:underline">
                    <Eye className="w-3 h-3" /> View Photo &amp; Details
                  </p>
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
                          <span className="font-semibold text-indigo-700">{s.className}</span>
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
