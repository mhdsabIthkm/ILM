'use client';

import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Users, BookOpen, FileText, Clock, Star, ArrowRight, ExternalLink } from 'lucide-react';
import { allMeetings } from '@/lib/mock-data/meetings';
import { classYears } from '@/lib/mock-data/cohorts';
import { formatDate, getMeetingStatusLabel } from '@/lib/utils';

const currentClasses = classYears.filter(cy => cy.academicYearId === 'ay-2026-27' && cy.ilmEnabled);

const meetingsByMonth = [
  { month: 'Jun', meetings: 4 },
  { month: 'Jul', meetings: 5 },
  { month: 'Aug', meetings: 4 },
  { month: 'Sep', meetings: 1 },
];

const classRows = [
  { id: 'cy-sada-2627',  name: "SA'DA",  meetingId: 'meeting-sada-01',  date: '2026-09-15', status: 'approved',    attendance: '33/35' },
  { id: 'cy-sidra-2627', name: 'SIDRA',  meetingId: 'meeting-sidra-01', date: '2026-09-16', status: 'teacher_review', attendance: '30/35' },
  { id: 'cy-suffa-2627', name: 'SUFFA',  meetingId: 'meeting-suffa-01', date: '2026-09-17', status: 'finalizer_review', attendance: '34/35' },
  { id: 'cy-vahda-2627', name: 'VAHDA',  meetingId: 'meeting-vahda-01', date: '2026-09-18', status: 'collecting',   attendance: '33/35' },
  { id: 'cy-alfa-2627',  name: 'ALFA',   meetingId: 'meeting-alfa-01',  date: '2026-09-17', status: 'submitted',    attendance: '35/35' },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Academic Year 2026–27 · Week of 18 September 2026</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="ILM Classes" value={5} description="5 active this year" icon={BookOpen} />
        <StatCard title="Students" value={175} description="Across all ILM classes" icon={Users} />
        <StatCard title="Meetings This Year" value={14} description="Across all classes" icon={Clock} />
        <StatCard title="Awaiting Approval" value={3} description="Reports pending review" icon={FileText} accent />
      </div>

      {/* Two-column: Class table + chart */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Class overview table */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Latest Meeting Status</h2>
              <p className="text-xs text-slate-500 mt-0.5">Current week reports across all classes</p>
            </div>
            <Link href="/admin/meetings" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
              All meetings <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Class</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Latest Meeting</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Date</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Attendance</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {classRows.map((row, i) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-slate-900">{row.name}</span>
                    </td>
                    <td className="px-3 py-3.5 hidden sm:table-cell text-slate-600">
                      Meeting #{String(i + 1).padStart(2, '0')}
                    </td>
                    <td className="px-3 py-3.5 hidden md:table-cell text-slate-500 text-xs">
                      {formatDate(row.date)}
                    </td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={row.status} label={getMeetingStatusLabel(row.status)} />
                    </td>
                    <td className="px-3 py-3.5 hidden sm:table-cell text-slate-600 text-xs">
                      {row.attendance}
                    </td>
                    <td className="px-3 py-3.5 text-right">
                      <Link
                        href={`/admin/meetings/${row.meetingId}`}
                        className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 justify-end"
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column: chart + best class */}
        <div className="space-y-4">
          {/* Meetings by month chart */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-1">Meetings Completed</h2>
            <p className="text-xs text-slate-500 mb-4">By month (all classes combined)</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={meetingsByMonth} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={24} />
                <Tooltip
                  contentStyle={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  labelStyle={{ color: '#334155', fontWeight: 600 }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="meetings" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Best Class of the Week */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
              <h2 className="text-sm font-semibold text-slate-900">Best Class of the Week</h2>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-slate-900">ALFA</p>
              <p className="text-xs text-slate-500 mt-0.5">Week of 18 Sep 2026</p>
              <p className="text-xs text-green-700 mt-1 font-medium">Full attendance · All reports submitted</p>
            </div>
            <button className="mt-3 w-full text-xs text-indigo-600 border border-indigo-200 rounded-lg py-2 hover:bg-indigo-50 transition-colors">
              Change Selection
            </button>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'VAHDA Meeting #01', href: '/admin/meetings/meeting-vahda-01', desc: 'Collecting reports', color: 'border-indigo-200 hover:border-indigo-400' },
          { label: 'Classes', href: '/admin/classes', desc: '5 ILM classes active', color: 'border-gray-200 hover:border-slate-400' },
          { label: 'Students', href: '/admin/students', desc: '175 total students', color: 'border-gray-200 hover:border-slate-400' },
          { label: 'Timing Rules', href: '/admin/administration/timing-rules', desc: 'Configure durations', color: 'border-gray-200 hover:border-slate-400' },
        ].map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`bg-white rounded-lg border p-4 hover:shadow-sm transition-all ${link.color}`}
          >
            <p className="text-sm font-semibold text-slate-900">{link.label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
