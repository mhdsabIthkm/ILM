import { Student } from '../types';

export interface ClassInfo {
  classNum: number;
  className: string;
  shortName: string;
  isIlm: boolean;
  classYearId: string;
  studentCount: number;
}

export const ALL_CLASSES: ClassInfo[] = [
  { classNum: 1, className: "SA'DA", shortName: "SA'DA", isIlm: true, classYearId: "cy-sada-2627", studentCount: 32 },
  { classNum: 2, className: "SIDRA", shortName: "SIDRA", isIlm: true, classYearId: "cy-sidra-2627", studentCount: 30 },
  { classNum: 3, className: "SUFFA", shortName: "SUFFA", isIlm: true, classYearId: "cy-suffa-2627", studentCount: 29 },
  { classNum: 4, className: "VAHDA", shortName: "VAHDA", isIlm: true, classYearId: "cy-vahda-2627", studentCount: 32 },
  { classNum: 5, className: "HUDA", shortName: "HUDA", isIlm: false, classYearId: "cy-class5-2627", studentCount: 26 },
  { classNum: 6, className: "ALFA", shortName: "ALFA", isIlm: true, classYearId: "cy-alfa-2627", studentCount: 31 },
  { classNum: 7, className: "SAFWA", shortName: "SAFWA", isIlm: false, classYearId: "cy-class7-2627", studentCount: 20 },
  { classNum: 8, className: "THUFA", shortName: "THUFA", isIlm: false, classYearId: "cy-degree1-2627", studentCount: 22 },
  { classNum: 9, className: "NAJWA", shortName: "NAJWA", isIlm: false, classYearId: "cy-degree2-2627", studentCount: 30 },
  { classNum: 10, className: "WIDAD", shortName: "WIDAD", isIlm: false, classYearId: "cy-degree3-2627", studentCount: 26 },
];

export const ILM_CLASS_NUMBERS = [1, 2, 3, 4, 6];

export const allStudents: Student[] = [
  // ---- Class 1: SA'DA (32 students) ----
  {"id": "st-1136", "name": "ABOOBAKKER SIDDIQ RAAFI", "admissionNo": "1136", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1137", "name": "ZEESHAN ABDUL RAHMAN N K", "admissionNo": "1137", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1138", "name": "SHAZIL ABBAS", "admissionNo": "1138", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "ABDUL AZEEZ", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1139", "name": "ZIYAN MUHAMMED RK", "admissionNo": "1139", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "RAZAK K M", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1140", "name": "Mohammed Udaif K A", "admissionNo": "1140", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "Abdul Rahman KA", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1141", "name": "Muhammed mujthaba Anchillath", "admissionNo": "1141", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "Ashraf Anchillath", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1142", "name": "ABDULLA AAZIM K", "admissionNo": "1142", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "IBRAHIM KHALEEL", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1143", "name": "Mohammad Faizan", "admissionNo": "1143", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "Shanavaz Mahamood", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1144", "name": "Muhammed Rizwan KH", "admissionNo": "1144", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "Muhammed Haneefa KA", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1145", "name": "ABDUL KADER NABHAN S T", "admissionNo": "1145", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "ABDUL SHUKOOR T", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1146", "name": "AHMED RILWAN", "admissionNo": "1146", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "ABDUL NASIR TM", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1147", "name": "Farih A L", "admissionNo": "1147", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "Abdul Latheef", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1148", "name": "MUHAMMED SHAHEEM AARIF", "admissionNo": "1148", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "AARIF KAIPATTIL UDINUR", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1149", "name": "MOHAMMAD RAZEEN", "admissionNo": "1149", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "AHAMMAD RASID", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1150", "name": "MOHAMMED MEHRAZ TM", "admissionNo": "1150", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "MANSOOR TA", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1151", "name": "MUHAMMED SUFIYAN A", "admissionNo": "1151", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "ABDUL LATHIF", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1152", "name": "HISHAM C H", "admissionNo": "1152", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "ABDUL HARIS C H", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1153", "name": "MUHAMMED ALFAZ N A", "admissionNo": "1153", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "ABDUL NAVAS K H", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1154", "name": "MOHAMMED RAFIH", "admissionNo": "1154", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "SALIM", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1155", "name": "ABOOBAKKAR AZAD", "admissionNo": "1155", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "Ashraf CH", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1156", "name": "Muhammad Thayyib AK", "admissionNo": "1156", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "Akbar siddique AK", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1157", "name": "SHAZIM ABDUL RAHMAN", "admissionNo": "1157", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "MOHAMMED HANEEFA T A", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1158", "name": "ABDUL KHADER RINAS AK", "admissionNo": "1158", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "ASHRAF AK", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1159", "name": "ZAHRAN AK", "admissionNo": "1159", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "MUNEER AK", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1160", "name": "ABDULLAH MUHAMMED ALI", "admissionNo": "1160", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "MOHAMMED ASHARAF MOGRAL", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1161", "name": "MUHAMMED AMEEN", "admissionNo": "1161", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "NOUFAL K S", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1162", "name": "Muhammad Abdusamad", "admissionNo": "1162", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "Abdu samad", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1163", "name": "ABDULLAH BASITH", "admissionNo": "1163", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "MUHAMMAD A", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1164", "name": "MUHAMMED RIZWI", "admissionNo": "1164", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "MUHAMMED IRSHAD", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1165", "name": "IHSAN MUHAMMAD", "admissionNo": "1165", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "MUHAMMAD ANVAR", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1166", "name": "MUHAMMAD ZAID FA", "admissionNo": "1166", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "FAIZAL A", "classNum": 1, "className": "SA'DA", "isIlm": true},
  {"id": "st-1167", "name": "RABEEATH AHMAD", "admissionNo": "1167", "classYearId": "cy-sada-2627", "cohortId": "cohort-1", "fatherName": "KALID PA", "classNum": 1, "className": "SA'DA", "isIlm": true},
  // ---- Class 2: SIDRA (30 students) ----
  {"id": "st-1046", "name": "MUHAMMED BIN JAFAR", "admissionNo": "1046", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1046.jpg"},
  {"id": "st-1049", "name": "MUHAMMED SHIRAZ ISHAQUE", "admissionNo": "1049", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1049.jpg"},
  {"id": "st-1065", "name": "NABEEH AHMAD C K", "admissionNo": "1065", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1065.jpg"},
  {"id": "st-1069", "name": "MIFZAL ABDULLA K M", "admissionNo": "1069", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1069.jpg"},
  {"id": "st-1093", "name": "ABOOBACKER FALAH M.I", "admissionNo": "1093", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1093.jpg"},
  {"id": "st-1101", "name": "MOHAMMED ANSAF KA", "admissionNo": "1101", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1101.jpg"},
  {"id": "st-1102", "name": "MUBASHIR M", "admissionNo": "1102", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1102.jpg"},
  {"id": "st-1103", "name": "MOHAMMED", "admissionNo": "1103", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1103.jpg"},
  {"id": "st-1105", "name": "MUHAMMED MEHRAN", "admissionNo": "1105", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1105.jpg"},
  {"id": "st-1107", "name": "MUHAMMED MARSAD B L", "admissionNo": "1107", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1107.jpg"},
  {"id": "st-1108", "name": "NASHVAN ABDUL KADER B", "admissionNo": "1108", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1108.jpg"},
  {"id": "st-1109", "name": "MUHAMMED ZEYAN", "admissionNo": "1109", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1109.jpg"},
  {"id": "st-1110", "name": "SAYYID MUHAMMED MUHSIN N", "admissionNo": "1110", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1110.jpg"},
  {"id": "st-1112", "name": "MUHAMMED ASWIM NH", "admissionNo": "1112", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1112.jpg"},
  {"id": "st-1113", "name": "MOHAMMED NAZEEF", "admissionNo": "1113", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1113.jpg"},
  {"id": "st-1114", "name": "MUHAMMED AMEEN PA", "admissionNo": "1114", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1114.jpg"},
  {"id": "st-1115", "name": "MOHAMMED SHAHIR K A", "admissionNo": "1115", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1115.jpg"},
  {"id": "st-1116", "name": "MOHAMMED FAZIL B H", "admissionNo": "1116", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1116.jpg"},
  {"id": "st-1117", "name": "MUHAMMED RISHAK M V", "admissionNo": "1117", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1117.jpg"},
  {"id": "st-1118", "name": "MUHAMMED AZEEM M", "admissionNo": "1118", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1118.jpg"},
  {"id": "st-1119", "name": "MUHAMMED FAIZAN BK", "admissionNo": "1119", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1119.jpg"},
  {"id": "st-1120", "name": "HAYAAN ABDULLA A.M", "admissionNo": "1120", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1120.jpg"},
  {"id": "st-1122", "name": "ABDUL RAHMAN ADNAN T A", "admissionNo": "1122", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1122.jpg"},
  {"id": "st-1123", "name": "MUHAMMED SHIFAN", "admissionNo": "1123", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1123.jpg"},
  {"id": "st-1124", "name": "ABDUL KADAR BILAL P.A", "admissionNo": "1124", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1124.jpg"},
  {"id": "st-1125", "name": "MUHAMMAD RAIHAN", "admissionNo": "1125", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1125.jpg"},
  {"id": "st-1126", "name": "MUHAMMED RIHAN", "admissionNo": "1126", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1126.jpg"},
  {"id": "st-1127", "name": "M THOUFIQ HUSSAIN", "admissionNo": "1127", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1127.jpg"},
  {"id": "st-1128", "name": "SHAMIL AHMED BK", "admissionNo": "1128", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1128.jpg"},
  {"id": "st-1131", "name": "IBRAHIM KALEEL P H", "admissionNo": "1131", "classYearId": "cy-sidra-2627", "cohortId": "cohort-2", "fatherName": "", "classNum": 2, "className": "SIDRA", "isIlm": true, "avatarUrl": "/students/1131.jpg"},
  // ---- Class 3: SUFFA (29 students) ----
  {"id": "st-1021", "name": "Abdul Khader Uvais K A", "admissionNo": "1021", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1021.jpg"},
  {"id": "st-1053", "name": "MUHAMMED UVAIS.P. S", "admissionNo": "1053", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1053.jpg"},
  {"id": "st-1066", "name": "MOHAMMED MIRZA M A", "admissionNo": "1066", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1066.jpg"},
  {"id": "st-1067", "name": "AHMAD FARHATH", "admissionNo": "1067", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1067.jpg"},
  {"id": "st-1068", "name": "Ahmed M.A.", "admissionNo": "1068", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1068.jpg"},
  {"id": "st-1070", "name": "MOHAMMED SHAMIL", "admissionNo": "1070", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1070.jpg"},
  {"id": "st-1072", "name": "MUHAMMED MUHAD K Z", "admissionNo": "1072", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1072.jpg"},
  {"id": "st-1073", "name": "SHAYAAN MOHAMMED.S", "admissionNo": "1073", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1073.jpg"},
  {"id": "st-1074", "name": "MOHAMMED HABEEB. A", "admissionNo": "1074", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1074.jpg"},
  {"id": "st-1075", "name": "ATHIF ABUTHAHIR P.P", "admissionNo": "1075", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1075.jpg"},
  {"id": "st-1076", "name": "Muhammed Shahzadah T A", "admissionNo": "1076", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1076.jpg"},
  {"id": "st-1077", "name": "MUHAMMAD AJMAL. TA", "admissionNo": "1077", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1077.jpg"},
  {"id": "st-1078", "name": "MUHAMMED KHIDASH HYZAM", "admissionNo": "1078", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1078.jpg"},
  {"id": "st-1079", "name": "ABDUL RAHMAN SHAHZAD K.S", "admissionNo": "1079", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1079.jpg"},
  {"id": "st-1080", "name": "Muhammed Ashiq", "admissionNo": "1080", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1080.jpg"},
  {"id": "st-1082", "name": "Mohammed Mayazin T.M", "admissionNo": "1082", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1082.jpg"},
  {"id": "st-1083", "name": "MOHAMMED NABHAN C M", "admissionNo": "1083", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1083.jpg"},
  {"id": "st-1084", "name": "MUHAMMED MUBASHIR P S", "admissionNo": "1084", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1084.jpg"},
  {"id": "st-1085", "name": "HISHAD ABDULLA K", "admissionNo": "1085", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1085.jpg"},
  {"id": "st-1087", "name": "Abdul Nasir RA", "admissionNo": "1087", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1087.jpg"},
  {"id": "st-1088", "name": "SALAHUDHEEN AYOOBI BADAKKAN", "admissionNo": "1088", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1088.jpg"},
  {"id": "st-1089", "name": "MUHAMMED SHAHID AB", "admissionNo": "1089", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1089.jpg"},
  {"id": "st-1090", "name": "MOHAMMED SHAYAN MOHIDDIN", "admissionNo": "1090", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1090.jpg"},
  {"id": "st-1091", "name": "ABDULLA MUNAVVAR", "admissionNo": "1091", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1091.jpg"},
  {"id": "st-1092", "name": "AMAN ABBAS", "admissionNo": "1092", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1092.jpg"},
  {"id": "st-1094", "name": "MOHAMMED AZEEM CK", "admissionNo": "1094", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1094.jpg"},
  {"id": "st-1095", "name": "MUHAMMED NAJAD", "admissionNo": "1095", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1095.jpg"},
  {"id": "st-1096", "name": "MUHAMMAD SADIK K.M", "admissionNo": "1096", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1096.jpg"},
  {"id": "st-1098", "name": "SAOOD BIN ABDUL NASSAR", "admissionNo": "1098", "classYearId": "cy-suffa-2627", "cohortId": "cohort-3", "fatherName": "", "classNum": 3, "className": "SUFFA", "isIlm": true, "avatarUrl": "/students/1098.jpg"},
  // ---- Class 4: VAHDA (32 students) ----
  {"id": "vahda-aflah", "name": "MUHAMMED AFLAH.MK", "admissionNo": "941", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/941.jpg"},
  {"id": "vahda-bilal", "name": "ABDULLAH A P", "admissionNo": "970", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/970.jpg"},
  {"id": "vahda-qubaib", "name": "MOHAMMED QUBAIB A H", "admissionNo": "980", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/980.jpg"},
  {"id": "vahda-munzir", "name": "MUHAMMED TAMEEM", "admissionNo": "1000", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1000.jpg"},
  {"id": "vahda-thufail", "name": "THUFAIL", "admissionNo": "1006", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1006.jpg"},
  {"id": "st-1009", "name": "AJZAL ASHRAF OV", "admissionNo": "1009", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1009.jpg"},
  {"id": "st-1018", "name": "MUHAMMED RIZIN AMAN", "admissionNo": "1018", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1018.jpg"},
  {"id": "vahda-azeem", "name": "MUHAMMAD AZEEM", "admissionNo": "1019", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1019.jpg"},
  {"id": "vahda-hafizst", "name": "MUHAMMED HAFIZ S T", "admissionNo": "1020", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1020.jpg"},
  {"id": "vahda-adil", "name": "MUHAMMED ADHIL C H", "admissionNo": "1022", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1022.jpg"},
  {"id": "vahda-sinan", "name": "Mohammed Sinan N.A", "admissionNo": "1023", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1023.jpg"},
  {"id": "st-1024", "name": "AHMED RAZI MR", "admissionNo": "1024", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1024.jpg"},
  {"id": "vahda-hisham", "name": "Muhammed Hisham K M", "admissionNo": "1026", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1026.jpg"},
  {"id": "vahda-muhaviz", "name": "HUSSAIN MUHAVIZ B A", "admissionNo": "1027", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1027.jpg"},
  {"id": "vahda-hilal", "name": "HILAL ABDULLA C H", "admissionNo": "1028", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1028.jpg"},
  {"id": "st-1029", "name": "MOIDEEN KAIS", "admissionNo": "1029", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1029.jpg"},
  {"id": "vahda-shahid", "name": "MUHAMMED SHAHID K A", "admissionNo": "1030", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1030.jpg"},
  {"id": "vahda-jalal", "name": "K MUHAMMAD JALAL", "admissionNo": "1031", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1031.jpg"},
  {"id": "vahda-hashir", "name": "MUHAMMED HASHIR A K", "admissionNo": "1035", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1035.jpg"},
  {"id": "vahda-nafih", "name": "MOHAMMED NAFIH", "admissionNo": "1036", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1036.jpg"},
  {"id": "vahda-beeran", "name": "BEERAN MUEENUDHEEN MH", "admissionNo": "1037", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1037.jpg"},
  {"id": "st-1038", "name": "MUHAMMAD K A", "admissionNo": "1038", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1038.jpg"},
  {"id": "st-1039", "name": "IBRAHIM KALEEL", "admissionNo": "1039", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1039.jpg"},
  {"id": "st-1041", "name": "MUHAMMED RAZI A T", "admissionNo": "1041", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1041.jpg"},
  {"id": "vahda-zaid", "name": "MUHAMMED ZAID", "admissionNo": "1042", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1042.jpg"},
  {"id": "vahda-hafeez", "name": "MUHAMMED HAFEEZ", "admissionNo": "1043", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1043.jpg"},
  {"id": "vahda-haeezp", "name": "MOHAMMED HAFEEZ", "admissionNo": "1044", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1044.jpg"},
  {"id": "vahda-s02", "name": "JAUHAR ASHFAQUE MUHSIN", "admissionNo": "1050", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1050.jpg"},
  {"id": "vahda-s03", "name": "YASEEN MUHAMMED", "admissionNo": "1051", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1051.jpg"},
  {"id": "vahda-s01", "name": "MOHAMMED RAFAN A", "admissionNo": "1052", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1052.jpg"},
  {"id": "vahda-s04", "name": "MOHAMMED SHUAIB K M", "admissionNo": "1054", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1054.jpg"},
  {"id": "vahda-muhammed", "name": "MUHAMMED MOIDEEN KUNHI", "admissionNo": "1056", "classYearId": "cy-vahda-2627", "cohortId": "cohort-4", "fatherName": "", "classNum": 4, "className": "VAHDA", "isIlm": true, "avatarUrl": "/students/1056.jpg"},
  // ---- Class 5: HUDA (26 students) ----
  {"id": "st-899", "name": "HASAN THAMMEEM", "admissionNo": "899", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/899.jpg"},
  {"id": "st-923", "name": "MUHAMMAD SABITH V K P", "admissionNo": "923", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/923.jpg"},
  {"id": "st-938", "name": "MUHAMMED SAEED THUFAIL", "admissionNo": "938", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/938.jpg"},
  {"id": "st-945", "name": "MUHAMMED SHUHAIR", "admissionNo": "945", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/945.jpg"},
  {"id": "st-946", "name": "Muhammed Anshad A", "admissionNo": "946", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/946.jpg"},
  {"id": "st-972", "name": "AHAMED ADIL. A", "admissionNo": "972", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/972.jpg"},
  {"id": "st-974", "name": "AHMED WALEED K A", "admissionNo": "974", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/974.jpg"},
  {"id": "st-976", "name": "AYAAN ABOOBAKAR", "admissionNo": "976", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/976.jpg"},
  {"id": "st-977", "name": "FADIL AMEEN ABDULLA", "admissionNo": "977", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/977.jpg"},
  {"id": "st-978", "name": "MOHAMED JAWHAR J A", "admissionNo": "978", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/978.jpg"},
  {"id": "st-979", "name": "Mohammad Yaseen", "admissionNo": "979", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/979.jpg"},
  {"id": "st-981", "name": "MOHAMMED SAWA T A", "admissionNo": "981", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/981.jpg"},
  {"id": "st-985", "name": "Muhammad M", "admissionNo": "985", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/985.jpg"},
  {"id": "st-987", "name": "MUHAMMED ADNAN K.A", "admissionNo": "987", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/987.jpg"},
  {"id": "st-988", "name": "Muhammed Anas", "admissionNo": "988", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/988.jpg"},
  {"id": "st-989", "name": "MUHAMMED ASHIR M", "admissionNo": "989", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/989.jpg"},
  {"id": "st-992", "name": "MUHAMMED FAHAD", "admissionNo": "992", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/992.jpg"},
  {"id": "st-993", "name": "MUHAMMED FAREED A S", "admissionNo": "993", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/993.jpg"},
  {"id": "st-994", "name": "MUHAMMED LUQMAN TD", "admissionNo": "994", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/994.jpg"},
  {"id": "st-995", "name": "MUHAMMED MICDAD RAMEES A H", "admissionNo": "995", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/995.jpg"},
  {"id": "st-996", "name": "MUHAMMED MIDLAJ", "admissionNo": "996", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/996.jpg"},
  {"id": "st-997", "name": "Muhammed Naieem", "admissionNo": "997", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/997.jpg"},
  {"id": "st-998", "name": "MUHAMMED RAEES C A", "admissionNo": "998", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/998.jpg"},
  {"id": "st-1004", "name": "SAYYED MUHAMMED ABOOBACKER", "admissionNo": "1004", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/1004.jpg"},
  {"id": "st-1005", "name": "SHAHUL HAMEED B.I", "admissionNo": "1005", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/1005.jpg"},
  {"id": "st-1007", "name": "YOUSUF FAHEEM P", "admissionNo": "1007", "classYearId": "cy-class5-2627", "cohortId": "cohort-5", "fatherName": "", "classNum": 5, "className": "HUDA", "isIlm": false, "avatarUrl": "/students/1007.jpg"},
  // ---- Class 6: ALFA (31 students) ----
  {"id": "st-872", "name": "ABDUL GAFOOR", "admissionNo": "872", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/872.jpg"},
  {"id": "st-890", "name": "MUHAMMED RAZI TM", "admissionNo": "890", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/890.jpg"},
  {"id": "st-892", "name": "AHMAD MUBASHAR", "admissionNo": "892", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/892.jpg"},
  {"id": "st-893", "name": "MOHAMMED NAFIH BA", "admissionNo": "893", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/893.jpg"},
  {"id": "st-912", "name": "MUHAMMED ZAMIL", "admissionNo": "912", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/912.jpg"},
  {"id": "st-913", "name": "ABDUL RAHIMAN FAIZ T A", "admissionNo": "913", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/913.jpg"},
  {"id": "st-914", "name": "AHAMMED SAFAR ZAKARIYA", "admissionNo": "914", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/914.jpg"},
  {"id": "st-915", "name": "MUHAMMED MUHAZ P A", "admissionNo": "915", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/915.jpg"},
  {"id": "st-916", "name": "MUHAMMED SAHEEM ASHRAF", "admissionNo": "916", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/916.jpg"},
  {"id": "st-917", "name": "SHARAZ AHAMMED", "admissionNo": "917", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/917.jpg"},
  {"id": "st-918", "name": "MUHAMMED IHTHISHAM P I", "admissionNo": "918", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/918.jpg"},
  {"id": "st-920", "name": "AMEEN RAHMAN MTP", "admissionNo": "920", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/920.jpg"},
  {"id": "st-921", "name": "HASSAN SAHAL N A", "admissionNo": "921", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/921.jpg"},
  {"id": "st-922", "name": "MOHAMMED SABIK BM", "admissionNo": "922", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/922.jpg"},
  {"id": "st-924", "name": "Muhammad Muaaz", "admissionNo": "924", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/924.jpg"},
  {"id": "st-925", "name": "ABDUL SA-AD", "admissionNo": "925", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/925.jpg"},
  {"id": "st-926", "name": "MOHAMMED RIYAN", "admissionNo": "926", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/926.jpg"},
  {"id": "st-927", "name": "MOHIDDEEN SHAHSHAD", "admissionNo": "927", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/927.jpg"},
  {"id": "st-929", "name": "MUHAMMED YASEEN", "admissionNo": "929", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/929.jpg"},
  {"id": "st-930", "name": "MOHAMMED RAED. UA", "admissionNo": "930", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/930.jpg"},
  {"id": "st-931", "name": "MUHAMMED SHANIFM P", "admissionNo": "931", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/931.jpg"},
  {"id": "st-932", "name": "AHAMMED JABIR K H", "admissionNo": "932", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/932.jpg"},
  {"id": "st-933", "name": "THANSEEHU RAHMAN", "admissionNo": "933", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/933.jpg"},
  {"id": "st-934", "name": "MOHAMMED AFNAN", "admissionNo": "934", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/934.jpg"},
  {"id": "st-935", "name": "MOHAMMED SABITH KU", "admissionNo": "935", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/935.jpg"},
  {"id": "st-939", "name": "MEERAN MOHIUDHEEN RAFIH", "admissionNo": "939", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/939.jpg"},
  {"id": "st-943", "name": "ABDUL RAHIMAN AZAAN", "admissionNo": "943", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/943.jpg"},
  {"id": "st-944", "name": "MOHAMMED RAFIH M R", "admissionNo": "944", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/944.jpg"},
  {"id": "st-947", "name": "MUHAMMAD MIJVAD K", "admissionNo": "947", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/947.jpg"},
  {"id": "st-948", "name": "MOHAMMAD IJAN", "admissionNo": "948", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/948.jpg"},
  {"id": "st-949", "name": "HABEEB RAHMAN CA", "admissionNo": "949", "classYearId": "cy-alfa-2627", "cohortId": "cohort-6", "fatherName": "", "classNum": 6, "className": "ALFA", "isIlm": true, "avatarUrl": "/students/949.jpg"},
  // ---- Class 7: SAFWA (20 students) ----
  {"id": "st-845", "name": "MOHAMMED SHAHID", "admissionNo": "845", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/845.jpg"},
  {"id": "st-853", "name": "MAHIN SINAN", "admissionNo": "853", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/853.jpg"},
  {"id": "st-856", "name": "P K ZAMEEL AHMED", "admissionNo": "856", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/856.jpg"},
  {"id": "st-863", "name": "MOHAMMED SHADIL AP", "admissionNo": "863", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/863.jpg"},
  {"id": "st-865", "name": "YASEEN NOORULLA PH", "admissionNo": "865", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/865.jpg"},
  {"id": "st-866", "name": "WASEEM NIHAD A M", "admissionNo": "866", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/866.jpg"},
  {"id": "st-867", "name": "MOHAMMED SHAMEEM B K", "admissionNo": "867", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/867.jpg"},
  {"id": "st-868", "name": "MOHAMMED BAQIR TS", "admissionNo": "868", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/868.jpg"},
  {"id": "st-869", "name": "MUHAMMED FARHAN PH", "admissionNo": "869", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/869.jpg"},
  {"id": "st-870", "name": "ABDULLA FAHAD T.U", "admissionNo": "870", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/870.jpg"},
  {"id": "st-875", "name": "MUHAMMED MUNAZIR MM", "admissionNo": "875", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/875.jpg"},
  {"id": "st-879", "name": "ABDUL KHADER ISHAQUE", "admissionNo": "879", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/879.jpg"},
  {"id": "st-880", "name": "ABDULLA ALBAS", "admissionNo": "880", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/880.jpg"},
  {"id": "st-882", "name": "MUHAMMED A", "admissionNo": "882", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/882.jpg"},
  {"id": "st-884", "name": "MUHAMMED MIHRAZ", "admissionNo": "884", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/884.jpg"},
  {"id": "st-886", "name": "AJMAL AHMED MT", "admissionNo": "886", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/886.jpg"},
  {"id": "st-888", "name": "MOHAMMED DAWOOD K", "admissionNo": "888", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/888.jpg"},
  {"id": "st-891", "name": "RAYHAN PH", "admissionNo": "891", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/891.jpg"},
  {"id": "st-898", "name": "MOHAMMED YOUNUS", "admissionNo": "898", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/898.jpg"},
  {"id": "st-900", "name": "RASALUL AMEEN T", "admissionNo": "900", "classYearId": "cy-class7-2627", "cohortId": "cohort-7", "fatherName": "", "classNum": 7, "className": "SAFWA", "isIlm": false, "avatarUrl": "/students/900.jpg"},
  // ---- Class 8: THUFA (22 students) ----
  {"id": "st-802", "name": "MUHAMMED ABDUL KADER", "admissionNo": "802", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/802.jpg"},
  {"id": "st-810", "name": "AHMAD MANAL KUDINGILA", "admissionNo": "810", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/810.jpg"},
  {"id": "st-811", "name": "ABDUL RAHMAN ANFHAL M I", "admissionNo": "811", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/811.jpg"},
  {"id": "st-824", "name": "ABDULLA SALMAN FARIS M", "admissionNo": "824", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/824.jpg"},
  {"id": "st-825", "name": "ABDULLA FARHAN M", "admissionNo": "825", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/825.jpg"},
  {"id": "st-829", "name": "MOHAMMED SA'DUDDEEN K", "admissionNo": "829", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/829.jpg"},
  {"id": "st-830", "name": "SEYYAD MUHAMMED FAHMAN", "admissionNo": "830", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/830.jpg"},
  {"id": "st-831", "name": "AJMAL RUWAIS", "admissionNo": "831", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/831.jpg"},
  {"id": "st-832", "name": "MOHAMMED ABDUL KHADER K", "admissionNo": "832", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/832.jpg"},
  {"id": "st-833", "name": "MUAHMMED ANAS P A", "admissionNo": "833", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/833.jpg"},
  {"id": "st-835", "name": "MUHAMMAD SHAMMAS", "admissionNo": "835", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/835.jpg"},
  {"id": "st-836", "name": "ARIFUDEEN ABBAS A", "admissionNo": "836", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/836.jpg"},
  {"id": "st-837", "name": "MAJID MUHAMMED M", "admissionNo": "837", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/837.jpg"},
  {"id": "st-840", "name": "ABDUL SALAM ARIF", "admissionNo": "840", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/840.jpg"},
  {"id": "st-842", "name": "MOHAMMED K H", "admissionNo": "842", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/842.jpg"},
  {"id": "st-849", "name": "MOHAMMED MUBASHIR", "admissionNo": "849", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/849.jpg"},
  {"id": "st-851", "name": "ADNAN ABDULLAH B A", "admissionNo": "851", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/851.jpg"},
  {"id": "st-857", "name": "MOHAMMED HISHAM", "admissionNo": "857", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false, "avatarUrl": "/students/857.jpg"},
  {"id": "st-1132", "name": "RAIHAN ABOOBACKER K", "admissionNo": "1132", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false},
  {"id": "st-1133", "name": "MUHAMMED ADIL CP", "admissionNo": "1133", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false},
  {"id": "st-1134", "name": "MOHAMMED ANSHID KP", "admissionNo": "1134", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false},
  {"id": "st-1135", "name": "ZAID ADHIL M", "admissionNo": "1135", "classYearId": "cy-degree1-2627", "cohortId": "cohort-8", "fatherName": "", "classNum": 8, "className": "THUFA", "isIlm": false},
  // ---- Class 9: NAJWA (30 students) ----
  {"id": "st-722", "name": "AJMAL AM", "admissionNo": "722", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/722.jpg"},
  {"id": "st-730", "name": "IBRAHIM AHRAZ", "admissionNo": "730", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/730.jpg"},
  {"id": "st-742", "name": "MUHAMMAD SHAZIN", "admissionNo": "742", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/742.jpg"},
  {"id": "st-760", "name": "MUHAMMED THASLEEM", "admissionNo": "760", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false},
  {"id": "st-771", "name": "ABDUL HADIL P.M", "admissionNo": "771", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/771.jpg"},
  {"id": "st-778", "name": "AHAMAD SHABAB P A", "admissionNo": "778", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/778.jpg"},
  {"id": "st-779", "name": "MOHAMMED SHAKIR HUSSAIN K.Y", "admissionNo": "779", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/779.jpg"},
  {"id": "st-781", "name": "MUHAMMED SHUHAIB S", "admissionNo": "781", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/781.jpg"},
  {"id": "st-783", "name": "MOHAMMED MOINUDDEEN CHISTY", "admissionNo": "783", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/783.jpg"},
  {"id": "st-785", "name": "SULAIMAN FAHAD AP", "admissionNo": "785", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/785.jpg"},
  {"id": "st-786", "name": "IJAS EBRAHIM", "admissionNo": "786", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/786.jpg"},
  {"id": "st-788", "name": "AHMAD MINHAJ", "admissionNo": "788", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/788.jpg"},
  {"id": "st-791", "name": "MUHAMMED SINAN M", "admissionNo": "791", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/791.jpg"},
  {"id": "st-792", "name": "MUHAMMED ASHKKAR ALI", "admissionNo": "792", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/792.jpg"},
  {"id": "st-794", "name": "SHAMEEL AHAMMED P", "admissionNo": "794", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/794.jpg"},
  {"id": "st-796", "name": "IMRAN HUSSAIN TI", "admissionNo": "796", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/796.jpg"},
  {"id": "st-798", "name": "AHAMED ZAKI FOUZAN T.Z", "admissionNo": "798", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/798.jpg"},
  {"id": "st-799", "name": "MUHAMMED SHABEEB", "admissionNo": "799", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/799.jpg"},
  {"id": "st-800", "name": "ABDUL BAAIS N.A", "admissionNo": "800", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/800.jpg"},
  {"id": "st-801", "name": "MUHAMMED PK", "admissionNo": "801", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/801.jpg"},
  {"id": "st-805", "name": "MOHAMMED ASHMIL K A", "admissionNo": "805", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/805.jpg"},
  {"id": "st-806", "name": "MUHAMMED SABITH ALI TM", "admissionNo": "806", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/806.jpg"},
  {"id": "st-807", "name": "MUHAMMED AHMASH K", "admissionNo": "807", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/807.jpg"},
  {"id": "st-809", "name": "MOHAMMED RAZEEN S.P", "admissionNo": "809", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/809.jpg"},
  {"id": "st-812", "name": "HASSAN ZARKASH", "admissionNo": "812", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/812.jpg"},
  {"id": "st-813", "name": "ABDULLA RAMSHAD", "admissionNo": "813", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/813.jpg"},
  {"id": "st-1016", "name": "MUHAMMED KAIF B S", "admissionNo": "1016", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/1016.jpg"},
  {"id": "st-1063", "name": "AHMED RAZA N A", "admissionNo": "1063", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/1063.jpg"},
  {"id": "st-1099", "name": "MUHAMMED SHAFI P", "admissionNo": "1099", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/1099.jpg"},
  {"id": "st-1100", "name": "SHAIN AHAMMAD K", "admissionNo": "1100", "classYearId": "cy-degree2-2627", "cohortId": "cohort-9", "fatherName": "", "classNum": 9, "className": "NAJWA", "isIlm": false, "avatarUrl": "/students/1100.jpg"},
  // ---- Class 10: WIDAD (26 students) ----
  {"id": "st-666", "name": "MOHAMMED AFSAL", "admissionNo": "666", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/666.jpg"},
  {"id": "st-704", "name": "AHAMMED AJEER", "admissionNo": "704", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/704.jpg"},
  {"id": "st-709", "name": "AMEEN ABDULLA", "admissionNo": "709", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/709.jpg"},
  {"id": "st-728", "name": "MOHAMMED ABDUL KHADER NABAVI E A", "admissionNo": "728", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/728.jpg"},
  {"id": "st-729", "name": "MUHAMMAD K.A", "admissionNo": "729", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/729.jpg"},
  {"id": "st-739", "name": "MOHAMMED SAHEED A.K", "admissionNo": "739", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/739.jpg"},
  {"id": "st-740", "name": "AHMED FAHEEM MA", "admissionNo": "740", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/740.jpg"},
  {"id": "st-747", "name": "MUHAMMAD IBN AHMAD", "admissionNo": "747", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/747.jpg"},
  {"id": "st-749", "name": "MUHAMMED MUJTHABA MK", "admissionNo": "749", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/749.jpg"},
  {"id": "st-754", "name": "MUHAMMED SHAHAN P.S", "admissionNo": "754", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/754.jpg"},
  {"id": "st-755", "name": "MOHAMMED THAJUDDEEN A R P", "admissionNo": "755", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/755.jpg"},
  {"id": "st-757", "name": "RUMAIZALI R IBRAHIM", "admissionNo": "757", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/757.jpg"},
  {"id": "st-762", "name": "AHAMED SHAMMAS C.M", "admissionNo": "762", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/762.jpg"},
  {"id": "st-772", "name": "MUHAMMAD MUSTHAFA K.M", "admissionNo": "772", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/772.jpg"},
  {"id": "st-773", "name": "ABDULLAH MAZIN", "admissionNo": "773", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/773.jpg"},
  {"id": "st-776", "name": "MUHAMMED T A", "admissionNo": "776", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/776.jpg"},
  {"id": "st-777", "name": "MOHAMMED HUSSAIN", "admissionNo": "777", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/777.jpg"},
  {"id": "st-819", "name": "MUHAMMED ZAYAN N.S", "admissionNo": "819", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/819.jpg"},
  {"id": "st-1057", "name": "MUHAMMED SABITH KM", "admissionNo": "1057", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/1057.jpg"},
  {"id": "st-1058", "name": "Sufyan mk", "admissionNo": "1058", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/1058.jpg"},
  {"id": "st-1059", "name": "Abdunnafih", "admissionNo": "1059", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/1059.jpg"},
  {"id": "st-1060", "name": "MUHAMMED SWALIH TA", "admissionNo": "1060", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/1060.jpg"},
  {"id": "st-1061", "name": "MUHAMMED FARZAQ K", "admissionNo": "1061", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/1061.jpg"},
  {"id": "st-1062", "name": "MUHAMMAD NAZAL NAWAS K", "admissionNo": "1062", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/1062.jpg"},
  {"id": "st-1064", "name": "MUHEENUDHEEN MP", "admissionNo": "1064", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/1064.jpg"},
  {"id": "st-1097", "name": "MUHAMMED FARMAN", "admissionNo": "1097", "classYearId": "cy-degree3-2627", "cohortId": "cohort-10", "fatherName": "", "classNum": 10, "className": "WIDAD", "isIlm": false, "avatarUrl": "/students/1097.jpg"},
];


// Lookup helpers
const studentByIdMap = new Map<string, Student>();
const studentByAdNoMap = new Map<string, Student>();

allStudents.forEach(s => {
  studentByIdMap.set(s.id, s);
  studentByAdNoMap.set(s.admissionNo, s);
});

export const getStudent = (idOrAdNo: string): Student | undefined => {
  if (!idOrAdNo) return undefined;
  return studentByIdMap.get(idOrAdNo) || studentByAdNoMap.get(idOrAdNo);
};

export const findStudentByAdmissionNo = (admissionNo: string): Student | undefined => {
  if (!admissionNo) return undefined;
  return studentByAdNoMap.get(admissionNo.trim());
};

export const getStudentsByClass = (classYearId: string): Student[] => {
  return allStudents.filter(s => s.classYearId === classYearId);
};

export const getStudentsByClassNum = (classNum: number): Student[] => {
  return allStudents.filter(s => s.classNum === classNum);
};

export const ilmStudents = allStudents.filter(s => s.isIlm);
export const nonIlmStudents = allStudents.filter(s => !s.isIlm);
export const vahdaStudents = allStudents.filter(s => s.classNum === 4);
export const alfaStudents = allStudents.filter(s => s.classNum === 6);
export const suffaStudents = allStudents.filter(s => s.classNum === 3);
export const sidraStudents = allStudents.filter(s => s.classNum === 2);
export const sadaStudents = allStudents.filter(s => s.classNum === 1);
export const hudaStudents = allStudents.filter(s => s.classNum === 5);
export const safwaStudents = allStudents.filter(s => s.classNum === 7);
export const thufaStudents = allStudents.filter(s => s.classNum === 8);
export const najwaStudents = allStudents.filter(s => s.classNum === 9);
export const widadStudents = allStudents.filter(s => s.classNum === 10);

// VAHDA lookup dictionary for backward compatibility with meeting reports
export const vahdaLookup: Record<string, Student> = {};
vahdaStudents.forEach(s => { vahdaLookup[s.id] = s; });

export const getStudentPhotoUrl = (admissionNo: string): string => {
  return `/students/${admissionNo.trim()}.jpg`;
};

