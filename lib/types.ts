// ============================================================
// MDIA ILM — Core TypeScript Types
// ============================================================

// --- Campus & Academic Structure ---

export interface Campus {
  id: string;
  name: string;
  shortName: string;
  address?: string;
}

export interface AcademicYear {
  id: string;
  label: string; // e.g. "2025-26"
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface Cohort {
  id: string;
  campusId: string;
  createdYear: string; // e.g. "2020"
  notes?: string;
}

/** Maps a Cohort to a display name for a specific Academic Year */
export interface ClassYear {
  id: string;
  cohortId: string;
  academicYearId: string;
  displayName: string; // e.g. "VAHDA", "SUFFA"
  level: number; // 1=SA'DA, 2=SIDRA, 3=SUFFA, 4=VAHDA, 5=no-ILM, 6=ALFA
  ilmEnabled: boolean;
  homeRoomTeacherId?: string;
}

// --- Users & Students ---

export type UserRole = 'admin' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  /** For parent: links to student ids */
  childrenIds?: string[];
}

export interface Student {
  id: string;
  name: string;
  admissionNo: string;
  classYearId: string; // current class
  cohortId: string;
  dateOfBirth?: string;
  avatarUrl?: string;
  parentIds?: string[];
  fatherName?: string;
  classNum?: number;
  className?: string;
  isIlm?: boolean;
}

export interface Enrollment {
  id: string;
  studentId: string;
  classYearId: string;
  academicYearId: string;
  joinDate: string;
  status: 'active' | 'transferred' | 'left';
}

// --- ILM Roles & Meetings ---

export interface ILMRole {
  id: string;
  name: string;
  shortName?: string;
  expandedName?: string; // e.g. "Learning Master of the Day" for LMOD
  description?: string;
  category: 'opening' | 'prepared_speech' | 'table_topics' | 'ice_breaking' | 'evaluation' | 'closing' | 'award' | 'misc';
  isFixed: boolean; // true = always present, false = optional/repeating
  maxCount?: number; // max number of students in this role per meeting
  defaultDurationMinutes?: number;
}

export type MeetingStatus =
  | 'planned'
  | 'conducted'
  | 'collecting'
  | 'finalizer_review'
  | 'teacher_review'
  | 'submitted'
  | 'approved'
  | 'locked';

export interface BilingualText {
  english: string;
  malayalam: string;
}

export interface ILMMeeting {
  id: string;
  classYearId: string;
  academicYearId: string;
  meetingNumber: number;
  date: string; // ISO date
  theme: BilingualText;
  status: MeetingStatus;
  venue?: string;
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  notes?: string;
  bestClassOfWeek?: boolean;
}

export interface RoleAssignment {
  id: string;
  meetingId: string;
  studentId: string;
  roleId: string;
  /** For roles that can have multiple students (e.g. Evaluator), which slot */
  slot?: number;
  notes?: string;
}

// --- Attendance ---

export type AttendanceStatus = 'present' | 'absent' | 'excused';

export interface AttendanceRecord {
  id: string;
  meetingId: string;
  studentId: string;
  status: AttendanceStatus;
  notes?: string;
}

// --- Prepared Speeches ---

export interface PreparedSpeech {
  id: string;
  meetingId: string;
  studentId: string;
  order: number;
  subject: BilingualText;
  durationMinutes?: number;
  notes?: string;
}

// --- Table Topics ---

export interface TableTopic {
  id: string;
  meetingId: string;
  studentId: string;
  order: number;
  topic: BilingualText;
  durationSeconds?: number;
  notes?: string;
}

// --- Ice Breaking ---

export interface IceBreakingSpeech {
  id: string;
  meetingId: string;
  studentId: string;
  topic?: BilingualText;
  notes?: string;
}

// --- Evaluation ---

export type ObservationTagType = 'strength' | 'improvement';

export interface ObservationTag {
  id: string;
  label: string;
  type: ObservationTagType;
  category: 'content' | 'delivery' | 'language' | 'time' | 'stage_presence';
}

export interface Evaluation {
  id: string;
  meetingId: string;
  evaluatorStudentId: string;
  evaluatorRole: 'evaluator1' | 'evaluator2' | 'evaluator3' | 'general_evaluator';
  subjectStudentId: string;
  remarks: string;
  strengthTagIds: string[];
  improvementTagIds: string[];
  submittedAt?: string;
}

// --- Grammarian ---

export interface GrammarianObservation {
  id: string;
  meetingId: string;
  grammarianStudentId: string;
  speakerStudentId: string;
  whatWasSaid: string;
  suggestedCorrection: string;
  note?: string;
}

export interface GrammarianReport {
  id: string;
  meetingId: string;
  grammarianStudentId: string;
  observations: GrammarianObservation[];
  overallRemarks: string;
  submittedAt?: string;
}

// --- Ah Counter ---

export interface AhCounterRecord {
  id: string;
  meetingId: string;
  ahCounterStudentId: string;
  speakerStudentId: string;
  pauseCount: number;
  notes?: string;
}

export interface AhCounterReport {
  id: string;
  meetingId: string;
  ahCounterStudentId: string;
  records: AhCounterRecord[];
  overallRemarks?: string;
  submittedAt?: string;
}

// --- Timer ---

export type TimingResult = 'under_time' | 'on_time' | 'over_time';

export interface TimerEntry {
  id: string;
  meetingId: string;
  timerStudentId: string;
  activityLabel: string;
  roleId?: string;
  participantStudentId?: string;
  allowedMinutes: number;
  actualStartTime?: string; // HH:mm
  actualEndTime?: string;   // HH:mm
  actualDurationMinutes?: number;
  timingResult?: TimingResult;
  notes?: string;
}

export interface TimerReport {
  id: string;
  meetingId: string;
  timerStudentId: string;
  meetingStartTime?: string;
  meetingEndTime?: string;
  entries: TimerEntry[];
  submittedAt?: string;
}

// --- Timing Rules ---

export interface TimingRule {
  id: string;
  roleId?: string;
  activityLabel: string;
  defaultMinutes: number;
  isEditable: boolean;
  notes?: string;
}

// --- Awards ---

export type AwardType =
  | 'star_of_the_week'
  | 'best_evaluator'
  | 'best_speaker'
  | 'best_tt_speaker'
  | 'best_class_of_week'
  | 'other';

export interface Award {
  id: string;
  meetingId: string;
  type: AwardType;
  studentId?: string; // null for best_class_of_week
  classYearId?: string; // for best_class_of_week
  label?: string; // custom label for 'other'
  notes?: string;
}

// --- Media ---

export interface MeetingMedia {
  id: string;
  meetingId: string;
  url: string;
  caption?: string;
  uploadedAt: string;
  uploadedByStudentId?: string;
  isPlaceholder?: boolean;
}

// --- Report Sections ---

export type ReportSectionKey =
  | 'attendance'
  | 'timer'
  | 'grammarian'
  | 'ah_counter'
  | 'evaluator1'
  | 'evaluator2'
  | 'evaluator3'
  | 'general_evaluator'
  | 'awards'
  | 'gallery';

export type SectionStatus = 'not_started' | 'in_progress' | 'submitted' | 'complete' | 'missing' | 'nil';

export interface ReportSection {
  key: ReportSectionKey;
  label: string;
  required: boolean;
  status: SectionStatus;
  nilReason?: string;
  submittedByStudentId?: string;
  submittedAt?: string;
}

export interface ReportSubmission {
  id: string;
  meetingId: string;
  sections: ReportSection[];
  overallStatus: MeetingStatus;
  finalizerStudentId?: string;
  finalizedAt?: string;
  teacherApprovedAt?: string;
  adminApprovedAt?: string;
  lockedAt?: string;
}

// --- Feature Flags ---

export interface FeatureFlags {
  allowClassMemberComparison: boolean;
  enablePhotoGallery: boolean;
  enableHandwritingScanner: boolean;
  requireBilingualTopics: boolean;
}
