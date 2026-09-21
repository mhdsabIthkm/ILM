import { ObservationTag } from '../types';

export const observationTags: ObservationTag[] = [
  // Strengths
  { id: 'str-confidence',   label: 'Confidence',        type: 'strength',     category: 'stage_presence' },
  { id: 'str-fluency',      label: 'Fluency',           type: 'strength',     category: 'delivery' },
  { id: 'str-vocabulary',   label: 'Vocabulary',        type: 'strength',     category: 'language' },
  { id: 'str-clarity',      label: 'Clarity',           type: 'strength',     category: 'delivery' },
  { id: 'str-pronunciation',label: 'Pronunciation',     type: 'strength',     category: 'language' },
  { id: 'str-structure',    label: 'Structure',         type: 'strength',     category: 'content' },
  { id: 'str-eye-contact',  label: 'Eye Contact',       type: 'strength',     category: 'stage_presence' },
  { id: 'str-engagement',   label: 'Audience Engagement', type: 'strength',  category: 'stage_presence' },
  { id: 'str-timing',       label: 'Good Timing',       type: 'strength',     category: 'time' },
  { id: 'str-preparation',  label: 'Preparation',       type: 'strength',     category: 'content' },

  // Improvements
  { id: 'imp-pausing',      label: 'Pausing',           type: 'improvement',  category: 'delivery' },
  { id: 'imp-grammar',      label: 'Grammar',           type: 'improvement',  category: 'language' },
  { id: 'imp-repetition',   label: 'Repetition',        type: 'improvement',  category: 'content' },
  { id: 'imp-pace',         label: 'Pace',              type: 'improvement',  category: 'delivery' },
  { id: 'imp-clarity',      label: 'Clarity',           type: 'improvement',  category: 'delivery' },
  { id: 'imp-confidence',   label: 'Confidence',        type: 'improvement',  category: 'stage_presence' },
  { id: 'imp-pronunciation',label: 'Pronunciation',     type: 'improvement',  category: 'language' },
  { id: 'imp-structure',    label: 'Structure',         type: 'improvement',  category: 'content' },
  { id: 'imp-eye-contact',  label: 'Eye Contact',       type: 'improvement',  category: 'stage_presence' },
  { id: 'imp-timing',       label: 'Timing',            type: 'improvement',  category: 'time' },
  { id: 'imp-preparation',  label: 'Preparation',       type: 'improvement',  category: 'content' },
];

export const strengthTags = observationTags.filter(t => t.type === 'strength');
export const improvementTags = observationTags.filter(t => t.type === 'improvement');
