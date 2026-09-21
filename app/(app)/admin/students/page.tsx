'use client';

import { useState } from 'react';
import Link from 'next/link';
import { allStudents } from '@/lib/mock-data/students';
import { classYears } from '@/lib/mock-data/cohorts';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { Search, ChevronRight, Eye } from 'lucide-react';

const classMap = Object.fromEntries(classYears.map(cy => [cy.id, cy.displayName]));

const TEN_CLASSES = [
  { id: 'cy-sada-2627', name: "SA'DA" },
  { id: 'cy-sidra-2627', name: 'SIDRA' },
  { id: 'cy-suffa-2627', name: 'SUFFA' },
  { id: 'cy-vahda-2627', name: 'VAHDA' },
  { id: 'cy-class5-2627', name: 'HUDA' },
  { id: 'cy-alfa-2627', name: 'ALFA' },
  { id: 'cy-class7-2627', name: 'SAFWA' },
  { id: 'cy-degree1-2627', name: 'THUFA' },
  { id: 'cy-degree2-2627', name: 'NAJWA' },
  { id: 'cy-degree3-2627', name: 'WIDAD' },
];

export default function StudentsPage() {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('all');

  const ilmCount = allStudents.filter(s => s.isIlm).length;

  const filtered = allStudents.filter(s => {
    const query = search.toLowerCase().trim();
    const matchSearch =
      !query ||
      s.name.toLowerCase().includes(query) ||
      s.admissionNo.includes(query) ||
      (s.className && s.className.toLowerCase().includes(query));
    
    if (filterClass === 'all') return matchSearch;
    if (filterClass === 'ilm_only') return matchSearch && s.isIlm;
    if (filterClass === 'non_ilm') return matchSearch && !s.isIlm;
    return matchSearch && (s.classYearId === filterClass || s.className === filterClass || s.classNum === Number(filterClass));
  });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Students Directory</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          {allStudents.length} total students across 10 classes · {ilmCount} participating in ILM
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center justify-between bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
        <div className="flex flex-wrap gap-3 items-center flex-1">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search by name, admission no., class..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          {/* Clean Dropdown with All Students, ILM Active Students, ILM Non Active Students, and Individual Classes */}
          <select
            value={filterClass}
            onChange={e => setFilterClass(e.target.value)}
            className="border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer shadow-2xs"
          >
            <option value="all">All Students</option>
            <option value="ilm_only">ILM Active Students</option>
            <option value="non_ilm">ILM Non Active Students</option>
            <optgroup label="Individual Classes">
              {TEN_CLASSES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <span className="text-xs sm:text-sm font-semibold text-slate-500">
          Showing {filtered.length} {filtered.length === 1 ? 'student' : 'students'}
        </span>
      </div>

      {/* Student table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-gray-200">
                <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-600 uppercase tracking-wider">Student</th>
                <th className="text-left px-3.5 py-3.5 text-xs font-bold text-slate-600 uppercase tracking-wider">Adm No.</th>
                <th className="text-left px-3.5 py-3.5 text-xs font-bold text-slate-600 uppercase tracking-wider">Class</th>
                <th className="text-left px-3.5 py-3.5 text-xs font-bold text-slate-600 uppercase tracking-wider hidden md:table-cell">ILM Status</th>
                <th className="px-4 py-3.5 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <StudentAvatar name={s.name} admissionNo={s.admissionNo} size="md" />
                      <span className="font-bold text-sm text-slate-900 leading-tight">
                        {s.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-3.5 py-3">
                    <span className="font-mono font-bold text-slate-800 text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200">
                      {s.admissionNo}
                    </span>
                  </td>
                  <td className="px-3.5 py-3">
                    <span className="text-xs bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 rounded-md px-2.5 py-1">
                      {s.className ?? classMap[s.classYearId] ?? s.classYearId}
                    </span>
                  </td>
                  <td className="px-3.5 py-3 hidden md:table-cell">
                    {s.isIlm ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        ILM Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-2.5 py-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        Non-ILM
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/students/${s.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
