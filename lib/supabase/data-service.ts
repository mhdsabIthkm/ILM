import { supabase, isSupabaseConfigured } from './client';
import {
  allStudents,
  getStudent as getMockStudent,
  findStudentByAdmissionNo as findMockStudentByAdmissionNo,
} from '@/lib/mock-data/students';
import { classYears as mockClassYears } from '@/lib/mock-data/cohorts';
import {
  allMeetings as mockAllMeetings,
  vahdaMeeting1Evaluations,
  vahdaMeeting1Awards,
} from '@/lib/mock-data/meetings';
import { Student, ILMMeeting, Evaluation, Award, ClassYear } from '@/lib/types';

// Fetch all students (Supabase with fallback)
export async function getStudents(): Promise<Student[]> {
  if (!isSupabaseConfigured || !supabase) {
    return allStudents;
  }
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('admission_no', { ascending: true });

    if (error || !data || data.length === 0) {
      return allStudents;
    }

    return data.map(s => ({
      id: s.id,
      name: s.name,
      admissionNo: s.admission_no,
      classYearId: s.class_year_id,
      cohortId: s.cohort_id ?? `cohort-${s.class_num}`,
      classNum: s.class_num,
      className: s.class_name,
      fatherName: s.father_name,
      isIlm: s.is_ilm,
      avatarUrl: s.avatar_url,
    }));
  } catch (err) {
    console.warn('Error querying Supabase students, falling back to local records:', err);
    return allStudents;
  }
}

// Find student by admission number (Supabase with fallback)
export async function findStudentByAdmissionNo(admissionNo: string): Promise<Student | null> {
  const trimmed = admissionNo.trim();
  if (!isSupabaseConfigured || !supabase) {
    return findMockStudentByAdmissionNo(trimmed) ?? null;
  }
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('admission_no', trimmed)
      .maybeSingle();

    if (error || !data) {
      return findMockStudentByAdmissionNo(trimmed) ?? null;
    }

    return {
      id: data.id,
      name: data.name,
      admissionNo: data.admission_no,
      classYearId: data.class_year_id,
      cohortId: data.cohort_id ?? `cohort-${data.class_num}`,
      classNum: data.class_num,
      className: data.class_name,
      fatherName: data.father_name,
      isIlm: data.is_ilm,
      avatarUrl: data.avatar_url,
    };
  } catch {
    return findMockStudentByAdmissionNo(trimmed) ?? null;
  }
}

// Fetch class cohorts (Supabase with fallback)
export async function getClassCohorts(): Promise<ClassYear[]> {
  if (!isSupabaseConfigured || !supabase) {
    return mockClassYears;
  }
  try {
    const { data, error } = await supabase
      .from('class_years')
      .select('*')
      .order('level', { ascending: true });

    if (error || !data || data.length === 0) {
      return mockClassYears;
    }

    return data.map(c => ({
      id: c.id,
      cohortId: c.cohort_id ?? `cohort-${c.level}`,
      displayName: c.display_name,
      ilmEnabled: c.ilm_enabled,
      academicYearId: c.academic_year_id,
      level: c.level,
    }));
  } catch {
    return mockClassYears;
  }
}

// Upload a scanned report document to Supabase Storage
export async function uploadScannedReport(
  meetingId: string,
  file: File | Blob,
  fileName: string
): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }
  try {
    const filePath = `reports/${meetingId}/${Date.now()}_${fileName}`;
    const { error: uploadError } = await supabase.storage
      .from('handwritten-reports')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('handwritten-reports')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error('Failed to upload report to Supabase:', err);
    return null;
  }
}
