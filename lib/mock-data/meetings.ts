import {
  ILMMeeting,
  RoleAssignment,
  PreparedSpeech,
  TableTopic,
  IceBreakingSpeech,
  AttendanceRecord,
  Evaluation,
  GrammarianReport,
  AhCounterReport,
  TimerReport,
  Award,
  MeetingMedia,
  ReportSubmission,
} from '../types';

// ============================================================
// VAHDA ILM Meeting #01 — 18 September 2026
// ============================================================

export const vahdaMeeting1: ILMMeeting = {
  id: 'meeting-vahda-01',
  classYearId: 'cy-vahda-2627',
  academicYearId: 'ay-2026-27',
  meetingNumber: 1,
  date: '2026-09-18',
  theme: {
    english: 'Loss: The Way to Success',
    malayalam: 'നഷ്ടം: വിജയത്തിലേക്കുള്ള വഴി',
  },
  status: 'collecting',
  startTime: '14:00',
  endTime: '16:30',
};

// ---- Role Assignments ----
export const vahdaMeeting1Roles: RoleAssignment[] = [
  { id: 'ra-01', meetingId: 'meeting-vahda-01', studentId: 'vahda-s01',    roleId: 'role-president' },
  { id: 'ra-02', meetingId: 'meeting-vahda-01', studentId: 'vahda-adil',   roleId: 'role-qirath' },
  { id: 'ra-03', meetingId: 'meeting-vahda-01', studentId: 'vahda-bilal',  roleId: 'role-dua' },
  { id: 'ra-04', meetingId: 'meeting-vahda-01', studentId: 'vahda-beeran', roleId: 'role-welcome' },
  { id: 'ra-05', meetingId: 'meeting-vahda-01', studentId: 'vahda-hafeez', roleId: 'role-inauguration' },
  { id: 'ra-06', meetingId: 'meeting-vahda-01', studentId: 'vahda-haeezp', roleId: 'role-lmod' },
  { id: 'ra-07', meetingId: 'meeting-vahda-01', studentId: 'vahda-muhaviz',roleId: 'role-tt-master' },
  { id: 'ra-08', meetingId: 'meeting-vahda-01', studentId: 'vahda-muhammed',roleId: 'role-ice-breaking' },
  { id: 'ra-09', meetingId: 'meeting-vahda-01', studentId: 'vahda-hafeez', roleId: 'role-grammarian' },
  { id: 'ra-10', meetingId: 'meeting-vahda-01', studentId: 'vahda-aflah',  roleId: 'role-ah-counter' },
  { id: 'ra-11', meetingId: 'meeting-vahda-01', studentId: 'vahda-s02',    roleId: 'role-evaluator1' },
  { id: 'ra-12', meetingId: 'meeting-vahda-01', studentId: 'vahda-s03',    roleId: 'role-evaluator2' },
  { id: 'ra-13', meetingId: 'meeting-vahda-01', studentId: 'vahda-s04',    roleId: 'role-evaluator3' },
  { id: 'ra-14', meetingId: 'meeting-vahda-01', studentId: 'vahda-hisham', roleId: 'role-general-evaluator' },
  { id: 'ra-15', meetingId: 'meeting-vahda-01', studentId: 'vahda-hafizst',roleId: 'role-timer' },
  { id: 'ra-16', meetingId: 'meeting-vahda-01', studentId: 'vahda-munzir', roleId: 'role-thankyou' },
  // TT speakers
  { id: 'ra-tt1', meetingId: 'meeting-vahda-01', studentId: 'vahda-qubaib',  roleId: 'role-tt-speaker', slot: 1 },
  { id: 'ra-tt2', meetingId: 'meeting-vahda-01', studentId: 'vahda-azeem',   roleId: 'role-tt-speaker', slot: 2 },
  { id: 'ra-tt3', meetingId: 'meeting-vahda-01', studentId: 'vahda-sinan',   roleId: 'role-tt-speaker', slot: 3 },
  { id: 'ra-tt4', meetingId: 'meeting-vahda-01', studentId: 'vahda-thufail', roleId: 'role-tt-speaker', slot: 4 },
  { id: 'ra-tt5', meetingId: 'meeting-vahda-01', studentId: 'vahda-shahid',  roleId: 'role-tt-speaker', slot: 5 },
  { id: 'ra-tt6', meetingId: 'meeting-vahda-01', studentId: 'vahda-hilal',   roleId: 'role-tt-speaker', slot: 6 },
  // Prepared speakers
  { id: 'ra-ps1', meetingId: 'meeting-vahda-01', studentId: 'vahda-zaid',    roleId: 'role-prepared-speaker', slot: 1 },
  { id: 'ra-ps2', meetingId: 'meeting-vahda-01', studentId: 'vahda-hashir',  roleId: 'role-prepared-speaker', slot: 2 },
  { id: 'ra-ps3', meetingId: 'meeting-vahda-01', studentId: 'vahda-nafih',   roleId: 'role-prepared-speaker', slot: 3 },
  { id: 'ra-ps4', meetingId: 'meeting-vahda-01', studentId: 'vahda-jalal',   roleId: 'role-prepared-speaker', slot: 4 },
];

// ---- Prepared Speeches ----
export const vahdaMeeting1PreparedSpeeches: PreparedSpeech[] = [
  {
    id: 'ps-01',
    meetingId: 'meeting-vahda-01',
    studentId: 'vahda-zaid',
    order: 1,
    subject: {
      english: 'Muslim Women and Public Perception',
      malayalam: 'മുസ്ലിം സ്ത്രീയും പൊതുബോധവും',
    },
  },
  {
    id: 'ps-02',
    meetingId: 'meeting-vahda-01',
    studentId: 'vahda-hashir',
    order: 2,
    subject: {
      english: 'Baghdad: A Centre of Knowledge and Learning',
      malayalam: 'ബാഗ്ദാദ് ഇൽമിനെ വിജ്ഞാന കേന്ത്രം',
    },
  },
  {
    id: 'ps-03',
    meetingId: 'meeting-vahda-01',
    studentId: 'vahda-nafih',
    order: 3,
    subject: {
      english: 'C. H. Mohammed Koya: A Leader of Muslim Politics',
      malayalam: 'സി എച് മുഹമ്മദ് കോയ; മുസ്ലിം രാഷ്ട്രീയത്തിന്റെ നേതാവ്',
    },
  },
  {
    id: 'ps-04',
    meetingId: 'meeting-vahda-01',
    studentId: 'vahda-jalal',
    order: 4,
    subject: {
      english: 'Topic 4',
      malayalam: 'വിഷയം 4',
    },
  },
];

// ---- Table Topics ----
export const vahdaMeeting1TableTopics: TableTopic[] = [
  { id: 'tt-01', meetingId: 'meeting-vahda-01', studentId: 'vahda-qubaib',  order: 1, topic: { english: 'TT Topic 1', malayalam: 'ടി.ടി. വിഷയം 1' } },
  { id: 'tt-02', meetingId: 'meeting-vahda-01', studentId: 'vahda-azeem',   order: 2, topic: { english: 'TT Topic 2', malayalam: 'ടി.ടി. വിഷയം 2' } },
  { id: 'tt-03', meetingId: 'meeting-vahda-01', studentId: 'vahda-sinan',   order: 3, topic: { english: 'TT Topic 3', malayalam: 'ടി.ടി. വിഷയം 3' } },
  { id: 'tt-04', meetingId: 'meeting-vahda-01', studentId: 'vahda-thufail', order: 4, topic: { english: 'TT Topic 4', malayalam: 'ടി.ടി. വിഷയം 4' } },
  { id: 'tt-05', meetingId: 'meeting-vahda-01', studentId: 'vahda-shahid',  order: 5, topic: { english: 'TT Topic 5', malayalam: 'ടി.ടി. വിഷയം 5' } },
  { id: 'tt-06', meetingId: 'meeting-vahda-01', studentId: 'vahda-hilal',   order: 6, topic: { english: 'TT Topic 6', malayalam: 'ടി.ടി. വിഷയം 6' } },
];

// ---- Ice Breaking ----
export const vahdaMeeting1IceBreaking: IceBreakingSpeech = {
  id: 'ib-01',
  meetingId: 'meeting-vahda-01',
  studentId: 'vahda-muhammed',
  topic: { english: 'My First Day', malayalam: 'എന്റെ ആദ്യ ദിവസം' },
  notes: 'Introductory ice breaking speech.',
};

// ---- Attendance (all 35 VAHDA students) ----
// Import vahdaStudents would cause circular — we reference IDs directly
const vahdaStudentIds = [
  'vahda-s01','vahda-s02','vahda-s03','vahda-s04',
  'vahda-adil','vahda-bilal','vahda-beeran','vahda-hafeez','vahda-haeezp',
  'vahda-muhaviz','vahda-aflah','vahda-munzir','vahda-hafizst','vahda-hisham',
  'vahda-nafih','vahda-sinan','vahda-zaid','vahda-hashir','vahda-jalal',
  'vahda-qubaib','vahda-azeem','vahda-thufail','vahda-shahid','vahda-hilal',
  'vahda-muhammed',
  ...Array.from({ length: 10 }, (_, i) => `vahda-x${String(i + 1).padStart(2, '0')}`),
];

export const vahdaMeeting1Attendance: AttendanceRecord[] = vahdaStudentIds.map((sid, i) => ({
  id: `att-${sid}`,
  meetingId: 'meeting-vahda-01',
  studentId: sid,
  status: i === 30 ? 'absent' : i === 31 ? 'excused' : 'present',
}));

// ---- Evaluations ----
// Evaluator 1 (vahda-s02): Zaid, Hashir, Qubaib, Azeem
// Evaluator 2 (vahda-s03): Nafih, Jalal, Sinan, Thufail
// Evaluator 3 (vahda-s04): Shahid, Hilal, Muhammed

export const vahdaMeeting1Evaluations: Evaluation[] = [
  {
    id: 'ev-e1-zaid',   meetingId: 'meeting-vahda-01', evaluatorStudentId: 'vahda-s02', evaluatorRole: 'evaluator1',
    subjectStudentId: 'vahda-zaid',    remarks: 'Strong delivery and well-structured speech. Good eye contact.', strengthTagIds: ['str-confidence','str-eye-contact'], improvementTagIds: ['imp-pace'],
  },
  {
    id: 'ev-e1-hashir',  meetingId: 'meeting-vahda-01', evaluatorStudentId: 'vahda-s02', evaluatorRole: 'evaluator1',
    subjectStudentId: 'vahda-hashir',  remarks: 'Excellent research and vocabulary. Timing was slightly over.', strengthTagIds: ['str-vocabulary','str-structure'], improvementTagIds: ['imp-timing'],
  },
  {
    id: 'ev-e1-qubaib',  meetingId: 'meeting-vahda-01', evaluatorStudentId: 'vahda-s02', evaluatorRole: 'evaluator1',
    subjectStudentId: 'vahda-qubaib',  remarks: 'Good confidence for a TT speech. Needs to slow down.', strengthTagIds: ['str-confidence'], improvementTagIds: ['imp-pace','imp-pausing'],
  },
  {
    id: 'ev-e1-azeem',   meetingId: 'meeting-vahda-01', evaluatorStudentId: 'vahda-s02', evaluatorRole: 'evaluator1',
    subjectStudentId: 'vahda-azeem',   remarks: 'Engaging and fun. Watch grammar.', strengthTagIds: ['str-engagement'], improvementTagIds: ['imp-grammar'],
  },
  {
    id: 'ev-e2-nafih',   meetingId: 'meeting-vahda-01', evaluatorStudentId: 'vahda-s03', evaluatorRole: 'evaluator2',
    subjectStudentId: 'vahda-nafih',   remarks: 'Outstanding speech. Deep knowledge, confident delivery.', strengthTagIds: ['str-confidence','str-preparation','str-vocabulary'], improvementTagIds: [],
  },
  {
    id: 'ev-e2-jalal',   meetingId: 'meeting-vahda-01', evaluatorStudentId: 'vahda-s03', evaluatorRole: 'evaluator2',
    subjectStudentId: 'vahda-jalal',   remarks: 'Decent effort. Topic needs more development.', strengthTagIds: ['str-fluency'], improvementTagIds: ['imp-structure','imp-preparation'],
  },
  {
    id: 'ev-e2-sinan',   meetingId: 'meeting-vahda-01', evaluatorStudentId: 'vahda-s03', evaluatorRole: 'evaluator2',
    subjectStudentId: 'vahda-sinan',   remarks: 'Best TT speaker. Very natural.', strengthTagIds: ['str-confidence','str-fluency','str-engagement'], improvementTagIds: [],
  },
  {
    id: 'ev-e2-thufail', meetingId: 'meeting-vahda-01', evaluatorStudentId: 'vahda-s03', evaluatorRole: 'evaluator2',
    subjectStudentId: 'vahda-thufail', remarks: 'Good attempt. Work on clarity.', strengthTagIds: ['str-preparation'], improvementTagIds: ['imp-clarity'],
  },
  {
    id: 'ev-e3-shahid',  meetingId: 'meeting-vahda-01', evaluatorStudentId: 'vahda-s04', evaluatorRole: 'evaluator3',
    subjectStudentId: 'vahda-shahid',  remarks: 'Reasonable effort. Eye contact needs improvement.', strengthTagIds: ['str-structure'], improvementTagIds: ['imp-eye-contact'],
  },
  {
    id: 'ev-e3-hilal',   meetingId: 'meeting-vahda-01', evaluatorStudentId: 'vahda-s04', evaluatorRole: 'evaluator3',
    subjectStudentId: 'vahda-hilal',   remarks: 'Clear and concise TT. Good under pressure.', strengthTagIds: ['str-clarity','str-confidence'], improvementTagIds: ['imp-timing'],
  },
  {
    id: 'ev-e3-muhammed',meetingId: 'meeting-vahda-01', evaluatorStudentId: 'vahda-s04', evaluatorRole: 'evaluator3',
    subjectStudentId: 'vahda-muhammed',remarks: 'Ice breaking was heartfelt. Needs more projection.', strengthTagIds: ['str-preparation'], improvementTagIds: ['imp-confidence'],
  },
];

// ---- Grammarian Report ----
export const vahdaMeeting1GrammarianReport: GrammarianReport = {
  id: 'gram-01',
  meetingId: 'meeting-vahda-01',
  grammarianStudentId: 'vahda-hafeez',
  observations: [
    {
      id: 'go-01', meetingId: 'meeting-vahda-01', grammarianStudentId: 'vahda-hafeez',
      speakerStudentId: 'vahda-zaid',
      whatWasSaid: 'womens rights',
      suggestedCorrection: "women's rights",
      note: 'Missing apostrophe',
    },
    {
      id: 'go-02', meetingId: 'meeting-vahda-01', grammarianStudentId: 'vahda-hafeez',
      speakerStudentId: 'vahda-hashir',
      whatWasSaid: 'it were a great city',
      suggestedCorrection: 'it was a great city',
      note: 'Subject-verb agreement',
    },
    {
      id: 'go-03', meetingId: 'meeting-vahda-01', grammarianStudentId: 'vahda-hafeez',
      speakerStudentId: 'vahda-nafih',
      whatWasSaid: 'he lead the party',
      suggestedCorrection: 'he led the party',
      note: 'Past tense of lead',
    },
  ],
  overallRemarks: 'Overall grammar was good. Students should review subject-verb agreement and apostrophe usage.',
  submittedAt: '2026-09-18T16:45:00',
};

// ---- Ah Counter Report ----
export const vahdaMeeting1AhCounterReport: AhCounterReport = {
  id: 'ah-01',
  meetingId: 'meeting-vahda-01',
  ahCounterStudentId: 'vahda-aflah',
  records: [
    { id: 'ah-r01', meetingId: 'meeting-vahda-01', ahCounterStudentId: 'vahda-aflah', speakerStudentId: 'vahda-zaid',     pauseCount: 2 },
    { id: 'ah-r02', meetingId: 'meeting-vahda-01', ahCounterStudentId: 'vahda-aflah', speakerStudentId: 'vahda-hashir',   pauseCount: 1 },
    { id: 'ah-r03', meetingId: 'meeting-vahda-01', ahCounterStudentId: 'vahda-aflah', speakerStudentId: 'vahda-nafih',    pauseCount: 0, notes: 'Excellent — no filler pauses' },
    { id: 'ah-r04', meetingId: 'meeting-vahda-01', ahCounterStudentId: 'vahda-aflah', speakerStudentId: 'vahda-jalal',    pauseCount: 4 },
    { id: 'ah-r05', meetingId: 'meeting-vahda-01', ahCounterStudentId: 'vahda-aflah', speakerStudentId: 'vahda-qubaib',   pauseCount: 3 },
    { id: 'ah-r06', meetingId: 'meeting-vahda-01', ahCounterStudentId: 'vahda-aflah', speakerStudentId: 'vahda-azeem',    pauseCount: 2 },
    { id: 'ah-r07', meetingId: 'meeting-vahda-01', ahCounterStudentId: 'vahda-aflah', speakerStudentId: 'vahda-sinan',    pauseCount: 1 },
    { id: 'ah-r08', meetingId: 'meeting-vahda-01', ahCounterStudentId: 'vahda-aflah', speakerStudentId: 'vahda-thufail',  pauseCount: 3 },
    { id: 'ah-r09', meetingId: 'meeting-vahda-01', ahCounterStudentId: 'vahda-aflah', speakerStudentId: 'vahda-shahid',   pauseCount: 2 },
    { id: 'ah-r10', meetingId: 'meeting-vahda-01', ahCounterStudentId: 'vahda-aflah', speakerStudentId: 'vahda-hilal',    pauseCount: 1 },
    { id: 'ah-r11', meetingId: 'meeting-vahda-01', ahCounterStudentId: 'vahda-aflah', speakerStudentId: 'vahda-muhammed', pauseCount: 2 },
  ],
  overallRemarks: 'Good session. Nafih had zero filler pauses — excellent. Jalal and Qubaib should work on reducing hesitations.',
  submittedAt: '2026-09-18T16:50:00',
};

// ---- Timer Report ----
export const vahdaMeeting1TimerReport: TimerReport = {
  id: 'timer-01',
  meetingId: 'meeting-vahda-01',
  timerStudentId: 'vahda-hafizst',
  meetingStartTime: '14:05',
  meetingEndTime: '16:28',
  entries: [
    { id: 'te-01', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: "QIRA'TH",      participantStudentId: 'vahda-adil',    allowedMinutes: 3, actualStartTime: '14:05', actualEndTime: '14:08', actualDurationMinutes: 3, timingResult: 'on_time' },
    { id: 'te-02', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'Dua',          participantStudentId: 'vahda-bilal',   allowedMinutes: 2, actualStartTime: '14:08', actualEndTime: '14:10', actualDurationMinutes: 2, timingResult: 'on_time' },
    { id: 'te-03', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'Welcome',      participantStudentId: 'vahda-beeran',  allowedMinutes: 3, actualStartTime: '14:10', actualEndTime: '14:14', actualDurationMinutes: 4, timingResult: 'over_time' },
    { id: 'te-04', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'Inauguration', participantStudentId: 'vahda-hafeez',  allowedMinutes: 5, actualStartTime: '14:14', actualEndTime: '14:18', actualDurationMinutes: 4, timingResult: 'under_time' },
    { id: 'te-05', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'LMOD',         participantStudentId: 'vahda-haeezp',  allowedMinutes: 5, actualStartTime: '14:18', actualEndTime: '14:23', actualDurationMinutes: 5, timingResult: 'on_time' },
    { id: 'te-06', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'Speech: Zaid',    participantStudentId: 'vahda-zaid',    allowedMinutes: 5, actualStartTime: '14:23', actualEndTime: '14:29', actualDurationMinutes: 6, timingResult: 'over_time' },
    { id: 'te-07', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'Speech: Hashir',  participantStudentId: 'vahda-hashir',  allowedMinutes: 5, actualStartTime: '14:30', actualEndTime: '14:35', actualDurationMinutes: 5, timingResult: 'on_time' },
    { id: 'te-08', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'Speech: Nafih',   participantStudentId: 'vahda-nafih',   allowedMinutes: 5, actualStartTime: '14:36', actualEndTime: '14:41', actualDurationMinutes: 5, timingResult: 'on_time' },
    { id: 'te-09', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'Speech: Jalal',   participantStudentId: 'vahda-jalal',   allowedMinutes: 5, actualStartTime: '14:42', actualEndTime: '14:44', actualDurationMinutes: 2, timingResult: 'under_time' },
    { id: 'te-10', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'TT: Qubaib',   participantStudentId: 'vahda-qubaib',  allowedMinutes: 2, actualStartTime: '15:00', actualEndTime: '15:02', actualDurationMinutes: 2, timingResult: 'on_time' },
    { id: 'te-11', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'TT: Azeem',    participantStudentId: 'vahda-azeem',   allowedMinutes: 2, actualStartTime: '15:03', actualEndTime: '15:05', actualDurationMinutes: 2, timingResult: 'on_time' },
    { id: 'te-12', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'TT: Sinan',    participantStudentId: 'vahda-sinan',   allowedMinutes: 2, actualStartTime: '15:06', actualEndTime: '15:08', actualDurationMinutes: 2, timingResult: 'on_time' },
    { id: 'te-13', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'TT: Thufail',  participantStudentId: 'vahda-thufail', allowedMinutes: 2, actualStartTime: '15:09', actualEndTime: '15:12', actualDurationMinutes: 3, timingResult: 'over_time' },
    { id: 'te-14', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'TT: Shahid',   participantStudentId: 'vahda-shahid',  allowedMinutes: 2, actualStartTime: '15:13', actualEndTime: '15:15', actualDurationMinutes: 2, timingResult: 'on_time' },
    { id: 'te-15', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'TT: Hilal',    participantStudentId: 'vahda-hilal',   allowedMinutes: 2, actualStartTime: '15:16', actualEndTime: '15:18', actualDurationMinutes: 2, timingResult: 'on_time' },
    { id: 'te-16', meetingId: 'meeting-vahda-01', timerStudentId: 'vahda-hafizst', activityLabel: 'Ice Breaking: Muhammed', participantStudentId: 'vahda-muhammed', allowedMinutes: 5, actualStartTime: '15:25', actualEndTime: '15:31', actualDurationMinutes: 6, timingResult: 'over_time' },
  ],
  submittedAt: '2026-09-18T17:00:00',
};

// ---- Awards ----
export const vahdaMeeting1Awards: Award[] = [
  { id: 'aw-01', meetingId: 'meeting-vahda-01', type: 'star_of_the_week',  studentId: 'vahda-hafizst' },
  { id: 'aw-02', meetingId: 'meeting-vahda-01', type: 'best_evaluator',    studentId: 'vahda-hisham' },
  { id: 'aw-03', meetingId: 'meeting-vahda-01', type: 'best_speaker',      studentId: 'vahda-nafih' },
  { id: 'aw-04', meetingId: 'meeting-vahda-01', type: 'best_tt_speaker',   studentId: 'vahda-sinan' },
];

// ---- Media ----
export const vahdaMeeting1Media: MeetingMedia[] = [
  { id: 'med-01', meetingId: 'meeting-vahda-01', url: '/placeholder-meeting-1.jpg', caption: 'VAHDA ILM Meeting #01 Opening', uploadedAt: '2026-09-18T17:30:00', isPlaceholder: true },
  { id: 'med-02', meetingId: 'meeting-vahda-01', url: '/placeholder-meeting-2.jpg', caption: 'Prepared Speech Session',         uploadedAt: '2026-09-18T17:31:00', isPlaceholder: true },
  { id: 'med-03', meetingId: 'meeting-vahda-01', url: '/placeholder-meeting-3.jpg', caption: 'Award Ceremony',                  uploadedAt: '2026-09-18T17:32:00', isPlaceholder: true },
];

// ---- Report Submission ----
export const vahdaMeeting1Report: ReportSubmission = {
  id: 'report-vahda-01',
  meetingId: 'meeting-vahda-01',
  overallStatus: 'collecting',
  sections: [
    { key: 'attendance',       label: 'Attendance',       required: true,  status: 'complete' },
    { key: 'timer',            label: 'Timer',            required: true,  status: 'complete' },
    { key: 'grammarian',       label: 'Grammarian',       required: true,  status: 'complete' },
    { key: 'ah_counter',       label: 'Ah Counter',       required: true,  status: 'complete' },
    { key: 'evaluator1',       label: 'Evaluator 1',      required: true,  status: 'complete' },
    { key: 'evaluator2',       label: 'Evaluator 2',      required: true,  status: 'complete' },
    { key: 'evaluator3',       label: 'Evaluator 3',      required: true,  status: 'missing' },
    { key: 'general_evaluator',label: 'General Evaluator',required: true,  status: 'complete' },
    { key: 'awards',           label: 'Awards',           required: true,  status: 'complete' },
    { key: 'gallery',          label: 'Gallery',          required: false, status: 'in_progress' },
  ],
};

// ---- All meetings list (Only true single class report: VAHDA Meeting #01) ----
export const allMeetings: ILMMeeting[] = [
  vahdaMeeting1,
];

