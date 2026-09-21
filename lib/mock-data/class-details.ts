export interface ClassDetailInfo {
  classYearId: string;
  className: string;
  level: number;
  category: string;
  focusDescription: string;
  attendanceRate: string;
  totalStageAppearances: number;
  reportsPending: number;
  insights: Array<{
    label: string;
    value: string;
    color: string;
  }>;
  rolesByStudentId: Record<string, string>;
  awards: Array<{
    id: string;
    title: string;
    category: string;
    recipientName: string;
    admissionNo: string;
    date: string;
    badgeEmoji: string;
  }>;
  academicSessions?: Array<{
    id: string;
    sessionNumber: number;
    title: string;
    date: string;
    faculty: string;
    status: 'completed' | 'scheduled' | 'in_progress';
  }>;
}

export const CLASS_DETAILS_DATA: Record<string, ClassDetailInfo> = {
  // 1. SA'DA (Level 1) — Bob the Minion
  'cy-sada-2627': {
    classYearId: 'cy-sada-2627',
    className: "SA'DA",
    level: 1,
    category: 'Foundation Speechcraft & Language Arts',
    focusDescription: 'First-year foundational speechcraft, overcoming stage anxiety, vocal projection, and introductory Quranic recitation etiquette.',
    attendanceRate: '96%',
    totalStageAppearances: 34,
    reportsPending: 0,
    insights: [
      { label: 'Freshman students who completed their inaugural Ice Breaking speech', value: '14', color: 'text-emerald-700' },
      { label: 'Students rehearsing their second prepared speech', value: '18', color: 'text-slate-700' },
      { label: 'Debut Table Topics participants this month', value: '22', color: 'text-indigo-700' },
      { label: 'Students with 100% orientation attendance', value: '29', color: 'text-amber-700' },
    ],
    rolesByStudentId: {
      'st-1136': 'Class President',
      'st-1137': 'Qirath Reciter',
      'st-1138': 'Grammarian',
      'st-1139': 'Meeting Timer',
      'st-1140': 'TT Master',
      'st-1141': 'Ah Counter',
      'st-1142': 'General Evaluator',
      'st-1143': 'Speechcraft Coordinator',
      'st-1144': 'Welcome Speaker',
      'st-1145': 'Thank You Speaker',
    },
    awards: [
      { id: 'aw-sada-1', title: 'Star Debut Speaker', category: 'Prepared Speech', recipientName: 'ABOOBAKKER SIDDIQ RAAFI', admissionNo: '1136', date: '15 Sep 2026', badgeEmoji: '🌟' },
      { id: 'aw-sada-2', title: 'Best Table Topics Debut', category: 'Impromptu', recipientName: 'SHAZIL ABBAS', admissionNo: '1138', date: '15 Sep 2026', badgeEmoji: '🎤' },
      { id: 'aw-sada-3', title: 'Perfect Attendance Award', category: 'Commitment', recipientName: 'ZIYAN MUHAMMED RK', admissionNo: '1139', date: '15 Sep 2026', badgeEmoji: '🏅' },
    ],
  },

  // 2. SIDRA (Level 2) — Stitch
  'cy-sidra-2627': {
    classYearId: 'cy-sidra-2627',
    className: 'SIDRA',
    level: 2,
    category: 'Intermediate Expression & Listening Skills',
    focusDescription: 'Developing structured impromptu delivery, active listening, grammatical refinement, and role evaluation techniques.',
    attendanceRate: '93%',
    totalStageAppearances: 39,
    reportsPending: 1,
    insights: [
      { label: 'Students who mastered Table Topics impromptu timing (< 2 mins)', value: '19', color: 'text-emerald-700' },
      { label: 'Students preparing Level 2 speech evaluations', value: '11', color: 'text-slate-700' },
      { label: 'Students serving in critical grammarian/ah-counter roles', value: '15', color: 'text-indigo-700' },
      { label: 'Active participants in weekly linguistic workshops', value: '25', color: 'text-amber-700' },
    ],
    rolesByStudentId: {
      'st-1065': 'Class President',
      'st-1066': 'LMOD Lead',
      'st-1067': 'General Evaluator',
      'st-1068': 'TT Master',
      'st-1069': 'Timer',
      'st-1070': 'Grammarian',
      'st-1072': 'Ah Counter',
      'st-1073': 'Speech Evaluator',
    },
    awards: [
      { id: 'aw-sidra-1', title: 'Best Evaluator Award', category: 'Evaluation', recipientName: 'MOHAMMED AFNAN', admissionNo: '1065', date: '16 Sep 2026', badgeEmoji: '🏆' },
      { id: 'aw-sidra-2', title: 'Table Topics Champion', category: 'Table Topics', recipientName: 'MUHAMMED RIYAN', admissionNo: '1067', date: '16 Sep 2026', badgeEmoji: '⚡' },
      { id: 'aw-sidra-3', title: 'Vocal Variety Star', category: 'Prepared Speech', recipientName: 'MOHAMMAD SINAN', admissionNo: '1069', date: '16 Sep 2026', badgeEmoji: '🎙️' },
    ],
  },

  // 3. SUFFA (Level 3) — Baymax
  'cy-suffa-2627': {
    classYearId: 'cy-suffa-2627',
    className: 'SUFFA',
    level: 3,
    category: 'Advanced Rhetoric & Stage Presence',
    focusDescription: 'Mastery of vocal modulation, persuasive body language, rhetorical devices, and cross-evaluation feedback loops.',
    attendanceRate: '95%',
    totalStageAppearances: 45,
    reportsPending: 0,
    insights: [
      { label: 'Students who completed persuasive rhetorical speeches', value: '16', color: 'text-emerald-700' },
      { label: 'Students qualified as certified peer evaluators', value: '13', color: 'text-slate-700' },
      { label: 'Table Topics speakers with zero ah-words recorded', value: '12', color: 'text-indigo-700' },
      { label: 'Students consistently attending parliamentary drills', value: '28', color: 'text-amber-700' },
    ],
    rolesByStudentId: {
      'st-1035': 'Class President',
      'st-1036': 'LMOD Officer',
      'st-1037': 'General Evaluator',
      'st-1038': 'Prepared Speaker Lead',
      'st-1039': 'TT Master',
      'st-1041': 'Parliamentarian',
      'st-1042': 'Chief Grammarian',
    },
    awards: [
      { id: 'aw-suffa-1', title: 'Outstanding Prepared Speaker', category: 'Prepared Speech', recipientName: 'MUHAMMED SHAHAN', admissionNo: '1035', date: '17 Sep 2026', badgeEmoji: '👑' },
      { id: 'aw-suffa-2', title: 'Master Evaluator Citation', category: 'Evaluation', recipientName: 'MUHAMMED SHAMIL', admissionNo: '1037', date: '17 Sep 2026', badgeEmoji: '🔍' },
      { id: 'aw-suffa-3', title: 'Eloquent Orator Honor', category: 'Speechcraft', recipientName: 'MUHAMMED ANAS', admissionNo: '1039', date: '17 Sep 2026', badgeEmoji: '🌟' },
    ],
  },

  // 4. VAHDA (Level 4) — Pikachu
  'cy-vahda-2627': {
    classYearId: 'cy-vahda-2627',
    className: 'VAHDA',
    level: 4,
    category: 'Flagship Leadership & Speechcraft Cohort',
    focusDescription: 'The core flagship ILM leadership cohort, mastering parliamentary protocol, advanced storytelling, and competitive debate.',
    attendanceRate: '94%',
    totalStageAppearances: 47,
    reportsPending: 1,
    insights: [
      { label: 'Students who delivered prepared speech this cycle', value: '4', color: 'text-emerald-700' },
      { label: 'Students scheduled for upcoming speech rounds', value: '28', color: 'text-slate-700' },
      { label: 'Students who competed in Table Topics showdown', value: '16', color: 'text-indigo-700' },
      { label: 'Students serving executive meeting officer roles', value: '10', color: 'text-amber-700' },
    ],
    rolesByStudentId: {
      'vahda-adil': 'QIRATH',
      'vahda-bilal': 'Dua',
      'vahda-beeran': 'Welcome Speech',
      'vahda-hafeez': 'Grammarian',
      'vahda-haeezp': 'LMOD Lead',
      'vahda-muhaviz': 'TT Master',
      'vahda-aflah': 'Ah Counter',
      'vahda-munzir': 'Thank You Speech',
      'vahda-hafizst': 'Timer & Best Speaker',
      'vahda-hisham': 'General Evaluator',
      'vahda-nafih': 'Prepared Speaker',
      'vahda-sinan': 'Best TT Speaker',
      'vahda-zaid': 'Prepared Speaker',
      'vahda-hashir': 'Prepared Speaker',
      'vahda-jalal': 'Prepared Speaker',
      'vahda-muhammed': 'Ice Breaking',
    },
    awards: [
      { id: 'aw-vahda-1', title: 'Best Prepared Speaker', category: 'Prepared Speech', recipientName: 'HAFIZ S T', admissionNo: '1074', date: '18 Sep 2026', badgeEmoji: '🏆' },
      { id: 'aw-vahda-2', title: 'Best Table Topics Speaker', category: 'Table Topics', recipientName: 'SINAN K H', admissionNo: '1084', date: '18 Sep 2026', badgeEmoji: '⚡' },
      { id: 'aw-vahda-3', title: 'Best Evaluator', category: 'Evaluation', recipientName: 'HISHAM', admissionNo: '1077', date: '18 Sep 2026', badgeEmoji: '🎯' },
      { id: 'aw-vahda-4', title: 'Best LMOD', category: 'Leadership', recipientName: 'HAFEEZ P', admissionNo: '1068', date: '18 Sep 2026', badgeEmoji: '⭐' },
    ],
  },

  // 5. HUDA (Level 5) — Jerry
  'cy-class5-2627': {
    classYearId: 'cy-class5-2627',
    className: 'HUDA',
    level: 5,
    category: 'Secondary Islamic Jurisprudence & Classical Grammar',
    focusDescription: 'Deep immersion into classical Arabic syntax (Nahw), morphological inflection (Sarf), and Islamic jurisprudence essentials.',
    attendanceRate: '92%',
    totalStageAppearances: 28,
    reportsPending: 0,
    insights: [
      { label: 'Students who completed Arabic grammatical analysis seminars', value: '22', color: 'text-emerald-700' },
      { label: 'Weekly textual reading assignments submitted on time', value: '26', color: 'text-slate-700' },
      { label: 'Students in Islamic jurisprudence symposium circles', value: '18', color: 'text-indigo-700' },
      { label: 'Scholastic memorization benchmarks passed', value: '24', color: 'text-amber-700' },
    ],
    rolesByStudentId: {
      'st-899': 'Class Prefect',
      'st-923': 'Academic Monitor',
      'st-938': 'Library In-Charge',
      'st-945': 'Seminar Lead',
      'st-946': 'Arabic Translation Lead',
      'st-972': 'Textual Reviewer',
      'st-974': 'Discussion Moderator',
    },
    awards: [
      { id: 'aw-huda-1', title: 'Grammar Master Citation', category: 'Academic', recipientName: 'HASAN THAMMEEM', admissionNo: '899', date: '14 Sep 2026', badgeEmoji: '📜' },
      { id: 'aw-huda-2', title: 'Top Academic Ranking', category: 'Scholarship', recipientName: 'MUHAMMAD SABITH V K P', admissionNo: '923', date: '14 Sep 2026', badgeEmoji: '🥇' },
      { id: 'aw-huda-3', title: 'Exemplary Conduct Honor', category: 'Discipline', recipientName: 'MUHAMMED SAEED THUFAIL', admissionNo: '938', date: '14 Sep 2026', badgeEmoji: '✨' },
    ],
    academicSessions: [
      { id: 'hud-s1', sessionNumber: 1, title: 'Ajrumiyyah Syntax & Sentence Parsing Workshop', date: '2026-09-08', faculty: 'Ustadh Rashid Al-Baqawi', status: 'completed' },
      { id: 'hud-s2', sessionNumber: 2, title: 'Foundations of Fiqh al-Ibadat Colloquium', date: '2026-09-14', faculty: 'Ustadh Abdullah', status: 'completed' },
      { id: 'hud-s3', sessionNumber: 3, title: 'Classical Arabic Vocabulary in Surah Maryam', date: '2026-09-22', faculty: 'Ustadh Noorudheen', status: 'scheduled' },
    ],
  },

  // 6. ALFA (Level 6) — Po
  'cy-alfa-2627': {
    classYearId: 'cy-alfa-2627',
    className: 'ALFA',
    level: 6,
    category: 'Senior Master Evaluator & High-School Speechcraft',
    focusDescription: 'Senior speechcraft division: high-stakes debate moderation, critical thinking, evaluative philosophy, and inter-batch mentorship.',
    attendanceRate: '97%',
    totalStageAppearances: 52,
    reportsPending: 0,
    insights: [
      { label: 'Senior students qualified to evaluate junior ILM meetings', value: '26', color: 'text-emerald-700' },
      { label: 'Speeches evaluated with formal rubrics this term', value: '18', color: 'text-slate-700' },
      { label: 'Inter-batch debate moderators trained', value: '14', color: 'text-indigo-700' },
      { label: 'Students with uninterrupted perfect term attendance', value: '29', color: 'text-amber-700' },
    ],
    rolesByStudentId: {
      'st-724': 'Senior ILM Leader',
      'st-725': 'Chief Evaluator',
      'st-726': 'Debate Moderator',
      'st-728': 'Parliamentarian Lead',
      'st-729': 'Senior Grammarian',
      'st-730': 'TT Master Specialist',
    },
    awards: [
      { id: 'aw-alfa-1', title: 'Distinguished Master Evaluator', category: 'Evaluation', recipientName: 'MUHAMMED SABITH', admissionNo: '724', date: '17 Sep 2026', badgeEmoji: '🎖️' },
      { id: 'aw-alfa-2', title: 'Grand Orator Prize', category: 'Speechcraft', recipientName: 'MUHAMMED SINAN', admissionNo: '725', date: '17 Sep 2026', badgeEmoji: '🏆' },
      { id: 'aw-alfa-3', title: 'Senior Leadership Distinction', category: 'Leadership', recipientName: 'MUHAMMED SUHAIL', admissionNo: '726', date: '17 Sep 2026', badgeEmoji: '🌟' },
    ],
  },

  // 7. SAFWA (Level 7) — Puss in Boots
  'cy-class7-2627': {
    classYearId: 'cy-class7-2627',
    className: 'SAFWA',
    level: 7,
    category: 'Higher Secondary Arabic Rhetoric & Historiography',
    focusDescription: 'Advanced rhetorical figures (Badi, Ma’ani, Bayan), Islamic historical analysis, and classical manuscript reading.',
    attendanceRate: '93%',
    totalStageAppearances: 32,
    reportsPending: 0,
    insights: [
      { label: 'Colloquium research presentations presented', value: '20', color: 'text-emerald-700' },
      { label: 'Classical rhetoric essays evaluated by academic board', value: '20', color: 'text-slate-700' },
      { label: 'Active participants in Arabic literary critique circle', value: '17', color: 'text-indigo-700' },
      { label: 'Students completing independent source citations', value: '19', color: 'text-amber-700' },
    ],
    rolesByStudentId: {
      'st-829': 'Class President',
      'st-830': 'Rhetoric Monitor',
      'st-831': 'Historiography Lead',
      'st-832': 'Research Coordinator',
      'st-833': 'Colloquium Secretary',
    },
    awards: [
      { id: 'aw-safwa-1', title: 'Balagha Rhetoric Excellence', category: 'Literature', recipientName: 'MUHAMMED ANAS K', admissionNo: '829', date: '12 Sep 2026', badgeEmoji: '📜' },
      { id: 'aw-safwa-2', title: 'Best Historiography Essay', category: 'Research', recipientName: 'MUHAMMED DILSHAD', admissionNo: '830', date: '12 Sep 2026', badgeEmoji: '✒️' },
      { id: 'aw-safwa-3', title: "Dean's Commendation", category: 'Academics', recipientName: 'MUHAMMED FARHAN', admissionNo: '831', date: '12 Sep 2026', badgeEmoji: '🏅' },
    ],
    academicSessions: [
      { id: 'saf-s1', sessionNumber: 1, title: 'Introduction to Ilm al-Bayan: Metaphor & Simile', date: '2026-09-05', faculty: 'Ustadh Faisal Al-Azhari', status: 'completed' },
      { id: 'saf-s2', sessionNumber: 2, title: 'Historiographical Analysis of Early Caliphates', date: '2026-09-12', faculty: 'Dr. Abdul Qadir', status: 'completed' },
      { id: 'saf-s3', sessionNumber: 3, title: 'Arabic Prose in the Abbasid Golden Age', date: '2026-09-24', faculty: 'Ustadh Faisal Al-Azhari', status: 'scheduled' },
    ],
  },

  // 8. THUFA (Level 8) — Garfield
  'cy-degree1-2627': {
    classYearId: 'cy-degree1-2627',
    className: 'THUFA',
    level: 8,
    category: 'Undergraduate Degree Year 1 — Classical Logic & Jurisprudence',
    focusDescription: 'First-year university curriculum: Formal Aristotelian-Islamic logic (Mantiq), Usul al-Fiqh, and comparative legal methodology.',
    attendanceRate: '95%',
    totalStageAppearances: 42,
    reportsPending: 0,
    insights: [
      { label: 'Formal logic syllogism papers submitted', value: '22', color: 'text-emerald-700' },
      { label: 'Undergraduate jurisprudence colloquia attended', value: '22', color: 'text-slate-700' },
      { label: 'Students actively drafting first-year thesis outlines', value: '18', color: 'text-indigo-700' },
      { label: 'Inter-collegiate seminar speakers accredited', value: '11', color: 'text-amber-700' },
    ],
    rolesByStudentId: {
      'st-802': 'Degree Class Representative',
      'st-803': 'Academic Coordinator',
      'st-805': 'Logic & Debate Chair',
      'st-806': 'Usul Seminar Convener',
      'st-807': 'Undergraduate Secretary',
    },
    awards: [
      { id: 'aw-thufa-1', title: 'First-Year Honors Medal', category: 'Scholarship', recipientName: 'MUHAMMED SABITH C', admissionNo: '802', date: '10 Sep 2026', badgeEmoji: '🥇' },
      { id: 'aw-thufa-2', title: 'Logic & Debate Excellence', category: 'Dialectic', recipientName: 'MUHAMMED SHAHIN', admissionNo: '803', date: '10 Sep 2026', badgeEmoji: '🧠' },
      { id: 'aw-thufa-3', title: 'Top Seminar Speaker', category: 'Symposium', recipientName: 'MUHAMMED SHAMIL P', admissionNo: '805', date: '10 Sep 2026', badgeEmoji: '🎙️' },
    ],
    academicSessions: [
      { id: 'thu-s1', sessionNumber: 1, title: 'Aristotelian Syllogism & As-Sullam al-Munawraq', date: '2026-09-03', faculty: 'Prof. Zakariyya Nadwi', status: 'completed' },
      { id: 'thu-s2', sessionNumber: 2, title: 'Linguistic Significations in Usul al-Fiqh', date: '2026-09-10', faculty: 'Ustadh Ilyas K', status: 'completed' },
      { id: 'thu-s3', sessionNumber: 3, title: 'Hermeneutics and Legal Deduction Seminar', date: '2026-09-25', faculty: 'Prof. Zakariyya Nadwi', status: 'scheduled' },
    ],
  },

  // 9. NAJWA (Level 9) — Toothless
  'cy-degree2-2627': {
    classYearId: 'cy-degree2-2627',
    className: 'NAJWA',
    level: 9,
    category: 'Undergraduate Degree Year 2 — Hadith Sciences & Islamic Philosophy',
    focusDescription: 'Advanced degree curriculum: Critical Hadith textual analysis (Mustalah al-Hadith), Islamic epistemology, and field research methodology.',
    attendanceRate: '94%',
    totalStageAppearances: 48,
    reportsPending: 0,
    insights: [
      { label: 'Hadith chain & narrator research projects defended', value: '30', color: 'text-emerald-700' },
      { label: 'Students engaged in academic community fieldwork', value: '28', color: 'text-slate-700' },
      { label: 'Peer-reviewed seminar presentations delivered', value: '26', color: 'text-indigo-700' },
      { label: 'Departmental library research fellows active', value: '14', color: 'text-amber-700' },
    ],
    rolesByStudentId: {
      'st-722': 'Degree Year 2 Chairman',
      'st-723': 'Editorial Head',
      'st-738': 'Hadith Seminar Secretary',
      'st-739': 'Philosophy Colloquium Lead',
      'st-740': 'Research Symposium Convener',
    },
    awards: [
      { id: 'aw-najwa-1', title: 'Senior Academic Scholar', category: 'Scholarship', recipientName: 'MUHAMMED RABEEH K', admissionNo: '722', date: '11 Sep 2026', badgeEmoji: '🏅' },
      { id: 'aw-najwa-2', title: 'Best Paper Presentation', category: 'Research', recipientName: 'MUHAMMED RAHEES', admissionNo: '723', date: '11 Sep 2026', badgeEmoji: '📜' },
      { id: 'aw-najwa-3', title: 'Community Impact Citation', category: 'Leadership', recipientName: 'MUHAMMED SALIH', admissionNo: '738', date: '11 Sep 2026', badgeEmoji: '🌟' },
    ],
    academicSessions: [
      { id: 'naj-s1', sessionNumber: 1, title: 'Critical Evaluation of Sahih al-Bukhari Chains', date: '2026-09-04', faculty: 'Dr. Hashim Al-Hassani', status: 'completed' },
      { id: 'naj-s2', sessionNumber: 2, title: 'Epistemology of Kalam and Falsafa', date: '2026-09-11', faculty: 'Dr. Tariq Jamil', status: 'completed' },
      { id: 'naj-s3', sessionNumber: 3, title: 'Research Methodologies in Social Hermeneutics', date: '2026-09-26', faculty: 'Dr. Hashim Al-Hassani', status: 'scheduled' },
    ],
  },

  // 10. WIDAD (Level 10) — WALL-E
  'cy-degree3-2627': {
    classYearId: 'cy-degree3-2627',
    className: 'WIDAD',
    level: 10,
    category: 'Graduating Senior Degree Final Year — Capstone & Leadership',
    focusDescription: 'The culminating graduation batch: Senior Capstone defense, community leadership practicum, and valedictory honors.',
    attendanceRate: '98%',
    totalStageAppearances: 58,
    reportsPending: 0,
    insights: [
      { label: 'Graduating seniors with capstone theses approved for defense', value: '26', color: 'text-emerald-700' },
      { label: 'Graduation readiness and academic credits completion', value: '100%', color: 'text-indigo-700' },
      { label: 'Community leadership practicum hours completed', value: '520 hrs', color: 'text-slate-700' },
      { label: 'Senior scholars receiving departmental honors eligibility', value: '18', color: 'text-amber-700' },
    ],
    rolesByStudentId: {
      'st-1057': 'Senior Valedictorian & Class Head',
      'st-1058': 'Senior Class Representative',
      'st-1059': 'Capstone Defense Lead',
      'st-1060': 'Graduation Council President',
      'st-1061': 'Academic Editorial Director',
      'st-1062': 'Alumni Liaison Coordinator',
      'st-1064': 'Community Outreach Director',
      'st-755': 'Senior Symposium Chair',
      'st-757': 'Treasurer & Ethics Secretary',
      'st-762': 'Senior Scholar Representative',
    },
    awards: [
      { id: 'aw-widad-1', title: 'Senior Leadership Medal', category: 'Valedictory', recipientName: 'MUHAMMED SABITH KM', admissionNo: '1057', date: '19 Sep 2026', badgeEmoji: '🎖️' },
      { id: 'aw-widad-2', title: 'Capstone Excellence Honor', category: 'Research', recipientName: 'Sufyan mk', admissionNo: '1058', date: '19 Sep 2026', badgeEmoji: '🏆' },
      { id: 'aw-widad-3', title: 'Academic Distinction Award', category: 'Academics', recipientName: 'Abdunnafih', admissionNo: '1059', date: '19 Sep 2026', badgeEmoji: '🥇' },
      { id: 'aw-widad-4', title: 'Community Service Citation', category: 'Outreach', recipientName: 'MUHAMMED SWALIH TA', admissionNo: '1060', date: '19 Sep 2026', badgeEmoji: '💎' },
    ],
    academicSessions: [
      { id: 'wid-s1', sessionNumber: 1, title: 'Senior Capstone Colloquium & Thesis Defense Phase I', date: '2026-09-02', faculty: 'Dean Dr. Abdul Majeed', status: 'completed' },
      { id: 'wid-s2', sessionNumber: 2, title: 'Strategic Leadership & Community Institution Management', date: '2026-09-13', faculty: 'Ustadh Abdullah', status: 'completed' },
      { id: 'wid-s3', sessionNumber: 3, title: 'Final Graduation Convocation & Valedictory Addresses', date: '2026-10-05', faculty: 'Academy Chancellor & Faculty Council', status: 'scheduled' },
    ],
  },
};

export function getClassDetailInfo(classYearIdOrName: string): ClassDetailInfo | null {
  if (!classYearIdOrName) return null;
  // match by classYearId
  if (CLASS_DETAILS_DATA[classYearIdOrName]) {
    return CLASS_DETAILS_DATA[classYearIdOrName];
  }
  // match by className
  const clean = classYearIdOrName.toUpperCase().trim().replace(/^CLASS\s+/i, '');
  const found = Object.values(CLASS_DETAILS_DATA).find(c => c.className.toUpperCase() === clean);
  if (found) return found;

  // match by substring
  const bySub = Object.values(CLASS_DETAILS_DATA).find(c => c.className.toUpperCase().includes(clean) || clean.includes(c.className.toUpperCase()));
  return bySub || null;
}
