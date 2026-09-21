'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { classYears } from '@/lib/mock-data/cohorts';
import { getStudentsByClass } from '@/lib/mock-data/students';
import { allMeetings, vahdaMeeting1Awards } from '@/lib/mock-data/meetings';
import { StatusBadge } from '@/components/ui/status-badge';
import { ClassAvatar } from '@/components/ui/class-avatar';
import { getClassCharacter } from '@/lib/mock-data/class-characters';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { StatCard } from '@/components/ui/stat-card';
import { WhatsAppPhotoModal, PhotoModalData } from '@/components/ui/whatsapp-photo-modal';
import { getAwardTypeLabel, formatDate, getMeetingStatusLabel } from '@/lib/utils';
import { Users, Calendar, ArrowLeft, Award, Star, ChevronRight, AlertCircle, LayoutGrid, List, Eye } from 'lucide-react';

const TABS = ['Students', 'Overview', 'ILM Meetings', 'Participation', 'Awards', 'Gallery'] as const;
type Tab = typeof TABS[number];

const latestRoles: Record<string, string> = {
  'vahda-adil': 'QIRATH',
  'vahda-bilal': 'Dua',
  'vahda-beeran': 'Welcome Speech',
  'vahda-hafeez': 'Grammarian',
  'vahda-haeezp': 'LMOD',
  'vahda-muhaviz': 'TT Master',
  'vahda-aflah': 'Ah Counter',
  'vahda-munzir': 'Thank You Speech',
  'vahda-hafizst': 'Timer',
  'vahda-hisham': 'General Evaluator',
  'vahda-nafih': 'Prepared Speaker',
  'vahda-sinan': 'TT Speaker',
  'vahda-zaid': 'Prepared Speaker',
  'vahda-hashir': 'Prepared Speaker',
  'vahda-jalal': 'Prepared Speaker',
  'vahda-qubaib': 'TT Speaker',
  'vahda-azeem': 'TT Speaker',
  'vahda-thufail': 'TT Speaker',
  'vahda-shahid': 'TT Speaker',
  'vahda-hilal': 'TT Speaker',
  'vahda-muhammed': 'Ice Breaking',
};

export default function ClassProfilePage() {
  const params = useParams();
  const classId = params.id as string;
  const [activeTab, setActiveTab] = useState<Tab>('Students');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentViewMode, setStudentViewMode] = useState<'cards' | 'table'>('cards');
  const [activePhotoModal, setActivePhotoModal] = useState<PhotoModalData | null>(null);

  const cy = classYears.find(c => c.id === classId);
  const students = getStudentsByClass(classId);
  const meetings = allMeetings.filter(m => m.classYearId === classId);

  if (!cy) {
    return (
      <div className="p-6 text-center text-slate-500">
        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
        Class not found.
      </div>
    );
  }

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.admissionNo.includes(searchQuery)
  );

  const isVahda = classId === 'cy-vahda-2627';
  const character = getClassCharacter(cy.displayName);

  const openStudentPhotoModal = (s: typeof students[0]) => {
    setActivePhotoModal({
      name: s.name,
      admissionNo: s.admissionNo,
      className: cy.displayName,
      photoUrl: s.avatarUrl || `/students/${s.admissionNo}.jpg`,
      studentId: s.id,
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 bg-white">
        <Link href="/admin/classes" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 mb-3">
          <ArrowLeft className="w-3.5 h-3.5" /> All Classes
        </Link>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <ClassAvatar
              name={cy.displayName}
              level={cy.level}
              size="xl"
              className="w-16 h-16 sm:w-18 sm:h-18 ring-4 ring-indigo-50 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-extrabold text-slate-900">{cy.displayName}</h1>
                {character && (
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2.5 py-0.5 rounded-full">
                    {character.characterName}
                  </span>
                )}
                <StatusBadge
                  status={cy.ilmEnabled ? 'ilm' : 'no_ilm'}
                  label={cy.ilmEnabled ? 'ILM Active' : 'No ILM'}
                  showDot={false}
                />
              </div>
              <p className="text-sm text-slate-500 mt-0.5">
                Academic Year 2026–27 · Level {cy.level} · {students.length} students enrolled
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/meetings/${isVahda ? 'meeting-vahda-01' : '#'}`} className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors shadow-2xs">
              Latest Meeting
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-5 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab === 'Students' ? `Students (${students.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 space-y-5">

        {/* STUDENTS TAB (Default Tab for Immediate Student Photos & Profile Details) */}
        {activeTab === 'Students' && (
          <div className="space-y-4">
            {/* Search & Layout Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="search"
                  placeholder={`Search ${students.length} students by name, admission #, or father name...`}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 max-w-md border border-gray-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
                  Showing <strong>{filteredStudents.length}</strong> of {students.length}
                </span>
              </div>

              {/* Toggle Cards vs Table */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-gray-200/80 self-end sm:self-auto">
                <button
                  onClick={() => setStudentViewMode('cards')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
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

            {/* CARDS VIEW: Photos & Profile Info */}
            {studentViewMode === 'cards' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredStudents.map((s, idx) => (
                  <div
                    key={s.id}
                    onClick={() => openStudentPhotoModal(s)}
                    className="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer relative flex items-center gap-3.5 overflow-hidden"
                  >
                    <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-indigo-400 transition-colors absolute top-2 right-3">
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
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 truncate transition-colors leading-tight">
                        {s.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          Adm #{s.admissionNo}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        {latestRoles[s.id] ? (
                          <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded px-1.5 py-0.5">
                            {latestRoles[s.id]}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Class {cy.displayName}</span>
                        )}
                        <span className="text-[10px] text-indigo-600 font-semibold group-hover:underline flex items-center gap-0.5 ml-auto">
                          <Eye className="w-3 h-3" /> View Photo
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TABLE VIEW */}
            {studentViewMode === 'table' && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-gray-100">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Student</th>
                        <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Adm No.</th>
                        <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Meetings</th>
                        <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Latest Role</th>
                        <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Awards</th>
                        <th className="px-3 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredStudents.map((s) => {
                        const hasAward = isVahda && ['vahda-hafizst','vahda-hisham','vahda-nafih','vahda-sinan'].includes(s.id);
                        return (
                          <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <StudentAvatar
                                  name={s.name}
                                  admissionNo={s.admissionNo}
                                  size="sm"
                                  onClick={() => openStudentPhotoModal(s)}
                                />
                                <span
                                  onClick={() => openStudentPhotoModal(s)}
                                  className="font-medium text-slate-900 truncate max-w-[150px] cursor-pointer hover:text-indigo-600"
                                >
                                  {s.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3 hidden sm:table-cell text-slate-600 font-mono text-xs">{s.admissionNo}</td>
                            <td className="px-3 py-3 hidden md:table-cell text-slate-600">{meetings.length}</td>
                            <td className="px-3 py-3 hidden lg:table-cell">
                              {latestRoles[s.id] ? (
                                <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md px-2 py-0.5">{latestRoles[s.id]}</span>
                              ) : <span className="text-xs text-slate-400">—</span>}
                            </td>
                            <td className="px-3 py-3 hidden lg:table-cell">
                              {hasAward ? <span className="text-xs">🏆 1</span> : <span className="text-xs text-slate-400">—</span>}
                            </td>
                            <td className="px-3 py-3">
                              <button
                                onClick={() => openStudentPhotoModal(s)}
                                className="text-xs text-indigo-600 hover:underline font-medium"
                              >
                                Photo &amp; Info
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

        {/* OVERVIEW */}
        {activeTab === 'Overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard title="Meetings Completed" value={meetings.length} icon={Calendar} />
              <StatCard title="Avg Attendance" value="94%" icon={Users} />
              <StatCard title="Stage Appearances" value={isVahda ? 47 : 32} icon={Star} />
              <StatCard title="Reports Pending" value={1} icon={AlertCircle} accent />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Participation Insights</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Students who have given a prepared speech this term', value: isVahda ? '4' : '8', color: 'text-green-700' },
                  { label: 'Students yet to give a prepared speech', value: isVahda ? '31' : '27', color: 'text-slate-700' },
                  { label: 'Students yet to participate in Table Topics', value: isVahda ? '29' : '24', color: 'text-slate-700' },
                  { label: 'Students who have not held a program role recently', value: isVahda ? '10' : '8', color: 'text-amber-700' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 bg-slate-50 rounded-lg p-3">
                    <span className={`text-xl font-bold ${item.color} flex-shrink-0`}>{item.value}</span>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ILM MEETINGS */}
        {activeTab === 'ILM Meetings' && (
          <div className="space-y-3">
            {meetings.map((m) => (
              <div key={m.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-700">#{m.meetingNumber}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">Meeting #{m.meetingNumber}</p>
                  <p className="text-xs text-slate-500">{formatDate(m.date)}</p>
                  <p className="text-xs text-slate-600 mt-0.5 truncate">{m.theme.english}</p>
                </div>
                <StatusBadge status={m.status} label={getMeetingStatusLabel(m.status)} />
                <Link href={`/admin/meetings/${m.id}`} className="text-xs text-indigo-600 hover:underline flex-shrink-0">
                  View →
                </Link>
              </div>
            ))}
            <Link href="/admin/meetings" className="block text-center text-sm text-indigo-600 hover:underline py-2">
              View all campus meetings →
            </Link>
          </div>
        )}

        {/* PARTICIPATION */}
        {activeTab === 'Participation' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Role Distribution — {cy.displayName}</h2>
            <p className="text-sm text-slate-500 mb-4">Based on Meeting #01 participation</p>
            <div className="space-y-2">
              {[
                { role: 'Prepared Speaker', count: 4, total: 35 },
                { role: 'TT Speaker', count: 6, total: 35 },
                { role: 'Ice Breaking Speaker', count: 1, total: 35 },
                { role: 'Evaluator', count: 3, total: 35 },
                { role: 'Opening Role', count: 4, total: 35 },
                { role: 'Technical Role (Timer/GE/etc)', count: 4, total: 35 },
              ].map(item => (
                <div key={item.role} className="flex items-center gap-3">
                  <span className="w-48 text-sm text-slate-700 flex-shrink-0">{item.role}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${(item.count / item.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-500 w-12 text-right">{item.count}/{item.total}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AWARDS */}
        {activeTab === 'Awards' && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-900">Awards — {cy.displayName}</h2>
            {isVahda ? (
              vahdaMeeting1Awards.map(aw => {
                const student = students.find(s => s.id === aw.studentId);
                return (
                  <div key={aw.id} className="bg-white rounded-lg border border-yellow-200 p-4 flex items-center gap-3">
                    <div className="w-9 h-9 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{getAwardTypeLabel(aw.type)}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Meeting #01 · 18 Sep 2026</p>
                    </div>
                    {student && (
                      <div className="flex items-center gap-2">
                        <StudentAvatar name={student.name} admissionNo={student.admissionNo} size="sm" />
                        <span className="text-sm font-medium text-slate-900">{student.name}</span>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-slate-400">
                No awards recorded yet for this class.
              </div>
            )}
          </div>
        )}

        {/* GALLERY */}
        {activeTab === 'Gallery' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📷</span>
            </div>
            <p className="text-sm font-medium text-slate-700">Gallery</p>
            <p className="text-xs text-slate-400 mt-1">Photos from {cy.displayName} meetings will appear here.</p>
            <Link href={`/admin/meetings/${isVahda ? 'meeting-vahda-01' : '#'}`} className="mt-3 inline-block text-xs text-indigo-600 hover:underline">
              View latest meeting photos →
            </Link>
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
