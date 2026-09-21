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
import { StatCard } from '@/components/ui/stat-card';
import { WhatsAppPhotoModal, PhotoModalData } from '@/components/ui/whatsapp-photo-modal';
import { formatDate, getMeetingStatusLabel } from '@/lib/utils';
import { Users, Calendar, ArrowLeft, Award, Star, AlertCircle, LayoutGrid, List, Eye, BookOpen, CheckCircle2 } from 'lucide-react';

export default function ClassProfilePage() {
  const params = useParams();
  const classId = params.id as string;
  const [activeTab, setActiveTab] = useState<string>('Students');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentViewMode, setStudentViewMode] = useState<'cards' | 'table'>('cards');
  const [activePhotoModal, setActivePhotoModal] = useState<PhotoModalData | null>(null);

  const cy = classYears.find(c => c.id === classId);
  const students = getStudentsByClass(classId);
  const meetings = allMeetings.filter(m => m.classYearId === classId);
  const character = cy ? getClassCharacter(cy.displayName) : null;
  const detailInfo = cy ? getClassDetailInfo(cy.id) : null;

  if (!cy) {
    return (
      <div className="p-6 text-center text-slate-500">
        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
        Class not found.
      </div>
    );
  }

  const isIlm = cy.ilmEnabled;
  const latestMeeting = meetings.length > 0 ? meetings[0] : null;

  // Tabs configured per class type (ILM vs Non-ILM Degree/Secondary)
  const tabs = isIlm
    ? ['Students', 'Overview', 'ILM Meetings', 'Participation', 'Awards', 'Gallery']
    : ['Students', 'Overview', 'Academic Curriculum', 'Honors & Awards', 'Gallery'];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.admissionNo.includes(searchQuery)
  );

  const openStudentPhotoModal = (s: typeof students[0]) => {
    setActivePhotoModal({
      name: s.name,
      admissionNo: s.admissionNo,
      className: cy.displayName,
      photoUrl: s.avatarUrl || `/students/${s.admissionNo}.jpg`,
      studentId: s.id,
    });
  };

  const getStudentRole = (studentId: string, studentName: string) => {
    if (detailInfo?.rolesByStudentId[studentId]) {
      return detailInfo.rolesByStudentId[studentId];
    }
    return `Class ${cy.displayName} Scholar`;
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 bg-white">
        <Link href="/admin/classes" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-4 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All 10 Classes
        </Link>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <ClassAvatar
              name={cy.displayName}
              level={cy.level}
              size="2xl"
              className="w-16 h-16 sm:w-20 sm:h-20 ring-4 ring-indigo-50 shadow-md flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {cy.displayName}
                </h1>
                {character && (
                  <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span>Mascot:</span>
                    <span>{character.characterName}</span>
                  </span>
                )}
                <StatusBadge
                  status={cy.ilmEnabled ? 'ilm' : 'no_ilm'}
                  label={cy.ilmEnabled ? 'ILM Active Cohort' : 'Academic Degree Program'}
                  showDot={false}
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                {detailInfo?.category || `Academic Year 2026–27 · Level ${cy.level}`} · <strong className="text-slate-900">{students.length} students enrolled</strong>
              </p>
              {detailInfo?.focusDescription && (
                <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                  {detailInfo.focusDescription}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            {latestMeeting ? (
              <Link
                href={`/admin/meetings/${latestMeeting.id}`}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>View Meeting #{latestMeeting.meetingNumber}</span>
              </Link>
            ) : (
              <div className="px-3.5 py-2 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Level {cy.level} Academic Cohort</span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 mt-6 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map(tab => {
            const isTabActive = activeTab === tab || (activeTab === 'Students' && tab === 'Students');
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all ${
                  isTabActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab === 'Students' ? `Enrolled Students (${students.length})` : tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 space-y-6">

        {/* STUDENTS TAB */}
        {activeTab === 'Students' && (
          <div className="space-y-4">
            {/* Search & Layout Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="search"
                  placeholder={`Search ${students.length} students by name or admission # in ${cy.displayName}...`}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 max-w-md border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
                />
                <span className="text-xs text-slate-500 whitespace-nowrap font-medium">
                  Showing <strong>{filteredStudents.length}</strong> of {students.length}
                </span>
              </div>

              {/* Toggle Cards vs Table */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-gray-200/80 self-end sm:self-auto">
                <button
                  onClick={() => setStudentViewMode('cards')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    studentViewMode === 'cards'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Photo Cards View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" /> Cards
                </button>
                <button
                  onClick={() => setStudentViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    studentViewMode === 'table'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Roster Table View"
                >
                  <List className="w-3.5 h-3.5" /> Roster Table
                </button>
              </div>
            </div>

            {/* CARDS VIEW */}
            {studentViewMode === 'cards' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredStudents.map((s, idx) => {
                  const role = getStudentRole(s.id, s.name);
                  return (
                    <div
                      key={s.id}
                      onClick={() => openStudentPhotoModal(s)}
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
                        <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-4 h-4 text-white drop-shadow" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 truncate transition-colors leading-snug">
                          {s.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200">
                            Adm #{s.admissionNo}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 rounded-md px-2 py-0.5 truncate max-w-[170px]">
                            {role}
                          </span>
                          <span className="text-[10px] text-indigo-600 font-bold group-hover:underline flex items-center gap-0.5 ml-auto flex-shrink-0">
                            <Eye className="w-3 h-3" /> View
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TABLE VIEW */}
            {studentViewMode === 'table' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-gray-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <th className="text-left px-4 py-3">Student</th>
                        <th className="text-left px-3 py-3 hidden sm:table-cell">Admission #</th>
                        <th className="text-left px-3 py-3">Class Role / Title</th>
                        <th className="text-left px-3 py-3 hidden md:table-cell">Status</th>
                        <th className="px-3 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredStudents.map(s => {
                        const role = getStudentRole(s.id, s.name);
                        return (
                          <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <StudentAvatar
                                  name={s.name}
                                  admissionNo={s.admissionNo}
                                  size="sm"
                                  onClick={() => openStudentPhotoModal(s)}
                                />
                                <span
                                  onClick={() => openStudentPhotoModal(s)}
                                  className="font-bold text-slate-900 truncate max-w-[200px] cursor-pointer hover:text-indigo-600"
                                >
                                  {s.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3 hidden sm:table-cell text-slate-600 font-mono text-xs font-bold">
                              #{s.admissionNo}
                            </td>
                            <td className="px-3 py-3">
                              <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md px-2 py-0.5">
                                {role}
                              </span>
                            </td>
                            <td className="px-3 py-3 hidden md:table-cell">
                              <span className="text-xs text-slate-600 font-medium">Enrolled</span>
                            </td>
                            <td className="px-3 py-3 text-right">
                              <button
                                onClick={() => openStudentPhotoModal(s)}
                                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
                              >
                                View Photo
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard
                title={isIlm ? 'Meetings Completed' : 'Academic Seminars'}
                value={isIlm ? (meetings.length || 1) : (detailInfo?.academicSessions?.length || 3)}
                icon={Calendar}
              />
              <StatCard
                title="Avg Attendance"
                value={detailInfo?.attendanceRate || '95%'}
                icon={Users}
              />
              <StatCard
                title="Stage Appearances"
                value={detailInfo?.totalStageAppearances || 35}
                icon={Star}
              />
              <StatCard
                title="Reports Pending"
                value={detailInfo?.reportsPending || 0}
                icon={AlertCircle}
                accent={detailInfo?.reportsPending ? true : false}
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>Class {cy.displayName} Distinct Participation Insights</span>
                {character && (
                  <span className="text-xs font-semibold text-slate-500">
                    ({character.characterName} Batch)
                  </span>
                )}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {(detailInfo?.insights || []).map(item => (
                  <div key={item.label} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <span className={`text-2xl font-black ${item.color} flex-shrink-0`}>{item.value}</span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ILM MEETINGS TAB */}
        {isIlm && activeTab === 'ILM Meetings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Official ILM Meetings for {cy.displayName}</h2>
              <Link href="/admin/meetings" className="text-xs font-bold text-indigo-600 hover:underline">
                View All Academy Meetings →
              </Link>
            </div>
            {meetings.length > 0 ? (
              meetings.map(m => (
                <div key={m.id} className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-700 font-extrabold text-base">
                      #{m.meetingNumber}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Meeting #{m.meetingNumber} — {m.theme.english}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{formatDate(m.date)} · Theme: {m.theme.malayalam || m.theme.english}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={m.status} label={getMeetingStatusLabel(m.status)} />
                    <Link
                      href={`/admin/meetings/${m.id}`}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors"
                    >
                      View Report →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-slate-500">
                <p className="font-semibold text-sm">Meeting #01 scheduled for {cy.displayName}</p>
                <p className="text-xs text-slate-400 mt-1">First meeting record will appear here after submission.</p>
              </div>
            )}
          </div>
        )}

        {/* ACADEMIC CURRICULUM TAB (For Non-ILM Degree Classes) */}
        {!isIlm && activeTab === 'Academic Curriculum' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Degree &amp; Academic Curriculum — {cy.displayName}</h2>
                <p className="text-xs text-slate-500 mt-0.5">Faculty-led academic symposia and curriculum benchmarks</p>
              </div>
            </div>

            <div className="space-y-3">
              {(detailInfo?.academicSessions || []).map(sess => (
                <div key={sess.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-extrabold flex items-center justify-center flex-shrink-0 text-sm">
                      S{sess.sessionNumber}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{sess.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{sess.date} · Instructor: {sess.faculty}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    sess.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {sess.status === 'completed' ? 'Completed' : 'Upcoming'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AWARDS & HONORS TAB */}
        {(activeTab === 'Awards' || activeTab === 'Honors & Awards') && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900">
              Distinctions &amp; Awards — {cy.displayName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(detailInfo?.awards || []).map(aw => (
                <div key={aw.id} className="bg-white rounded-2xl border border-amber-200/90 p-4 shadow-xs flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-xl">
                    {aw.badgeEmoji || '🏆'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
                      {aw.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-1 leading-snug">
                      {aw.title}
                    </h3>
                    <p className="text-xs font-bold text-indigo-600 mt-1 truncate">
                      {aw.recipientName}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Adm #{aw.admissionNo} · {aw.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'Gallery' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">
              📸
            </div>
            <h3 className="font-bold text-slate-900 text-base">Class {cy.displayName} High-Resolution Photo Gallery</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              All official student individual portraits and class session captures for {cy.displayName} ({character?.characterName} batch) are accessible via the student cards.
            </p>
            <button
              onClick={() => setActiveTab('Students')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              Browse Student Portraits ({students.length})
            </button>
          </div>
        )}
      </div>

      {/* Full Photo Modal */}
      <WhatsAppPhotoModal
        data={activePhotoModal}
        onClose={() => setActivePhotoModal(null)}
      />
    </div>
  );
}

