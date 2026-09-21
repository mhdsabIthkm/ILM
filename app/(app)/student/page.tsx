'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import {
  getStudent,
  findStudentByAdmissionNo,
  allStudents,
  getStudentsByClassNum,
  vahdaStudents,
} from '@/lib/mock-data/students';
import { classYears } from '@/lib/mock-data/cohorts';
import { allMeetings, vahdaMeeting1Awards, vahdaMeeting1Evaluations } from '@/lib/mock-data/meetings';
import { observationTags } from '@/lib/mock-data/observation-tags';
import { getAwardTypeLabel, formatDate } from '@/lib/utils';
import { StatusBadge } from '@/components/ui/status-badge';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { ObservationBadge } from '@/components/ui/observation-badge';
import {
  WhatsAppPhotoModal,
  PhotoModalData,
} from '@/components/ui/whatsapp-photo-modal';
import {
  Calendar,
  Award,
  AlertCircle,
  Mic,
  Star,
  GraduationCap,
  Users,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Clock,
  FileText,
  Sparkles,
  ChevronRight,
  Eye,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StudentDashboard() {
  const { user } = useUser();
  const [photoModalData, setPhotoModalData] = useState<PhotoModalData | null>(null);

  // Dynamically resolve the logged-in student record
  const student =
    (user.studentId ? getStudent(user.studentId) : null) ||
    (user.admissionNo ? findStudentByAdmissionNo(user.admissionNo) : null);

  const studentId = student?.id ?? user.studentId ?? '';
  const name = user.studentName || student?.name || (user.admissionNo ? `Student #${user.admissionNo}` : 'Student');
  const admissionNo = user.admissionNo || student?.admissionNo || '';

  const cy = classYears.find(c => c.id === student?.classYearId);
  const className = user.className || cy?.displayName || student?.className || 'VAHDA';
  const classNum = student?.classNum ?? (className === 'VAHDA' ? 4 : 4);

  // Class cohort peers
  const classStudents =
    getStudentsByClassNum(classNum).length > 0
      ? getStudentsByClassNum(classNum)
      : vahdaStudents;

  // Meetings in this student's class
  const myClassMeetings = allMeetings.filter(
    m => m.classYearId === (student?.classYearId ?? 'cy-vahda-2627')
  );

  // Evaluations and awards
  const myEvals = vahdaMeeting1Evaluations.filter(e => e.subjectStudentId === studentId);
  const myAwards = vahdaMeeting1Awards.filter(a => a.studentId === studentId);

  const activeMeeting = myClassMeetings.find(m => m.status === 'collecting') ?? myClassMeetings[0];

  const openWhatsAppPhoto = (s: { name: string; admissionNo?: string; className?: string; fatherName?: string }) => {
    setPhotoModalData({
      name: s.name,
      admissionNo: s.admissionNo,
      className: s.className || className,
      photoUrl: s.admissionNo ? `/students/${s.admissionNo}.jpg` : undefined,
      fatherName: s.fatherName,
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* Top Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-56 h-56 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Clickable Student Photo with WhatsApp modal */}
            <div
              onClick={() => openWhatsAppPhoto({ name, admissionNo, className, fatherName: student?.fatherName })}
              className="relative cursor-pointer group flex-shrink-0"
              title="Click to view full photo"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-2xl group-hover:ring-indigo-400 transition-all bg-slate-800 p-0.5">
                <StudentAvatar
                  name={name}
                  admissionNo={admissionNo}
                  size="xl"
                  className="w-full h-full rounded-[14px] object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white drop-shadow" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-md" />
            </div>

            {/* Name & Academic Meta */}
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-amber-300 border border-white/15 mb-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                Academic Year 2026–27 · ILM Leadership Program
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight truncate">
                {name}
              </h1>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-xs font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2.5 py-0.5 rounded-full">
                  Class: {className}
                </span>
                <span className="text-xs font-mono font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded-md">
                  Adm #{admissionNo}
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Student
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons on Hero */}
          <div className="flex items-center gap-2.5 flex-wrap self-start md:self-center">
            <Link
              href="/student/class"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all shadow-sm"
            >
              <Users className="w-3.5 h-3.5" />
              <span>My Class ({classStudents.length})</span>
            </Link>
            <Link
              href="/student/profile"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
            >
              <span>My Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Ongoing Report Notice */}
      {activeMeeting?.status === 'collecting' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-700">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-amber-900 text-xs sm:text-sm">
                Meeting Report Under Collection
              </p>
              <p className="text-xs text-amber-800/90 mt-0.5">
                Class {className} Meeting #{activeMeeting.meetingNumber} ({activeMeeting.theme.english}) evaluations and speech records are currently being compiled.
              </p>
            </div>
          </div>
          <Link
            href="/student/meetings"
            className="text-xs font-bold text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
          >
            View Meeting
          </Link>
        </div>
      )}

      {/* 4 Focused Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Meetings</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{myClassMeetings.length}</p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>Session 2026–27</span>
            <span className="text-emerald-600 font-semibold">100% Attended</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Speeches &amp; Roles</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">1</p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>Stage Presentations</span>
            <span className="text-indigo-600 font-semibold">Active</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Evaluator Remarks</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{myEvals.length > 0 ? myEvals.length : '1'}</p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>Structured Critiques</span>
            <span className="text-amber-600 font-semibold">2 Tagged</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Awards &amp; Honors</span>
            <div className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{myAwards.length}</p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>Commendations</span>
            <span className="text-slate-500 font-medium">In Contention</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols: Active Meeting & Milestones & Feedback) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Active Meeting Showcase */}
          {activeMeeting && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900">
                      Class {className} Meeting #{activeMeeting.meetingNumber}
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      {formatDate(activeMeeting.date)} · 02:00 PM – 04:30 PM
                    </p>
                  </div>
                </div>
                <StatusBadge status={activeMeeting.status} />
              </div>

              {/* Theme highlight */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                  Meeting Theme
                </p>
                <p className="text-base font-extrabold text-slate-900">
                  {activeMeeting.theme.english}
                </p>
                {activeMeeting.theme.malayalam && (
                  <p className="text-xs text-slate-500 font-medium font-serif">
                    {activeMeeting.theme.malayalam}
                  </p>
                )}
              </div>

              {/* Assigned Role highlight */}
              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Mic className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      Your Assigned Duty
                    </span>
                    <p className="text-xs font-bold text-slate-900">
                      Prepared Speaker / Active Participant
                    </p>
                  </div>
                </div>
                <Link
                  href="/student/roles"
                  className="text-xs font-bold text-indigo-700 hover:text-indigo-900 hover:underline flex items-center gap-1"
                >
                  <span>Role Guidelines</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Venue: Malik Deenar Main Academic Hall
                </span>
                <Link
                  href={`/student/meetings/${activeMeeting.id}`}
                  className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>View Meeting Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Public Speaking & Leadership Pathway Milestones */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Speech &amp; Leadership Pathway
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Your progression through the official MDIA ILM curriculum
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                Level 1 of 4
              </span>
            </div>

            {/* Milestones steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    Milestone 1
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-xs font-extrabold text-slate-900">Ice-Breaker Presentation</p>
                <p className="text-[11px] text-slate-500">Completed in Meeting #01</p>
              </div>

              <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider">
                    Milestone 2
                  </span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-indigo-200/80 text-indigo-800">
                    Next Up
                  </span>
                </div>
                <p className="text-xs font-extrabold text-slate-900">Speech Organization &amp; Logic</p>
                <p className="text-[11px] text-slate-500">Structuring core ideas &amp; thesis</p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1 opacity-70">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Milestone 3
                  </span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-xs font-extrabold text-slate-700">Vocal Variety &amp; Body Language</p>
                <p className="text-[11px] text-slate-400">Eye contact &amp; vocal dynamics</p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1 opacity-70">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Milestone 4
                  </span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-xs font-extrabold text-slate-700">Persuasion &amp; Impromptu Debate</p>
                <p className="text-[11px] text-slate-400">Advanced Table Topics mastery</p>
              </div>
            </div>
          </div>

          {/* Evaluator Remarks & Observation Tags */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Latest Mentor &amp; Evaluator Feedback
                  </h3>
                  <p className="text-[11px] text-slate-500">Meeting #01 observation remarks</p>
                </div>
              </div>
              <Link
                href="/student/evaluations"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                All Evaluations
              </Link>
            </div>

            <div className="border-l-3 border-indigo-400 pl-4 py-1 space-y-2.5">
              <p className="text-xs sm:text-sm text-slate-700 italic font-medium leading-relaxed">
                &ldquo;Ice breaking was heartfelt. Commendable initial stage presence and eye contact. Needs more projection in larger hall settings.&rdquo;
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                  ✓ Good Preparation
                </span>
                <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                  ✓ Sincere Delivery
                </span>
                <span className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-semibold">
                  → Voice Projection &amp; Volume
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col: Classmates Snapshot, Quick Tools & In-Charge Mentor) */}
        <div className="space-y-5">
          {/* Classmates Snapshot Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Class {className} Peers
                </h3>
                <p className="text-[11px] text-slate-500">
                  {classStudents.length} enrolled classmates
                </p>
              </div>
              <Link
                href="/student/class"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                View All
              </Link>
            </div>

            {/* List of top 5 classmates */}
            <div className="space-y-2.5">
              {classStudents.slice(0, 5).map((peer, idx) => (
                <div
                  key={peer.id}
                  onClick={() => openWhatsAppPhoto(peer)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <StudentAvatar
                      name={peer.name}
                      admissionNo={peer.admissionNo}
                      size="sm"
                      className="group-hover:scale-105 transition-transform flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 truncate transition-colors">
                        {peer.name}
                      </p>
                      <p className="text-[10px] font-mono text-slate-400">
                        Adm #{peer.admissionNo}
                      </p>
                    </div>
                  </div>
                  <Eye className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 transition-colors flex-shrink-0" />
                </div>
              ))}
            </div>

            <Link
              href="/student/class"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors border border-indigo-200/80"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Explore All {classStudents.length} Classmates</span>
            </Link>
          </div>

          {/* Quick Portal Access Shortcuts */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-gray-100">
              Quick Shortcuts
            </h3>
            <div className="space-y-1.5 text-xs">
              <Link
                href="/student/meetings"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-semibold group"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span>Meeting Agendas &amp; Dates</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </Link>

              <Link
                href="/student/roles"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-semibold group"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-blue-500" />
                  <span>Speech Roles &amp; Timers</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </Link>

              <Link
                href="/student/reports"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-semibold group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>Meeting Reports &amp; Minutes</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </Link>

              <Link
                href="/student/awards"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-semibold group"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Awards &amp; Certificates</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Academy In-Charge & Mentor */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 bg-slate-800 flex-shrink-0">
                <img
                  src="/avatars/admin.jpg"
                  alt="Ustadh Abdullah"
                  className="w-full h-full object-cover object-top"
                  onError={e => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold truncate">Ustadh Abdullah</p>
                <p className="text-[10px] text-indigo-300 truncate">Class In-Charge &amp; Chief Evaluator</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              &ldquo;Speak with conviction and purpose. Regular attendance and practice cultivate lasting leadership qualities.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp-Style Photo Modal */}
      <WhatsAppPhotoModal
        data={photoModalData}
        onClose={() => setPhotoModalData(null)}
      />
    </div>
  );
}
