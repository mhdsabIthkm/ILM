export interface ClassCharacter {
  level: number;
  className: string;
  characterName: string;
  photoUrl: string;
  bgGradient: string;
  badgeColor: string;
}

export const CLASS_CHARACTERS: Record<string, ClassCharacter> = {
  "SA'DA": {
    level: 1,
    className: "SA'DA",
    characterName: 'Bob the Minion',
    photoUrl: '/classes/bob.png',
    bgGradient: 'from-amber-400 to-yellow-500',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  'SIDRA': {
    level: 2,
    className: 'SIDRA',
    characterName: 'Stitch',
    photoUrl: '/classes/stitch.png',
    bgGradient: 'from-blue-600 to-indigo-700',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  'SUFFA': {
    level: 3,
    className: 'SUFFA',
    characterName: 'Baymax',
    photoUrl: '/classes/baymax.png',
    bgGradient: 'from-slate-200 to-rose-200',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
  },
  'VAHDA': {
    level: 4,
    className: 'VAHDA',
    characterName: 'Pikachu',
    photoUrl: '/classes/pikachu.png',
    bgGradient: 'from-amber-300 to-yellow-400',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  'HUDA': {
    level: 5,
    className: 'HUDA',
    characterName: 'Jerry',
    photoUrl: '/classes/jerry.png',
    bgGradient: 'from-orange-400 to-amber-600',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  'ALFA': {
    level: 6,
    className: 'ALFA',
    characterName: 'Po',
    photoUrl: '/classes/po.png',
    bgGradient: 'from-slate-700 to-slate-900',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
  },
  'SAFWA': {
    level: 7,
    className: 'SAFWA',
    characterName: 'Puss in Boots',
    photoUrl: '/classes/puss.png',
    bgGradient: 'from-amber-600 to-red-700',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  'THUFA': {
    level: 8,
    className: 'THUFA',
    characterName: 'Garfield',
    photoUrl: '/classes/garfield.png',
    bgGradient: 'from-orange-500 to-amber-500',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  'NAJWA': {
    level: 9,
    className: 'NAJWA',
    characterName: 'Toothless',
    photoUrl: '/classes/toothless.png',
    bgGradient: 'from-slate-800 to-emerald-950',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  'WIDAD': {
    level: 10,
    className: 'WIDAD',
    characterName: 'WALL-E',
    photoUrl: '/classes/walle.png',
    bgGradient: 'from-yellow-600 to-amber-700',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
};

export function getClassCharacter(classNameOrLevel: string | number | undefined | null): ClassCharacter | null {
  if (classNameOrLevel === undefined || classNameOrLevel === null) return null;
  if (typeof classNameOrLevel === 'number') {
    return Object.values(CLASS_CHARACTERS).find(c => c.level === classNameOrLevel) || null;
  }
  const clean = classNameOrLevel.toUpperCase().trim().replace(/^CLASS\s+/i, '');
  if (CLASS_CHARACTERS[clean]) return CLASS_CHARACTERS[clean];
  
  // match by alias or substring
  for (const [key, val] of Object.entries(CLASS_CHARACTERS)) {
    if (clean.includes(key) || key.includes(clean)) return val;
  }
  return null;
}
