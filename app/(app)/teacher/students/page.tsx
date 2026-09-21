'use client';
import Link from 'next/link';
import { allStudents } from '@/lib/mock-data/students';
import { StudentAvatar } from '@/components/ui/student-avatar';
const myStudents = allStudents.filter(s => ['cy-vahda-2627','cy-suffa-2627'].includes(s.classYearId));
export default function TeacherStudentsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-slate-900">My Students</h1>
      <p className="text-sm text-slate-500">{myStudents.length} students across VAHDA and SUFFA</p>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {myStudents.map(s => (
            <div key={s.id} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50">
              <StudentAvatar name={s.name} size="sm" />
              <span className="flex-1 text-sm font-medium text-slate-900">{s.name}</span>
              <span className="text-xs text-slate-400">{s.admissionNo}</span>
              <Link href={`/admin/students/${s.id}`} className="text-xs text-indigo-600 hover:underline">View</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
