import { TimingRule } from '../types';

export const timingRules: TimingRule[] = [
  { id: 'tr-qirath',          roleId: 'role-qirath',          activityLabel: "QIRA'TH",               defaultMinutes: 3,  isEditable: true },
  { id: 'tr-dua',             roleId: 'role-dua',             activityLabel: 'Dua',                    defaultMinutes: 2,  isEditable: true },
  { id: 'tr-welcome',         roleId: 'role-welcome',         activityLabel: 'Welcome Speech',         defaultMinutes: 3,  isEditable: true },
  { id: 'tr-inauguration',    roleId: 'role-inauguration',    activityLabel: 'Inauguration',           defaultMinutes: 5,  isEditable: true },
  { id: 'tr-lmod',            roleId: 'role-lmod',            activityLabel: 'LMOD / Theme Introduction', defaultMinutes: 5, isEditable: true },
  { id: 'tr-prepared',        roleId: 'role-prepared-speaker',activityLabel: 'Prepared Speech',        defaultMinutes: 5,  isEditable: true },
  { id: 'tr-tt',              roleId: 'role-tt-speaker',      activityLabel: 'Table Topic Speech',     defaultMinutes: 2,  isEditable: true },
  { id: 'tr-ice-breaking',    roleId: 'role-ice-breaking',    activityLabel: 'Ice Breaking Speech',    defaultMinutes: 5,  isEditable: true },
  { id: 'tr-evaluator',       roleId: 'role-evaluator1',      activityLabel: 'Evaluator Report',       defaultMinutes: 3,  isEditable: true },
  { id: 'tr-grammarian',      roleId: 'role-grammarian',      activityLabel: 'Grammarian Report',      defaultMinutes: 3,  isEditable: true },
  { id: 'tr-ah-counter',      roleId: 'role-ah-counter',      activityLabel: 'Ah Counter Report',      defaultMinutes: 2,  isEditable: true },
  { id: 'tr-ge',              roleId: 'role-general-evaluator',activityLabel: 'General Evaluator Report',defaultMinutes: 4, isEditable: true },
  { id: 'tr-thankyou',        roleId: 'role-thankyou',        activityLabel: 'Thank You Speech',       defaultMinutes: 2,  isEditable: true },
];

export const getTimingForRole = (roleId: string) =>
  timingRules.find(t => t.roleId === roleId)?.defaultMinutes ?? 5;
