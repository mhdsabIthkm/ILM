'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { classYears } from '@/lib/mock-data/cohorts';
import { getStudentsByClass } from '@/lib/mock-data/students';
import { allMeetings } from '@/lib/mock-data/meetings';
import { StatusBadge } from '@/components/ui/status-badge';
import { ClassAvatar } from '@/components/ui/class-avatar';
import { getClassCharacter } from '@/lib/mock-data/class-characters';
import { getClassDetailInfo } from '@/lib/mock-data/class-details';
import { StudentAvatar } from '@/components/ui/student-avatar';
import {
  WhatsAppPhotoModal,
  PhotoModalData,
} from '@/components/ui/whatsapp-photo-modal';
import {
  Users,
  Calendar,
  ArrowLeft,
  Award,
  Star,
  AlertCircle,
  LayoutGrid,
  List,
  Search,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  School,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StudentClassDetailPage() {
  const params = useParams();
  const classId = params.id as string;
  const [activeTab, setActiveTab] = useState<'members' | 'overview' | 'awards'>('members');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [activePhotoModal, setActivePhotoModal] = useState<PhotoModalData | null>(null);

  const cy = classYears.find(c => c.id === classId);
  const students = getStudentsByClass(classId);
  const character = cy ? getClassCharacter(cy.displayName) : null;
  const detailInfo = cy ? getClassDetailInfo(cy.id) : null;
  const meetings = allMeetings.filter(m => m.classYearId === classId);

  if (!cy) {
    return (
      <div className="p-10 text-center text-slate-500 max-w-lg mx-auto">
        <AlertCircle className="w-10 h-10 mx-auto mb-3 text-slate-300" />
        <h2 className="text-lg font-bold text-slate-800">Class Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">The requested class ID does not match any current academic cohort.</p>
        <Link
          href="/student/classes"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Classes
        </Link>
      </div>
    );
  }

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.admissionNo.includes(searchQuery)
  );

  const openStudentPhoto = (s: typeof students[0]) => {
    setActivePhotoModal({
      name: s.name,
      admissionNo: s.admissionNo,
      className: cy.displayName,
      photoUrl: s.avatarUrl || `/students/${s.admissionNo}.jpg`,
      studentId: s.id,
    });
  };

  const getStudentRole = (studentId: string) => {
    if (detailInfo?.rolesByStudentId[studentId]) {
      return detailInfo.rolesByStudentId[studentId];
    }
    return `Class ${cy.displayName} Scholar`;
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 pb-16">
      {/* Back Button */}
      <div>
        <Link
          href="/student/classes"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors bg-white px-3 py-1.5 rounded-xl border border-gray-200/80 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All 10 Classes
        </Link>
      </div>

      {/* Hero Class Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-52 h-52 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-44 h-44 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Mascot Character Avatar with Centered Face */}
            <ClassAvatar
              name={cy.displayName}
              level={cy.level}
              size="2xl"
              className="w-20 h-20 sm:w-24 sm:h-24 ring-4 ring-white/20 shadow-2xl flex-shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200 mb-2">
                <School className="w-3.5 h-3.5 text-amber-400" />
                Level {cy.level} · Academic Year 2026–27
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Class {cy.displayName}
                </h1>
                {character && (
                  <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 backdrop-blur-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Mascot: {character.characterName}</span>
                  </span>
                )}
                <StatusBadge
                  status={cy.ilmEnabled ? 'ilm' : 'no_ilm'}
                  label={cy.ilmEnabled ? 'ILM Batch' : 'Degree Cohort'}
                  showDot={false}
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                {detailInfo?.focusDescription || `Enrolled batch of ${students.length} scholars at MDIA Academy.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 self-start md:self-auto flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/70 flex items-center justify-center text-white">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black leading-none">{students.length}</p>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-extrabold mt-0.5">
                Scholars Enrolled
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Class Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Class Level</p>
          <p className="text-lg font-black text-slate-900 mt-0.5">Level {cy.level}</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{cy.displayName} Batch</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Attendance</p>
          <p className="text-lg font-black text-emerald-700 mt-0.5">{detailInfo?.attendanceRate || '96%'}</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Batch Average</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Presentations</p>
          <p className="text-lg font-black text-indigo-700 mt-0.5">{detailInfo?.totalStageAppearances || 32}</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Stage Sessions</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Program</p>
          <p className="text-lg font-black text-slate-900 mt-0.5">
            {cy.ilmEnabled ? 'ILM Speechcraft' : 'Degree Arts'}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">MDIA Campus</p>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('members')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all',
            activeTab === 'members'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          )}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Class Members ({students.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all',
            activeTab === 'overview'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          )}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Overview &amp; Sessions</span>
        </button>
        {detailInfo?.awards && detailInfo.awards.length > 0 && (
          <button
            onClick={() => setActiveTab('awards')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all',
              activeTab === 'awards'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            )}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Honors &amp; Awards ({detailInfo.awards.length})</span>
          </button>
        )}
      </div>

      {/* TAB 1: Class Members Roster & Photo Cards */}
      {activeTab === 'members' && (
        <div className="space-y-4">
          {/* Search & View Mode Toggle */}
          <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search ${students.length} scholars in Class ${cy.displayName} by name or admission #...`}
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

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-end sm:self-auto">
              <button
                onClick={() => setViewMode('cards')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  viewMode === 'cards'
                    ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  viewMode === 'table'
                    ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                )}
              >
                <List className="w-3.5 h-3.5" />
                <span>Roster</span>
              </button>
            </div>
          </div>

          {/* Cards View */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredStudents.map((s, idx) => {
                const role = getStudentRole(s.id);

                return (
                  <div
                    key={s.id}
                    onClick={() => openStudentPhoto(s)}
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
                        <span className="text-[10px] font-semibold text-slate-400">
                          Class {cy.displayName}
                        </span>
                      </div>
                      <p className="text-[11px] text-indigo-700 font-bold truncate mt-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500 flex-shrink-0" />
                        <span className="truncate">{role}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Table / List View */}
          {viewMode === 'table' && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-gray-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Scholar</th>
                      <th className="px-4 py-3">Admission #</th>
                      <th className="px-4 py-3">Assigned Role</th>
                      <th className="px-4 py-3">Parent Guardian</th>
                      <th className="px-4 py-3 text-right">Photo Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredStudents.map((s, idx) => (
                      <tr
                        key={s.id}
                        onClick={() => openStudentPhoto(s)}
                        className="hover:bg-indigo-50/40 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3 font-mono text-slate-400 text-[11px] font-bold">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <StudentAvatar
                              name={s.name}
                              admissionNo={s.admissionNo}
                              size="sm"
                            />
                            <span className="font-extrabold text-slate-900">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-600">
                          #{s.admissionNo}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                            {getStudentRole(s.id)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {s.fatherName ? `s/o ${s.fatherName}` : '—'}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline">
                            View Portrait
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredStudents.length === 0 && (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-200">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-bold text-slate-700">No scholars found in Class {cy.displayName}</p>
              <p className="text-xs text-slate-400 mt-1">Try another search term or clear the filter.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Class Overview & Sessions */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-base">Class Profile &amp; Focus Area</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {detailInfo?.focusDescription || `Class ${cy.displayName} is Level ${cy.level} in the MDIA curriculum.`}
            </p>

            {detailInfo?.insights && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                {detailInfo.insights.map((ins, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-gray-100">
                    <p className="text-lg font-black text-slate-900">{ins.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{ins.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Academic Sessions */}
          {detailInfo?.academicSessions && detailInfo.academicSessions.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-3">
              <h3 className="font-black text-slate-900 text-base">Curriculum &amp; Academic Sessions</h3>
              <div className="space-y-2.5">
                {detailInfo.academicSessions.map(sess => (
                  <div
                    key={sess.id}
                    className="p-3.5 bg-slate-50 rounded-xl border border-gray-100 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                          Session #{sess.sessionNumber}
                        </span>
                        <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">{sess.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Faculty: {sess.faculty} · Date: {sess.date}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'text-[10px] font-bold uppercase px-2.5 py-1 rounded-full',
                        sess.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sess.status === 'in_progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      )}
                    >
                      {sess.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Honors & Awards */}
      {activeTab === 'awards' && detailInfo?.awards && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {detailInfo.awards.map(aw => (
            <div
              key={aw.id}
              className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl flex-shrink-0">
                {aw.badgeEmoji || '🏆'}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                  {aw.category} Award
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{aw.title}</h4>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Recipient: <span className="font-bold text-slate-800">{aw.recipientName}</span> (#{aw.admissionNo})
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{aw.date}</p>
              </div>
            </div>
          ))}
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
