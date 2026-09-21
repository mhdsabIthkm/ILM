import { User } from '../types';

export const mockUsers: (User & { associatedName?: string })[] = [
  {
    id: 'user-admin',
    name: 'Ustadh Abdullah',
    email: 'admin@mdia.edu',
    role: 'admin',
    associatedName: 'Campus Administrator',
  },
  {
    id: 'user-teacher-vahda',
    name: 'Ustadh Ibrahim',
    email: 'ibrahim@mdia.edu',
    role: 'admin',
    associatedName: 'Evaluator · VAHDA, SUFFA',
  },
  {
    id: 'user-teacher-suffa',
    name: 'Ustadha Fatima',
    email: 'fatima@mdia.edu',
    role: 'admin',
    associatedName: 'Evaluator · SA\'DA, SIDRA',
  },
  {
    id: 'user-student-nafih',
    name: 'Nafih',
    email: 'nafih@student.mdia.edu',
    role: 'student',
    associatedName: 'VAHDA (Adm. 1614)',
  },
  {
    id: 'user-parent-nafih',
    name: "Nafih's Parent",
    email: 'parent.nafih@gmail.com',
    role: 'parent',
    childrenIds: ['vahda-nafih'],
    associatedName: 'Nafih (VAHDA)',
  },
];

export const getUserById = (id: string) => mockUsers.find(u => u.id === id);
