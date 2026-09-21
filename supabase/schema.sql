-- ============================================================
-- Malik Deenar Islamic Academy (MDIA) ILM Portal Database Schema
-- Dedicated Supabase Project Migration: mdia-ilm
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Academic Years Table
CREATE TABLE IF NOT EXISTS public.academic_years (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Class Years (Cohorts) Table
CREATE TABLE IF NOT EXISTS public.class_years (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  ilm_enabled BOOLEAN DEFAULT true,
  academic_year_id TEXT REFERENCES public.academic_years(id) ON DELETE CASCADE,
  level INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Students Table
CREATE TABLE IF NOT EXISTS public.students (
  id TEXT PRIMARY KEY,
  admission_no TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  class_year_id TEXT REFERENCES public.class_years(id) ON DELETE SET NULL,
  class_num INTEGER NOT NULL,
  class_name TEXT NOT NULL,
  father_name TEXT,
  is_ilm BOOLEAN DEFAULT true,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Meetings Table
CREATE TABLE IF NOT EXISTS public.meetings (
  id TEXT PRIMARY KEY,
  class_year_id TEXT REFERENCES public.class_years(id) ON DELETE CASCADE,
  academic_year_id TEXT REFERENCES public.academic_years(id) ON DELETE CASCADE,
  meeting_number INTEGER NOT NULL,
  date DATE NOT NULL,
  theme_english TEXT NOT NULL,
  theme_malayalam TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming',
  start_time TEXT,
  end_time TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Role Assignments Table
CREATE TABLE IF NOT EXISTS public.role_assignments (
  id TEXT PRIMARY KEY,
  meeting_id TEXT REFERENCES public.meetings(id) ON DELETE CASCADE,
  student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
  role_id TEXT NOT NULL,
  slot INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Evaluations Table
CREATE TABLE IF NOT EXISTS public.evaluations (
  id TEXT PRIMARY KEY,
  meeting_id TEXT REFERENCES public.meetings(id) ON DELETE CASCADE,
  evaluator_student_id TEXT,
  subject_student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
  speech_type TEXT,
  marks INTEGER,
  remarks TEXT,
  strength_tag_ids TEXT[],
  improvement_tag_ids TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Awards Table
CREATE TABLE IF NOT EXISTS public.awards (
  id TEXT PRIMARY KEY,
  meeting_id TEXT REFERENCES public.meetings(id) ON DELETE CASCADE,
  student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Report Sections Table
CREATE TABLE IF NOT EXISTS public.report_sections (
  id TEXT PRIMARY KEY,
  meeting_id TEXT REFERENCES public.meetings(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'empty',
  nil_reason TEXT,
  completed_at TIMESTAMPTZ,
  completed_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================
ALTER TABLE public.academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_sections ENABLE ROW LEVEL SECURITY;

-- Allow Public/Student Read Access
DROP POLICY IF EXISTS "Public Read Academic Years" ON public.academic_years;
CREATE POLICY "Public Read Academic Years" ON public.academic_years FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Class Years" ON public.class_years;
CREATE POLICY "Public Read Class Years" ON public.class_years FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Students" ON public.students;
CREATE POLICY "Public Read Students" ON public.students FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Meetings" ON public.meetings;
CREATE POLICY "Public Read Meetings" ON public.meetings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Role Assignments" ON public.role_assignments;
CREATE POLICY "Public Read Role Assignments" ON public.role_assignments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Evaluations" ON public.evaluations;
CREATE POLICY "Public Read Evaluations" ON public.evaluations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Awards" ON public.awards;
CREATE POLICY "Public Read Awards" ON public.awards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Report Sections" ON public.report_sections;
CREATE POLICY "Public Read Report Sections" ON public.report_sections FOR SELECT USING (true);

-- Allow Authenticated / Admin Write Access
DROP POLICY IF EXISTS "Admin Full Access Academic Years" ON public.academic_years;
CREATE POLICY "Admin Full Access Academic Years" ON public.academic_years FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Class Years" ON public.class_years;
CREATE POLICY "Admin Full Access Class Years" ON public.class_years FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Students" ON public.students;
CREATE POLICY "Admin Full Access Students" ON public.students FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Meetings" ON public.meetings;
CREATE POLICY "Admin Full Access Meetings" ON public.meetings FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Role Assignments" ON public.role_assignments;
CREATE POLICY "Admin Full Access Role Assignments" ON public.role_assignments FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Evaluations" ON public.evaluations;
CREATE POLICY "Admin Full Access Evaluations" ON public.evaluations FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Awards" ON public.awards;
CREATE POLICY "Admin Full Access Awards" ON public.awards FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Report Sections" ON public.report_sections;
CREATE POLICY "Admin Full Access Report Sections" ON public.report_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- Storage Buckets Setup
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('student-photos', 'student-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public)
VALUES ('handwritten-reports', 'handwritten-reports', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS Policies
DROP POLICY IF EXISTS "Public Access Student Photos" ON storage.objects;
CREATE POLICY "Public Access Student Photos" ON storage.objects FOR SELECT USING (bucket_id = 'student-photos' OR bucket_id = 'handwritten-reports');

DROP POLICY IF EXISTS "Admin Upload Storage" ON storage.objects;
CREATE POLICY "Admin Upload Storage" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'student-photos' OR bucket_id = 'handwritten-reports');

DROP POLICY IF EXISTS "Anon Upload Scanned Reports" ON storage.objects;
CREATE POLICY "Anon Upload Scanned Reports" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'handwritten-reports');

-- ============================================================
-- Seed Data: Academic Years & Class Cohorts
-- ============================================================
INSERT INTO public.academic_years (id, name, is_current) VALUES
('ay-2026-27', 'Academic Year 2026–27', true),
('ay-2025-26', 'Academic Year 2025–26', false),
('ay-2024-25', 'Academic Year 2024–25', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.class_years (id, display_name, ilm_enabled, academic_year_id, level) VALUES
('cy-sada-2627', 'SA''DA', true, 'ay-2026-27', 1),
('cy-sidra-2627', 'SIDRA', true, 'ay-2026-27', 2),
('cy-suffa-2627', 'SUFFA', true, 'ay-2026-27', 3),
('cy-vahda-2627', 'VAHDA', true, 'ay-2026-27', 4),
('cy-class5-2627', 'HUDA', false, 'ay-2026-27', 5),
('cy-alfa-2627', 'ALFA', true, 'ay-2026-27', 6),
('cy-class7-2627', 'SAFWA', false, 'ay-2026-27', 7),
('cy-degree1-2627', 'THUFA', false, 'ay-2026-27', 8),
('cy-degree2-2627', 'NAJWA', false, 'ay-2026-27', 9),
('cy-degree3-2627', 'WIDAD', false, 'ay-2026-27', 10)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Seed Data: Students (278 Enrolled Students across all 10 Classes)
-- ============================================================
INSERT INTO public.students (id, admission_no, name, class_year_id, class_num, class_name, father_name, is_ilm, avatar_url) VALUES
('st-1136', '1136', 'ABOOBAKKER SIDDIQ RAAFI', 'cy-sada-2627', 1, 'SA''DA', '', true, '/students/1136.jpg'),
('st-1137', '1137', 'ZEESHAN ABDUL RAHMAN N K', 'cy-sada-2627', 1, 'SA''DA', '', true, '/students/1137.jpg'),
('st-1138', '1138', 'SHAZIL ABBAS', 'cy-sada-2627', 1, 'SA''DA', 'ABDUL AZEEZ', true, '/students/1138.jpg'),
('st-1139', '1139', 'ZIYAN MUHAMMED RK', 'cy-sada-2627', 1, 'SA''DA', 'RAZAK K M', true, '/students/1139.jpg'),
('st-1140', '1140', 'Mohammed Udaif K A', 'cy-sada-2627', 1, 'SA''DA', 'Abdul Rahman KA', true, '/students/1140.jpg'),
('st-1141', '1141', 'Muhammed mujthaba Anchillath', 'cy-sada-2627', 1, 'SA''DA', 'Ashraf Anchillath', true, '/students/1141.jpg'),
('st-1142', '1142', 'ABDULLA AAZIM K', 'cy-sada-2627', 1, 'SA''DA', 'IBRAHIM KHALEEL', true, '/students/1142.jpg'),
('st-1143', '1143', 'Mohammad Faizan', 'cy-sada-2627', 1, 'SA''DA', 'Shanavaz Mahamood', true, '/students/1143.jpg'),
('st-1144', '1144', 'Muhammed Rizwan KH', 'cy-sada-2627', 1, 'SA''DA', 'Muhammed Haneefa KA', true, '/students/1144.jpg'),
('st-1145', '1145', 'ABDUL KADER NABHAN S T', 'cy-sada-2627', 1, 'SA''DA', 'ABDUL SHUKOOR T', true, '/students/1145.jpg'),
('st-1146', '1146', 'AHMED RILWAN', 'cy-sada-2627', 1, 'SA''DA', 'ABDUL NASIR TM', true, '/students/1146.jpg'),
('st-1147', '1147', 'Farih A L', 'cy-sada-2627', 1, 'SA''DA', 'Abdul Latheef', true, '/students/1147.jpg'),
('st-1148', '1148', 'MUHAMMED SHAHEEM AARIF', 'cy-sada-2627', 1, 'SA''DA', 'AARIF KAIPATTIL UDINUR', true, '/students/1148.jpg'),
('st-1149', '1149', 'MOHAMMAD RAZEEN', 'cy-sada-2627', 1, 'SA''DA', 'AHAMMAD RASID', true, '/students/1149.jpg'),
('st-1150', '1150', 'MOHAMMED MEHRAZ TM', 'cy-sada-2627', 1, 'SA''DA', 'MANSOOR TA', true, '/students/1150.jpg'),
('st-1151', '1151', 'MUHAMMED SUFIYAN A', 'cy-sada-2627', 1, 'SA''DA', 'ABDUL LATHIF', true, '/students/1151.jpg'),
('st-1152', '1152', 'HISHAM C H', 'cy-sada-2627', 1, 'SA''DA', 'ABDUL HARIS C H', true, '/students/1152.jpg'),
('st-1153', '1153', 'MUHAMMED ALFAZ N A', 'cy-sada-2627', 1, 'SA''DA', 'ABDUL NAVAS K H', true, '/students/1153.jpg'),
('st-1154', '1154', 'MOHAMMED RAFIH', 'cy-sada-2627', 1, 'SA''DA', 'SALIM', true, '/students/1154.jpg'),
('st-1155', '1155', 'ABOOBAKKAR AZAD', 'cy-sada-2627', 1, 'SA''DA', 'Ashraf CH', true, '/students/1155.jpg'),
('st-1156', '1156', 'Muhammad Thayyib AK', 'cy-sada-2627', 1, 'SA''DA', 'Akbar siddique AK', true, '/students/1156.jpg'),
('st-1157', '1157', 'SHAZIM ABDUL RAHMAN', 'cy-sada-2627', 1, 'SA''DA', 'MOHAMMED HANEEFA T A', true, '/students/1157.jpg'),
('st-1158', '1158', 'ABDUL KHADER RINAS AK', 'cy-sada-2627', 1, 'SA''DA', 'ASHRAF AK', true, '/students/1158.jpg'),
('st-1159', '1159', 'ZAHRAN AK', 'cy-sada-2627', 1, 'SA''DA', 'MUNEER AK', true, '/students/1159.jpg'),
('st-1160', '1160', 'ABDULLAH MUHAMMED ALI', 'cy-sada-2627', 1, 'SA''DA', 'MOHAMMED ASHARAF MOGRAL', true, '/students/1160.jpg'),
('st-1161', '1161', 'MUHAMMED AMEEN', 'cy-sada-2627', 1, 'SA''DA', 'NOUFAL K S', true, '/students/1161.jpg'),
('st-1162', '1162', 'Muhammad Abdusamad', 'cy-sada-2627', 1, 'SA''DA', 'Abdu samad', true, '/students/1162.jpg'),
('st-1163', '1163', 'ABDULLAH BASITH', 'cy-sada-2627', 1, 'SA''DA', 'MUHAMMAD A', true, '/students/1163.jpg'),
('st-1164', '1164', 'MUHAMMED RIZWI', 'cy-sada-2627', 1, 'SA''DA', 'MUHAMMED IRSHAD', true, '/students/1164.jpg'),
('st-1165', '1165', 'IHSAN MUHAMMAD', 'cy-sada-2627', 1, 'SA''DA', 'MUHAMMAD ANVAR', true, '/students/1165.jpg'),
('st-1166', '1166', 'MUHAMMAD ZAID FA', 'cy-sada-2627', 1, 'SA''DA', 'FAIZAL A', true, '/students/1166.jpg'),
('st-1167', '1167', 'RABEEATH AHMAD', 'cy-sada-2627', 1, 'SA''DA', 'KALID PA', true, '/students/1167.jpg'),
('st-1046', '1046', 'MUHAMMED BIN JAFAR', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1046.jpg'),
('st-1049', '1049', 'MUHAMMED SHIRAZ ISHAQUE', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1049.jpg'),
('st-1065', '1065', 'NABEEH AHMAD C K', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1065.jpg'),
('st-1069', '1069', 'MIFZAL ABDULLA K M', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1069.jpg'),
('st-1093', '1093', 'ABOOBACKER FALAH M.I', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1093.jpg'),
('st-1101', '1101', 'MOHAMMED ANSAF KA', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1101.jpg'),
('st-1102', '1102', 'MUBASHIR M', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1102.jpg'),
('st-1103', '1103', 'MOHAMMED', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1103.jpg'),
('st-1105', '1105', 'MUHAMMED MEHRAN', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1105.jpg'),
('st-1107', '1107', 'MUHAMMED MARSAD B L', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1107.jpg'),
('st-1108', '1108', 'NASHVAN ABDUL KADER B', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1108.jpg'),
('st-1109', '1109', 'MUHAMMED ZEYAN', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1109.jpg'),
('st-1110', '1110', 'SAYYID MUHAMMED MUHSIN N', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1110.jpg'),
('st-1112', '1112', 'MUHAMMED ASWIM NH', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1112.jpg'),
('st-1113', '1113', 'MOHAMMED NAZEEF', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1113.jpg'),
('st-1114', '1114', 'MUHAMMED AMEEN PA', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1114.jpg'),
('st-1115', '1115', 'MOHAMMED SHAHIR K A', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1115.jpg'),
('st-1116', '1116', 'MOHAMMED FAZIL B H', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1116.jpg'),
('st-1117', '1117', 'MUHAMMED RISHAK M V', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1117.jpg'),
('st-1118', '1118', 'MUHAMMED AZEEM M', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1118.jpg'),
('st-1119', '1119', 'MUHAMMED FAIZAN BK', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1119.jpg'),
('st-1120', '1120', 'HAYAAN ABDULLA A.M', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1120.jpg'),
('st-1122', '1122', 'ABDUL RAHMAN ADNAN T A', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1122.jpg'),
('st-1123', '1123', 'MUHAMMED SHIFAN', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1123.jpg'),
('st-1124', '1124', 'ABDUL KADAR BILAL P.A', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1124.jpg'),
('st-1125', '1125', 'MUHAMMAD RAIHAN', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1125.jpg'),
('st-1126', '1126', 'MUHAMMED RIHAN', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1126.jpg'),
('st-1127', '1127', 'M THOUFIQ HUSSAIN', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1127.jpg'),
('st-1128', '1128', 'SHAMIL AHMED BK', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1128.jpg'),
('st-1131', '1131', 'IBRAHIM KALEEL P H', 'cy-sidra-2627', 2, 'SIDRA', '', true, '/students/1131.jpg'),
('st-1021', '1021', 'Abdul Khader Uvais K A', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1021.jpg'),
('st-1053', '1053', 'MUHAMMED UVAIS.P. S', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1053.jpg'),
('st-1066', '1066', 'MOHAMMED MIRZA M A', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1066.jpg'),
('st-1067', '1067', 'AHMAD FARHATH', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1067.jpg'),
('st-1068', '1068', 'Ahmed M.A.', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1068.jpg'),
('st-1070', '1070', 'MOHAMMED SHAMIL', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1070.jpg'),
('st-1072', '1072', 'MUHAMMED MUHAD K Z', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1072.jpg'),
('st-1073', '1073', 'SHAYAAN MOHAMMED.S', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1073.jpg'),
('st-1074', '1074', 'MOHAMMED HABEEB. A', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1074.jpg'),
('st-1075', '1075', 'ATHIF ABUTHAHIR P.P', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1075.jpg'),
('st-1076', '1076', 'Muhammed Shahzadah T A', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1076.jpg'),
('st-1077', '1077', 'MUHAMMAD AJMAL. TA', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1077.jpg'),
('st-1078', '1078', 'MUHAMMED KHIDASH HYZAM', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1078.jpg'),
('st-1079', '1079', 'ABDUL RAHMAN SHAHZAD K.S', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1079.jpg'),
('st-1080', '1080', 'Muhammed Ashiq', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1080.jpg'),
('st-1082', '1082', 'Mohammed Mayazin T.M', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1082.jpg'),
('st-1083', '1083', 'MOHAMMED NABHAN C M', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1083.jpg'),
('st-1084', '1084', 'MUHAMMED MUBASHIR P S', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1084.jpg'),
('st-1085', '1085', 'HISHAD ABDULLA K', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1085.jpg'),
('st-1087', '1087', 'Abdul Nasir RA', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1087.jpg'),
('st-1088', '1088', 'SALAHUDHEEN AYOOBI BADAKKAN', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1088.jpg'),
('st-1089', '1089', 'MUHAMMED SHAHID AB', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1089.jpg'),
('st-1090', '1090', 'MOHAMMED SHAYAN MOHIDDIN', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1090.jpg'),
('st-1091', '1091', 'ABDULLA MUNAVVAR', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1091.jpg'),
('st-1092', '1092', 'AMAN ABBAS', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1092.jpg'),
('st-1094', '1094', 'MOHAMMED AZEEM CK', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1094.jpg'),
('st-1095', '1095', 'MUHAMMED NAJAD', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1095.jpg'),
('st-1096', '1096', 'MUHAMMAD SADIK K.M', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1096.jpg'),
('st-1098', '1098', 'SAOOD BIN ABDUL NASSAR', 'cy-suffa-2627', 3, 'SUFFA', '', true, '/students/1098.jpg'),
('vahda-aflah', '941', 'MUHAMMED AFLAH.MK', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/941.jpg'),
('vahda-bilal', '970', 'ABDULLAH A P', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/970.jpg'),
('vahda-qubaib', '980', 'MOHAMMED QUBAIB A H', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/980.jpg'),
('vahda-munzir', '1000', 'MUHAMMED TAMEEM', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1000.jpg'),
('vahda-thufail', '1006', 'THUFAIL', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1006.jpg'),
('st-1009', '1009', 'AJZAL ASHRAF OV', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1009.jpg'),
('st-1018', '1018', 'MUHAMMED RIZIN AMAN', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1018.jpg'),
('vahda-azeem', '1019', 'MUHAMMAD AZEEM', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1019.jpg'),
('vahda-hafizst', '1020', 'MUHAMMED HAFIZ S T', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1020.jpg'),
('vahda-adil', '1022', 'MUHAMMED ADHIL C H', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1022.jpg'),
('vahda-sinan', '1023', 'Mohammed Sinan N.A', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1023.jpg'),
('st-1024', '1024', 'AHMED RAZI MR', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1024.jpg'),
('vahda-hisham', '1026', 'Muhammed Hisham K M', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1026.jpg'),
('vahda-muhaviz', '1027', 'HUSSAIN MUHAVIZ B A', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1027.jpg'),
('vahda-hilal', '1028', 'HILAL ABDULLA C H', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1028.jpg'),
('st-1029', '1029', 'MOIDEEN KAIS', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1029.jpg'),
('vahda-shahid', '1030', 'MUHAMMED SHAHID K A', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1030.jpg'),
('vahda-jalal', '1031', 'K MUHAMMAD JALAL', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1031.jpg'),
('vahda-hashir', '1035', 'MUHAMMED HASHIR A K', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1035.jpg'),
('vahda-nafih', '1036', 'MOHAMMED NAFIH', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1036.jpg'),
('vahda-beeran', '1037', 'BEERAN MUEENUDHEEN MH', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1037.jpg'),
('st-1038', '1038', 'MUHAMMAD K A', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1038.jpg'),
('st-1039', '1039', 'IBRAHIM KALEEL', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1039.jpg'),
('st-1041', '1041', 'MUHAMMED RAZI A T', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1041.jpg'),
('vahda-zaid', '1042', 'MUHAMMED ZAID', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1042.jpg'),
('vahda-hafeez', '1043', 'MUHAMMED HAFEEZ', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1043.jpg'),
('vahda-haeezp', '1044', 'MOHAMMED HAFEEZ', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1044.jpg'),
('vahda-s02', '1050', 'JAUHAR ASHFAQUE MUHSIN', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1050.jpg'),
('vahda-s03', '1051', 'YASEEN MUHAMMED', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1051.jpg'),
('vahda-s01', '1052', 'MOHAMMED RAFAN A', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1052.jpg'),
('vahda-s04', '1054', 'MOHAMMED SHUAIB K M', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1054.jpg'),
('vahda-muhammed', '1056', 'MUHAMMED MOIDEEN KUNHI', 'cy-vahda-2627', 4, 'VAHDA', '', true, '/students/1056.jpg'),
('st-899', '899', 'HASAN THAMMEEM', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/899.jpg'),
('st-923', '923', 'MUHAMMAD SABITH V K P', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/923.jpg'),
('st-938', '938', 'MUHAMMED SAEED THUFAIL', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/938.jpg'),
('st-945', '945', 'MUHAMMED SHUHAIR', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/945.jpg'),
('st-946', '946', 'Muhammed Anshad A', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/946.jpg'),
('st-972', '972', 'AHAMED ADIL. A', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/972.jpg'),
('st-974', '974', 'AHMED WALEED K A', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/974.jpg'),
('st-976', '976', 'AYAAN ABOOBAKAR', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/976.jpg'),
('st-977', '977', 'FADIL AMEEN ABDULLA', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/977.jpg'),
('st-978', '978', 'MOHAMED JAWHAR J A', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/978.jpg'),
('st-979', '979', 'Mohammad Yaseen', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/979.jpg'),
('st-981', '981', 'MOHAMMED SAWA T A', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/981.jpg'),
('st-985', '985', 'Muhammad M', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/985.jpg'),
('st-987', '987', 'MUHAMMED ADNAN K.A', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/987.jpg'),
('st-988', '988', 'Muhammed Anas', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/988.jpg'),
('st-989', '989', 'MUHAMMED ASHIR M', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/989.jpg'),
('st-992', '992', 'MUHAMMED FAHAD', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/992.jpg'),
('st-993', '993', 'MUHAMMED FAREED A S', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/993.jpg'),
('st-994', '994', 'MUHAMMED LUQMAN TD', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/994.jpg'),
('st-995', '995', 'MUHAMMED MICDAD RAMEES A H', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/995.jpg'),
('st-996', '996', 'MUHAMMED MIDLAJ', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/996.jpg'),
('st-997', '997', 'Muhammed Naieem', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/997.jpg'),
('st-998', '998', 'MUHAMMED RAEES C A', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/998.jpg'),
('st-1004', '1004', 'SAYYED MUHAMMED ABOOBACKER', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/1004.jpg'),
('st-1005', '1005', 'SHAHUL HAMEED B.I', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/1005.jpg'),
('st-1007', '1007', 'YOUSUF FAHEEM P', 'cy-class5-2627', 5, 'HUDA', '', false, '/students/1007.jpg'),
('st-872', '872', 'ABDUL GAFOOR', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/872.jpg'),
('st-890', '890', 'MUHAMMED RAZI TM', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/890.jpg'),
('st-892', '892', 'AHMAD MUBASHAR', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/892.jpg'),
('st-893', '893', 'MOHAMMED NAFIH BA', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/893.jpg'),
('st-912', '912', 'MUHAMMED ZAMIL', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/912.jpg'),
('st-913', '913', 'ABDUL RAHIMAN FAIZ T A', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/913.jpg'),
('st-914', '914', 'AHAMMED SAFAR ZAKARIYA', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/914.jpg'),
('st-915', '915', 'MUHAMMED MUHAZ P A', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/915.jpg'),
('st-916', '916', 'MUHAMMED SAHEEM ASHRAF', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/916.jpg'),
('st-917', '917', 'SHARAZ AHAMMED', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/917.jpg'),
('st-918', '918', 'MUHAMMED IHTHISHAM P I', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/918.jpg'),
('st-920', '920', 'AMEEN RAHMAN MTP', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/920.jpg'),
('st-921', '921', 'HASSAN SAHAL N A', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/921.jpg'),
('st-922', '922', 'MOHAMMED SABIK BM', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/922.jpg'),
('st-924', '924', 'Muhammad Muaaz', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/924.jpg'),
('st-925', '925', 'ABDUL SA-AD', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/925.jpg'),
('st-926', '926', 'MOHAMMED RIYAN', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/926.jpg'),
('st-927', '927', 'MOHIDDEEN SHAHSHAD', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/927.jpg'),
('st-929', '929', 'MUHAMMED YASEEN', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/929.jpg'),
('st-930', '930', 'MOHAMMED RAED. UA', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/930.jpg'),
('st-931', '931', 'MUHAMMED SHANIFM P', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/931.jpg'),
('st-932', '932', 'AHAMMED JABIR K H', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/932.jpg'),
('st-933', '933', 'THANSEEHU RAHMAN', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/933.jpg'),
('st-934', '934', 'MOHAMMED AFNAN', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/934.jpg'),
('st-935', '935', 'MOHAMMED SABITH KU', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/935.jpg'),
('st-939', '939', 'MEERAN MOHIUDHEEN RAFIH', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/939.jpg'),
('st-943', '943', 'ABDUL RAHIMAN AZAAN', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/943.jpg'),
('st-944', '944', 'MOHAMMED RAFIH M R', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/944.jpg'),
('st-947', '947', 'MUHAMMAD MIJVAD K', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/947.jpg'),
('st-948', '948', 'MOHAMMAD IJAN', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/948.jpg'),
('st-949', '949', 'HABEEB RAHMAN CA', 'cy-alfa-2627', 6, 'ALFA', '', true, '/students/949.jpg'),
('st-845', '845', 'MOHAMMED SHAHID', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/845.jpg'),
('st-853', '853', 'MAHIN SINAN', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/853.jpg'),
('st-856', '856', 'P K ZAMEEL AHMED', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/856.jpg'),
('st-863', '863', 'MOHAMMED SHADIL AP', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/863.jpg'),
('st-865', '865', 'YASEEN NOORULLA PH', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/865.jpg'),
('st-866', '866', 'WASEEM NIHAD A M', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/866.jpg'),
('st-867', '867', 'MOHAMMED SHAMEEM B K', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/867.jpg'),
('st-868', '868', 'MOHAMMED BAQIR TS', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/868.jpg'),
('st-869', '869', 'MUHAMMED FARHAN PH', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/869.jpg'),
('st-870', '870', 'ABDULLA FAHAD T.U', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/870.jpg'),
('st-875', '875', 'MUHAMMED MUNAZIR MM', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/875.jpg'),
('st-879', '879', 'ABDUL KHADER ISHAQUE', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/879.jpg'),
('st-880', '880', 'ABDULLA ALBAS', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/880.jpg'),
('st-882', '882', 'MUHAMMED A', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/882.jpg'),
('st-884', '884', 'MUHAMMED MIHRAZ', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/884.jpg'),
('st-886', '886', 'AJMAL AHMED MT', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/886.jpg'),
('st-888', '888', 'MOHAMMED DAWOOD K', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/888.jpg'),
('st-891', '891', 'RAYHAN PH', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/891.jpg'),
('st-898', '898', 'MOHAMMED YOUNUS', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/898.jpg'),
('st-900', '900', 'RASALUL AMEEN T', 'cy-class7-2627', 7, 'SAFWA', '', false, '/students/900.jpg'),
('st-802', '802', 'MUHAMMED ABDUL KADER', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/802.jpg'),
('st-810', '810', 'AHMAD MANAL KUDINGILA', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/810.jpg'),
('st-811', '811', 'ABDUL RAHMAN ANFHAL M I', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/811.jpg'),
('st-824', '824', 'ABDULLA SALMAN FARIS M', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/824.jpg'),
('st-825', '825', 'ABDULLA FARHAN M', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/825.jpg'),
('st-829', '829', 'MOHAMMED SA''DUDDEEN K', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/829.jpg'),
('st-830', '830', 'SEYYAD MUHAMMED FAHMAN', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/830.jpg'),
('st-831', '831', 'AJMAL RUWAIS', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/831.jpg'),
('st-832', '832', 'MOHAMMED ABDUL KHADER K', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/832.jpg'),
('st-833', '833', 'MUAHMMED ANAS P A', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/833.jpg'),
('st-835', '835', 'MUHAMMAD SHAMMAS', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/835.jpg'),
('st-836', '836', 'ARIFUDEEN ABBAS A', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/836.jpg'),
('st-837', '837', 'MAJID MUHAMMED M', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/837.jpg'),
('st-840', '840', 'ABDUL SALAM ARIF', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/840.jpg'),
('st-842', '842', 'MOHAMMED K H', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/842.jpg'),
('st-849', '849', 'MOHAMMED MUBASHIR', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/849.jpg'),
('st-851', '851', 'ADNAN ABDULLAH B A', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/851.jpg'),
('st-857', '857', 'MOHAMMED HISHAM', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/857.jpg'),
('st-1132', '1132', 'RAIHAN ABOOBACKER K', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/1132.jpg'),
('st-1133', '1133', 'MUHAMMED ADIL CP', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/1133.jpg'),
('st-1134', '1134', 'MOHAMMED ANSHID KP', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/1134.jpg'),
('st-1135', '1135', 'ZAID ADHIL M', 'cy-degree1-2627', 8, 'THUFA', '', false, '/students/1135.jpg'),
('st-722', '722', 'AJMAL AM', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/722.jpg'),
('st-730', '730', 'IBRAHIM AHRAZ', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/730.jpg'),
('st-742', '742', 'MUHAMMAD SHAZIN', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/742.jpg'),
('st-760', '760', 'MUHAMMED THASLEEM', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/760.jpg'),
('st-771', '771', 'ABDUL HADIL P.M', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/771.jpg'),
('st-778', '778', 'AHAMAD SHABAB P A', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/778.jpg'),
('st-779', '779', 'MOHAMMED SHAKIR HUSSAIN K.Y', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/779.jpg'),
('st-781', '781', 'MUHAMMED SHUHAIB S', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/781.jpg'),
('st-783', '783', 'MOHAMMED MOINUDDEEN CHISTY', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/783.jpg'),
('st-785', '785', 'SULAIMAN FAHAD AP', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/785.jpg'),
('st-786', '786', 'IJAS EBRAHIM', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/786.jpg'),
('st-788', '788', 'AHMAD MINHAJ', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/788.jpg'),
('st-791', '791', 'MUHAMMED SINAN M', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/791.jpg'),
('st-792', '792', 'MUHAMMED ASHKKAR ALI', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/792.jpg'),
('st-794', '794', 'SHAMEEL AHAMMED P', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/794.jpg'),
('st-796', '796', 'IMRAN HUSSAIN TI', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/796.jpg'),
('st-798', '798', 'AHAMED ZAKI FOUZAN T.Z', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/798.jpg'),
('st-799', '799', 'MUHAMMED SHABEEB', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/799.jpg'),
('st-800', '800', 'ABDUL BAAIS N.A', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/800.jpg'),
('st-801', '801', 'MUHAMMED PK', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/801.jpg'),
('st-805', '805', 'MOHAMMED ASHMIL K A', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/805.jpg'),
('st-806', '806', 'MUHAMMED SABITH ALI TM', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/806.jpg'),
('st-807', '807', 'MUHAMMED AHMASH K', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/807.jpg'),
('st-809', '809', 'MOHAMMED RAZEEN S.P', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/809.jpg'),
('st-812', '812', 'HASSAN ZARKASH', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/812.jpg'),
('st-813', '813', 'ABDULLA RAMSHAD', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/813.jpg'),
('st-1016', '1016', 'MUHAMMED KAIF B S', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/1016.jpg'),
('st-1063', '1063', 'AHMED RAZA N A', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/1063.jpg'),
('st-1099', '1099', 'MUHAMMED SHAFI P', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/1099.jpg'),
('st-1100', '1100', 'SHAIN AHAMMAD K', 'cy-degree2-2627', 9, 'NAJWA', '', false, '/students/1100.jpg'),
('st-666', '666', 'MOHAMMED AFSAL', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/666.jpg'),
('st-704', '704', 'AHAMMED AJEER', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/704.jpg'),
('st-709', '709', 'AMEEN ABDULLA', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/709.jpg'),
('st-728', '728', 'MOHAMMED ABDUL KHADER NABAVI E A', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/728.jpg'),
('st-729', '729', 'MUHAMMAD K.A', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/729.jpg'),
('st-739', '739', 'MOHAMMED SAHEED A.K', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/739.jpg'),
('st-740', '740', 'AHMED FAHEEM MA', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/740.jpg'),
('st-747', '747', 'MUHAMMAD IBN AHMAD', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/747.jpg'),
('st-749', '749', 'MUHAMMED MUJTHABA MK', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/749.jpg'),
('st-754', '754', 'MUHAMMED SHAHAN P.S', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/754.jpg'),
('st-755', '755', 'MOHAMMED THAJUDDEEN A R P', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/755.jpg'),
('st-757', '757', 'RUMAIZALI R IBRAHIM', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/757.jpg'),
('st-762', '762', 'AHAMED SHAMMAS C.M', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/762.jpg'),
('st-772', '772', 'MUHAMMAD MUSTHAFA K.M', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/772.jpg'),
('st-773', '773', 'ABDULLAH MAZIN', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/773.jpg'),
('st-776', '776', 'MUHAMMED T A', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/776.jpg'),
('st-777', '777', 'MOHAMMED HUSSAIN', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/777.jpg'),
('st-819', '819', 'MUHAMMED ZAYAN N.S', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/819.jpg'),
('st-1057', '1057', 'MUHAMMED SABITH KM', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/1057.jpg'),
('st-1058', '1058', 'Sufyan mk', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/1058.jpg'),
('st-1059', '1059', 'Abdunnafih', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/1059.jpg'),
('st-1060', '1060', 'MUHAMMED SWALIH TA', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/1060.jpg'),
('st-1061', '1061', 'MUHAMMED FARZAQ K', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/1061.jpg'),
('st-1062', '1062', 'MUHAMMAD NAZAL NAWAS K', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/1062.jpg'),
('st-1064', '1064', 'MUHEENUDHEEN MP', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/1064.jpg'),
('st-1097', '1097', 'MUHAMMED FARMAN', 'cy-degree3-2627', 10, 'WIDAD', '', false, '/students/1097.jpg')
ON CONFLICT (admission_no) DO UPDATE SET name = EXCLUDED.name, father_name = EXCLUDED.father_name, class_name = EXCLUDED.class_name;

-- ============================================================
-- Seed Data: Meeting #01 & Role Assignments
-- ============================================================
INSERT INTO public.meetings (id, class_year_id, academic_year_id, meeting_number, date, theme_english, theme_malayalam, status, start_time, end_time) VALUES
('meeting-vahda-01', 'cy-vahda-2627', 'ay-2026-27', 1, '2026-09-18', 'Loss: The Way to Success', 'നഷ്ടം: വിജയത്തിലേക്കുള്ള വഴി', 'collecting', '14:00', '16:30')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.evaluations (id, meeting_id, evaluator_student_id, subject_student_id, speech_type, marks, remarks, strength_tag_ids, improvement_tag_ids) VALUES
('eval-v1-01', 'meeting-vahda-01', 'vahda-s02', 'vahda-nafih', 'prepared', 82, 'Ice breaking was heartfelt. Commendable initial stage presence and eye contact. Needs more projection in larger hall settings.', ARRAY['tag-preparation', 'tag-sincerity']::text[], ARRAY['tag-voice-projection']::text[])
ON CONFLICT (id) DO NOTHING;
