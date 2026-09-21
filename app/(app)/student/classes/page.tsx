'use client';

import { useState } from 'react';
import Link from 'next/link';
import { classYears } from '@/lib/mock-data/cohorts';
import { allStudents } from '@/lib/mock-data/students';
import { getClassCharacter } from '@/lib/mock-data/class-characters';
import { getClassDetailInfo } from '@/lib/mock-data/class-details';
import { ClassAvatar } from '@/components/ui/class-avatar';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  WhatsAppPhotoModal,
  PhotoModalData,
} from '@/components/ui/whatsapp-photo-modal';
import {
  School,
  Users,
  Search,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Award,
  ArrowRight,
  Calendar,
  Layers,
  LayoutGrid,
  ListFilter,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Filter the 10 distinct classes for 2026-27 in level order
const currentClasses = classYears
  .filter(cy => cy.academicYearId === 'ay-2026-27' && cy.id !== 'cy-level5-2627')
  .sort((a, b) => a.level - b.level);

export default function StudentClassesDirectoryPage() {
  const [activeTab, setActiveTab] = useState<'classes' | 'students'>('classes');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'ilm' | 'degree'>('all');
  const [activePhotoModal, setActivePhotoModal] = useState<PhotoModalData | null>(null);

  // Filter classes
  const filteredClasses = currentClasses.filter(cy => {
    // Category filter
    if (activeCategory === 'ilm' && !cy.ilmEnabled) return false;
    if (activeCategory === 'degree' && cy.ilmEnabled) return false;

    // Search query
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    const character = getClassCharacter(cy.displayName);
    const detail = getClassDetailInfo(cy.id);

    return (
      cy.displayName.toLowerCase().includes(query) ||
      `level ${cy.level}`.includes(query) ||
      character?.characterName.toLowerCase().includes(query) ||
      detail?.category.toLowerCase().includes(query)
    );
  });

  // Filter students (for the Student Register tab or universal search)
  const filteredStudents = allStudents.filter(s => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      s.name.toLowerCase().includes(query) ||
      s.admissionNo.includes(query) ||
      s.className?.toLowerCase().includes(query)
    );
  });

  const openStudentModal = (s: typeof allStudents[0]) => {
    setActivePhotoModal({
      name: s.name,
      admissionNo: s.admissionNo,
      className: s.className || 'Class',
      photoUrl: s.avatarUrl || `/students/${s.admissionNo}.jpg`,
      studentId: s.id,
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-52 h-52 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-44 h-44 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200 mb-2.5">
              <School className="w-3.5 h-3.5 text-amber-400" />
              MDIA Academy · 10 Classes &amp; Student Register
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              All Classes &amp; Student Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-xl leading-relaxed">
              Explore the 10 academic batches, character mascots, and enrolled scholars. Click into any class to view its member roster and high-definition photo cards.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 self-start md:self-auto flex-shrink-0">
            <div className="text-center px-2">
              <p className="text-2xl font-black text-amber-300">10</p>
              <p className="text-[10px] uppercase font-bold text-slate-300">Classes</p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center px-2">
              <p className="text-2xl font-black text-white">{allStudents.length}</p>
              <p className="text-[10px] uppercase font-bold text-slate-300">Scholars</p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center px-2">
              <p className="text-2xl font-black text-indigo-300">5</p>
              <p className="text-[10px] uppercase font-bold text-slate-300">ILM Batches</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls: Tabs, Filters, & Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Main View Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start">
            <button
              onClick={() => setActiveTab('classes')}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all',
                activeTab === 'classes'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <School className="w-3.5 h-3.5" />
              <span>10 Classes</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700">10</span>
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all',
                activeTab === 'students'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Student Register</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-700">{allStudents.length}</span>
            </button>
          </div>

          {/* Sub-Filters for Classes tab */}
          {activeTab === 'classes' && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setActiveCategory('all')}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                  activeCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                All 10 Batches
              </button>
              <button
                onClick={() => setActiveCategory('ilm')}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                  activeCategory === 'ilm'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                ILM Active (5)
              </button>
              <button
                onClick={() => setActiveCategory('degree')}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                  activeCategory === 'degree'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                Degree &amp; Secondary (5)
              </button>
            </div>
          )}
        </div>

        {/* Real-time Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === 'classes'
                ? 'Search classes by name (e.g. WIDAD, VAHDA), level, mascot character (e.g. WALL-E, Bob, Stitch)...'
                : 'Search all 304 students by name, admission number, or class...'
            }
            className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
      </div>

      {/* Tab 1: 10 Classes Grid View */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClasses.map(cy => {
            const classStudents = allStudents.filter(
              s => s.classYearId === cy.id || (cy.id === 'cy-class5-2627' && s.classNum === 5)
            );
            const previewStudents = classStudents.slice(0, 6);
            const character = getClassCharacter(cy.displayName);
            const detail = getClassDetailInfo(cy.id);

            return (
              <div
                key={cy.id}
                className={cn(
                  'group bg-white rounded-3xl border border-gray-200 hover:border-indigo-400 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden',
                  !cy.ilmEnabled && 'bg-slate-50/30 hover:bg-white'
                )}
              >
                <div>
                  {/* Card Header: Avatar, Name, Level, Mascot */}
                  <div className="flex items-start gap-4">
                    {/* Character Mascot Avatar with centered face */}
                    <ClassAvatar
                      name={cy.displayName}
                      level={cy.level}
                      size="xl"
                      className="w-16 h-16 sm:w-18 sm:h-18 ring-4 ring-indigo-50 group-hover:ring-indigo-100 group-hover:scale-105 transition-all shadow-sm flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-extrabold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
                          {cy.displayName}
                        </h2>
                        {character && (
                          <span className="text-[11px] font-bold text-slate-700 bg-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-700 border border-slate-200/80 px-2.5 py-0.5 rounded-full transition-colors flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            {character.characterName}
                          </span>
                        )}
                        <StatusBadge
                          status={cy.ilmEnabled ? 'ilm' : 'no_ilm'}
                          label={cy.ilmEnabled ? 'ILM' : 'Degree'}
                          showDot={false}
                        />
                      </div>

                      <p className="text-xs font-bold text-indigo-700 mt-1">
                        Level {cy.level} · {cy.displayName} Cohort
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                        {detail?.focusDescription || detail?.category || `Official Academic Class Level ${cy.level}`}
                      </p>
                    </div>
                  </div>

                  {/* Class Stats Row */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-gray-100">
                    <div className="bg-slate-50 p-2.5 rounded-xl text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Scholars</p>
                      <p className="text-sm font-black text-slate-800">{classStudents.length}</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Attendance</p>
                      <p className="text-sm font-black text-emerald-700">{detail?.attendanceRate || '95%'}</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Sessions</p>
                      <p className="text-sm font-black text-indigo-700">{detail?.totalStageAppearances || 30}</p>
                    </div>
                  </div>

                  {/* Student Faces Preview */}
                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2 overflow-hidden">
                        {previewStudents.map(st => (
                          <StudentAvatar
                            key={st.id}
                            name={st.name}
                            admissionNo={st.admissionNo}
                            size="sm"
                            className="ring-2 ring-white"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {classStudents.length} enrolled
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors flex items-center gap-0.5">
                      View details
                    </span>
                  </div>
                </div>

                {/* Direct Action Link to Class Details & Members */}
                <Link
                  href={`/student/classes/${cy.id}`}
                  className="mt-4 w-full py-2.5 px-4 bg-slate-900 group-hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs"
                >
                  <span>View Class {cy.displayName} &amp; Members</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Full Student Register Directory */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>
              Showing {filteredStudents.length} of {allStudents.length} registered scholars
            </span>
            <span>Click any student to view their high-definition photo</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredStudents.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => openStudentModal(s)}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer relative flex items-center gap-3.5 overflow-hidden"
              >
                <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-indigo-400 transition-colors absolute top-2.5 right-3">
                  #{idx + 1}
                </span>

                <div className="relative flex-shrink-0">
                  <StudentAvatar
                    name={s.name}
                    admissionNo={s.admissionNo}
                    size="lg"
                    className="group-hover:scale-105 group-hover:ring-2 group-hover:ring-indigo-500 transition-all shadow-2xs"
                  />
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <h3 className="font-extrabold text-slate-900 text-sm truncate group-hover:text-indigo-600 transition-colors">
                    {s.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      #{s.admissionNo}
                    </span>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                      Class {s.className || 'MDIA'}
                    </span>
                  </div>
                  {s.fatherName && (
                    <p className="text-[10px] text-slate-400 truncate mt-1">
                      s/o {s.fatherName}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-200">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-bold text-slate-700">No students match your query</p>
              <p className="text-xs text-slate-400 mt-1">Try searching by a different name, admission number, or class.</p>
            </div>
          )}
        </div>
      )}

      {/* WhatsApp-Style Photo Modal */}
      {activePhotoModal && (
        <WhatsAppPhotoModal
          data={activePhotoModal}
          onClose={() => setActivePhotoModal(null)}
        />
      )}
    </div>
  );
}
