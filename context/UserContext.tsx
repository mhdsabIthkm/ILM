'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/lib/types';
import { allStudents } from '@/lib/mock-data/students';
import { classYears } from '@/lib/mock-data/cohorts';
import { hasStudentPhoto } from '@/lib/mock-data/available-photos';
import { findStudentByAdmissionNo as findSupabaseStudent } from '@/lib/supabase/data-service';

export interface LoggedInUser {
  role: UserRole;
  // For student
  studentId?: string;
  studentName?: string;
  admissionNo?: string;
  classYearId?: string;
  className?: string;
  fatherName?: string;
  photoUrl?: string;
  // For parent
  childStudentId?: string;
  childName?: string;
  childAdmissionNo?: string;
  childClassYearId?: string;
  childClassName?: string;
  childFatherName?: string;
  childPhotoUrl?: string;
  // For admin
  adminName?: string;
  adminEmail?: string;
  adminPhotoUrl?: string;
}

interface UserContextValue {
  user: LoggedInUser;
  setUser: (u: LoggedInUser) => void;
  logout: () => void;
  // Convenience
  role: UserRole;
  userName: string;
}

const DEFAULT_ADMIN: LoggedInUser = {
  role: 'admin',
  adminName: 'Ustadh Abdullah',
  adminEmail: 'kunjonkunjon@ilm.org',
  adminPhotoUrl: '/avatars/admin.jpg',
};

const UserContext = createContext<UserContextValue>({
  user: DEFAULT_ADMIN,
  setUser: () => {},
  logout: () => {},
  role: 'admin',
  userName: 'Ustadh Abdullah',
});

export type LoginResponse = 
  | { success: true; user: LoggedInUser }
  | { 
      success: false; 
      reason: 'no_ilm'; 
      studentName: string; 
      className: string; 
      classNum?: number; 
      admissionNo: string;
      photoUrl?: string;
      fatherName?: string;
    }
  | { success: false; reason: 'not_found' };

// Returns LoggedInUser on success, error details if class has no ILM, or null if not found
export function loginAsStudent(admissionNo: string): LoggedInUser | 'no_ilm' | null {
  const trimmed = admissionNo.trim();
  const student = allStudents.find(s => s.admissionNo === trimmed);
  if (!student) {
    if (hasStudentPhoto(trimmed)) return 'no_ilm';
    return null;
  }
  const cy = classYears.find(c => c.id === student.classYearId);
  if (!student.isIlm || !cy?.ilmEnabled) return 'no_ilm';
  return {
    role: 'student',
    studentId: student.id,
    studentName: student.name,
    admissionNo: student.admissionNo,
    classYearId: student.classYearId,
    className: cy.displayName,
    photoUrl: `/students/${student.admissionNo}.jpg`,
  };
}

export function loginStudentDetailed(admissionNo: string): LoginResponse {
  const trimmed = admissionNo.trim();
  const student = allStudents.find(s => s.admissionNo === trimmed);
  
  if (!student) {
    // If student isn't in main list but their photo exists in archive/alif/other batch
    if (hasStudentPhoto(trimmed)) {
      return {
        success: false,
        reason: 'no_ilm',
        studentName: `Student #${trimmed}`,
        className: 'Non-ILM Class / Alumnus',
        admissionNo: trimmed,
        photoUrl: `/students/${trimmed}.jpg`,
      };
    }
    return { success: false, reason: 'not_found' };
  }

  const cy = classYears.find(c => c.id === student.classYearId);
  const photoUrl = `/students/${student.admissionNo}.jpg`;

  if (!student.isIlm || !cy?.ilmEnabled) {
    return {
      success: false,
      reason: 'no_ilm',
      studentName: student.name,
      className: student.className ?? cy?.displayName ?? 'Your Class',
      classNum: student.classNum,
      admissionNo: student.admissionNo,
      photoUrl,
      fatherName: student.fatherName,
    };
  }

  return {
    success: true,
    user: {
      role: 'student',
      studentId: student.id,
      studentName: student.name,
      admissionNo: student.admissionNo,
      classYearId: student.classYearId,
      className: cy.displayName,
      fatherName: student.fatherName,
      photoUrl,
    },
  };
}

export function loginAsParent(childAdmissionNo: string): LoggedInUser | 'no_ilm' | null {
  const trimmed = childAdmissionNo.trim();
  const child = allStudents.find(s => s.admissionNo === trimmed);
  if (!child) {
    if (hasStudentPhoto(trimmed)) return 'no_ilm';
    return null;
  }
  const cy = classYears.find(c => c.id === child.classYearId);
  if (!child.isIlm || !cy?.ilmEnabled) return 'no_ilm';
  return {
    role: 'parent',
    childStudentId: child.id,
    childName: child.name,
    childAdmissionNo: child.admissionNo,
    childClassYearId: child.classYearId,
    childClassName: cy.displayName,
    childFatherName: child.fatherName,
    childPhotoUrl: `/students/${child.admissionNo}.jpg`,
  };
}

export function loginParentDetailed(childAdmissionNo: string): LoginResponse {
  const trimmed = childAdmissionNo.trim();
  const child = allStudents.find(s => s.admissionNo === trimmed);

  if (!child) {
    if (hasStudentPhoto(trimmed)) {
      return {
        success: false,
        reason: 'no_ilm',
        studentName: `Child #${trimmed}`,
        className: 'Non-ILM Class / Alumnus',
        admissionNo: trimmed,
        photoUrl: `/students/${trimmed}.jpg`,
      };
    }
    return { success: false, reason: 'not_found' };
  }

  const cy = classYears.find(c => c.id === child.classYearId);
  const photoUrl = `/students/${child.admissionNo}.jpg`;

  if (!child.isIlm || !cy?.ilmEnabled) {
    return {
      success: false,
      reason: 'no_ilm',
      studentName: child.name,
      className: child.className ?? cy?.displayName ?? 'Their Class',
      classNum: child.classNum,
      admissionNo: child.admissionNo,
      photoUrl,
      fatherName: child.fatherName,
    };
  }

  return {
    success: true,
    user: {
      role: 'parent',
      childStudentId: child.id,
      childName: child.name,
      childAdmissionNo: child.admissionNo,
      childClassYearId: child.classYearId,
      childClassName: cy.displayName,
      childFatherName: child.fatherName,
      childPhotoUrl: photoUrl,
    },
  };
}

export async function loginStudentDetailedAsync(admissionNo: string): Promise<LoginResponse> {
  const trimmed = admissionNo.trim();
  const dbStudent = await findSupabaseStudent(trimmed);
  if (dbStudent) {
    const cy = classYears.find(c => c.id === dbStudent.classYearId) ||
               classYears.find(c => c.level === dbStudent.classNum);
    const photoUrl = dbStudent.avatarUrl || `/students/${dbStudent.admissionNo}.jpg`;

    if (!dbStudent.isIlm || (cy && !cy.ilmEnabled)) {
      return {
        success: false,
        reason: 'no_ilm',
        studentName: dbStudent.name,
        className: dbStudent.className ?? cy?.displayName ?? 'Your Class',
        classNum: dbStudent.classNum,
        admissionNo: dbStudent.admissionNo,
        photoUrl,
        fatherName: dbStudent.fatherName,
      };
    }

    return {
      success: true,
      user: {
        role: 'student',
        studentId: dbStudent.id,
        studentName: dbStudent.name,
        admissionNo: dbStudent.admissionNo,
        classYearId: dbStudent.classYearId,
        className: cy?.displayName ?? dbStudent.className,
        fatherName: dbStudent.fatherName,
        photoUrl,
      },
    };
  }
  return loginStudentDetailed(trimmed);
}

export async function loginParentDetailedAsync(childAdmissionNo: string): Promise<LoginResponse> {
  const trimmed = childAdmissionNo.trim();
  const dbStudent = await findSupabaseStudent(trimmed);
  if (dbStudent) {
    const cy = classYears.find(c => c.id === dbStudent.classYearId) ||
               classYears.find(c => c.level === dbStudent.classNum);
    const photoUrl = dbStudent.avatarUrl || `/students/${dbStudent.admissionNo}.jpg`;

    if (!dbStudent.isIlm || (cy && !cy.ilmEnabled)) {
      return {
        success: false,
        reason: 'no_ilm',
        studentName: dbStudent.name,
        className: dbStudent.className ?? cy?.displayName ?? 'Their Class',
        classNum: dbStudent.classNum,
        admissionNo: dbStudent.admissionNo,
        photoUrl,
        fatherName: dbStudent.fatherName,
      };
    }

    return {
      success: true,
      user: {
        role: 'parent',
        childStudentId: dbStudent.id,
        childName: dbStudent.name,
        childAdmissionNo: dbStudent.admissionNo,
        childClassYearId: dbStudent.classYearId,
        childClassName: cy?.displayName ?? dbStudent.className,
        childFatherName: dbStudent.fatherName,
        childPhotoUrl: photoUrl,
      },
    };
  }
  return loginParentDetailed(trimmed);
}

function getUserLabel(u: LoggedInUser): string {
  if (u.role === 'student') return u.studentName ?? 'Student';
  if (u.role === 'parent') return `Parent of ${u.childName ?? 'Student'}`;
  return u.adminName ?? 'Admin';
}

function getSavedUser(): LoggedInUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem('ilm-user');
    if (saved) {
      const parsed = JSON.parse(saved) as LoggedInUser;
      if (['admin', 'student', 'parent'].includes(parsed.role)) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

export const GUEST_USER: LoggedInUser = {
  role: 'student',
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<LoggedInUser>(() => {
    return getSavedUser() ?? GUEST_USER;
  });

  useEffect(() => {
    const saved = getSavedUser();
    if (saved) {
      setUserState(saved);
    }
  }, []);

  const setUser = (u: LoggedInUser) => {
    setUserState(u);
    try {
      localStorage.setItem('ilm-user', JSON.stringify(u));
      document.cookie = `ilm_role=${u.role}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {}
  };

  const logout = () => {
    setUserState(GUEST_USER);
    try {
      localStorage.removeItem('ilm-user');
      document.cookie = 'ilm_role=; path=/; max-age=0; SameSite=Lax';
    } catch {}
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      logout,
      role: user.role,
      userName: getUserLabel(user),
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
