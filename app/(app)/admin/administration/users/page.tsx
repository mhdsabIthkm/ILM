'use client';

import { mockUsers } from '@/lib/mock-data/users';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { Shield, School, GraduationCap, Users } from 'lucide-react';

const ROLE_META: Record<string, { label: string; color: string; icon: React.ComponentType<{className?: string}> }> = {
  admin:   { label: 'Admin',   color: 'bg-purple-100 text-purple-700', icon: Shield },
  teacher: { label: 'Teacher', color: 'bg-blue-100 text-blue-700', icon: School },
  student: { label: 'Student', color: 'bg-green-100 text-green-700', icon: GraduationCap },
  parent:  { label: 'Parent',  color: 'bg-orange-100 text-orange-700', icon: Users },
};

export default function UsersPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Users</h1>
          <p className="text-sm text-slate-500 mt-0.5">{mockUsers.length} user accounts</p>
        </div>
        <button className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
          + Add User
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Email</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Associated</th>
                <th className="px-3 py-3 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockUsers.map(user => {
                const meta = ROLE_META[user.role];
                const Icon = meta.icon;
                return (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <StudentAvatar name={user.name} size="sm" />
                        <span className="font-medium text-slate-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium rounded-md px-2 py-0.5 ${meta.color}`}>
                        <Icon className="w-3 h-3" />
                        {meta.label}
                      </span>
                    </td>
                    <td className="px-3 py-3 hidden sm:table-cell text-slate-500 text-xs">{user.email}</td>
                    <td className="px-3 py-3 hidden md:table-cell text-slate-500 text-xs">{user.associatedName ?? '—'}</td>
                    <td className="px-3 py-3 text-right">
                      <button className="text-xs text-indigo-600 hover:underline">Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
