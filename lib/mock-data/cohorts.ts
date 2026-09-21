import { Cohort, ClassYear } from '../types';

export const cohorts: Cohort[] = [
  { id: 'cohort-1', campusId: 'campus-mdia', createdYear: '2026', notes: "SA'DA" },
  { id: 'cohort-2', campusId: 'campus-mdia', createdYear: '2025', notes: 'SIDRA' },
  { id: 'cohort-3', campusId: 'campus-mdia', createdYear: '2024', notes: 'SUFFA' },
  { id: 'cohort-4', campusId: 'campus-mdia', createdYear: '2023', notes: 'VAHDA' },
  { id: 'cohort-5', campusId: 'campus-mdia', createdYear: '2022', notes: 'HUDA' },
  { id: 'cohort-6', campusId: 'campus-mdia', createdYear: '2021', notes: 'ALFA' },
  { id: 'cohort-7', campusId: 'campus-mdia', createdYear: '2020', notes: 'SAFWA' },
  { id: 'cohort-8', campusId: 'campus-mdia', createdYear: '2019', notes: 'THUFA' },
  { id: 'cohort-9', campusId: 'campus-mdia', createdYear: '2018', notes: 'NAJWA' },
  { id: 'cohort-10', campusId: 'campus-mdia', createdYear: '2017', notes: 'WIDAD' },
];

// Each ClassYear record maps cohort + academic year → display name + level
export const classYears: ClassYear[] = [
  // Current academic year 2026-27 (All 10 Academy Classes by Official Names)
  { id: 'cy-sada-2627',   cohortId: 'cohort-1', academicYearId: 'ay-2026-27', displayName: "SA'DA",  level: 1, ilmEnabled: true },
  { id: 'cy-sidra-2627',  cohortId: 'cohort-2', academicYearId: 'ay-2026-27', displayName: 'SIDRA',  level: 2, ilmEnabled: true },
  { id: 'cy-suffa-2627',  cohortId: 'cohort-3', academicYearId: 'ay-2026-27', displayName: 'SUFFA',  level: 3, ilmEnabled: true },
  { id: 'cy-vahda-2627',  cohortId: 'cohort-4', academicYearId: 'ay-2026-27', displayName: 'VAHDA',  level: 4, ilmEnabled: true },
  { id: 'cy-class5-2627', cohortId: 'cohort-5', academicYearId: 'ay-2026-27', displayName: 'HUDA',   level: 5, ilmEnabled: false },
  { id: 'cy-alfa-2627',   cohortId: 'cohort-6', academicYearId: 'ay-2026-27', displayName: 'ALFA',   level: 6, ilmEnabled: true },
  { id: 'cy-class7-2627', cohortId: 'cohort-7', academicYearId: 'ay-2026-27', displayName: 'SAFWA',  level: 7, ilmEnabled: false },
  { id: 'cy-degree1-2627',cohortId: 'cohort-8', academicYearId: 'ay-2026-27', displayName: 'THUFA',  level: 8, ilmEnabled: false },
  { id: 'cy-degree2-2627',cohortId: 'cohort-9', academicYearId: 'ay-2026-27', displayName: 'NAJWA',  level: 9, ilmEnabled: false },
  { id: 'cy-degree3-2627',cohortId: 'cohort-10', academicYearId: 'ay-2026-27', displayName: 'WIDAD', level: 10, ilmEnabled: false },

  // Academic year 2025-26 progression
  { id: 'cy-sidra-2526', cohortId: 'cohort-3', academicYearId: 'ay-2025-26', displayName: 'SIDRA', level: 2, ilmEnabled: true },
  { id: 'cy-suffa-2526', cohortId: 'cohort-4', academicYearId: 'ay-2025-26', displayName: 'SUFFA', level: 3, ilmEnabled: true },
  { id: 'cy-vahda-2526', cohortId: 'cohort-5', academicYearId: 'ay-2025-26', displayName: 'VAHDA', level: 4, ilmEnabled: true },
  { id: 'cy-huda-2526',  cohortId: 'cohort-6', academicYearId: 'ay-2025-26', displayName: 'HUDA',  level: 5, ilmEnabled: false },
  { id: 'cy-alfa-2526',  cohortId: 'cohort-7', academicYearId: 'ay-2025-26', displayName: 'ALFA',  level: 6, ilmEnabled: true },
  { id: 'cy-safwa-2526', cohortId: 'cohort-8', academicYearId: 'ay-2025-26', displayName: 'SAFWA', level: 7, ilmEnabled: false },
  { id: 'cy-thufa-2526', cohortId: 'cohort-9', academicYearId: 'ay-2025-26', displayName: 'THUFA', level: 8, ilmEnabled: false },
  { id: 'cy-najwa-2526', cohortId: 'cohort-10', academicYearId: 'ay-2025-26', displayName: 'NAJWA', level: 9, ilmEnabled: false },

  // Academic year 2024-25 progression
  { id: 'cy-sidra-2425', cohortId: 'cohort-4', academicYearId: 'ay-2024-25', displayName: 'SIDRA', level: 2, ilmEnabled: true },
  { id: 'cy-suffa-2425', cohortId: 'cohort-5', academicYearId: 'ay-2024-25', displayName: 'SUFFA', level: 3, ilmEnabled: true },
  { id: 'cy-vahda-2425', cohortId: 'cohort-6', academicYearId: 'ay-2024-25', displayName: 'VAHDA', level: 4, ilmEnabled: true },
  { id: 'cy-alfa-2425',  cohortId: 'cohort-8', academicYearId: 'ay-2024-25', displayName: 'ALFA',  level: 6, ilmEnabled: true },
];

export const currentClassYears = classYears.filter(cy => cy.academicYearId === 'ay-2026-27');
export const ilmClassYears = currentClassYears.filter(cy => cy.ilmEnabled);

export const getClassYear = (id: string) =>
  classYears.find(cy => cy.id === id || (id === 'cy-level5-2627' && cy.id === 'cy-class5-2627'));
export const getClassYearByName = (name: string, ayId = 'ay-2026-27') =>
  classYears.find(cy => cy.displayName === name && cy.academicYearId === ayId);

// Cohort history — for the Admin Cohorts & Class Names page
export type CohortHistory = {
  cohort: Cohort;
  years: Array<{ academicYearId: string; label: string; displayName: string; level: number; ilmEnabled: boolean }>;
};

export function getCohortHistory(): CohortHistory[] {
  const { academicYears } = require('./academic-years');
  return cohorts.map(cohort => ({
    cohort,
    years: academicYears.map((ay: { id: string; label: string }) => {
      const cy = classYears.find(c => c.cohortId === cohort.id && c.academicYearId === ay.id);
      return {
        academicYearId: ay.id,
        label: ay.label,
        displayName: cy?.displayName ?? '—',
        level: cy?.level ?? 0,
        ilmEnabled: cy?.ilmEnabled ?? false,
      };
    }),
  }));
}
