import { AcademicYear } from '../types';

export const academicYears: AcademicYear[] = [
  {
    id: 'ay-2024-25',
    label: '2024–25',
    startDate: '2024-06-01',
    endDate: '2025-03-31',
    isCurrent: false,
  },
  {
    id: 'ay-2025-26',
    label: '2025–26',
    startDate: '2025-06-01',
    endDate: '2026-03-31',
    isCurrent: false,
  },
  {
    id: 'ay-2026-27',
    label: '2026–27',
    startDate: '2026-06-01',
    endDate: '2027-03-31',
    isCurrent: true,
  },
];

export const currentAcademicYear = academicYears.find(y => y.isCurrent)!;
