export const AGENCY_OPTIONS: string[] = [
  'ICE',
  'Police',
  'Sheriff',
  'Border Patrol',
  'Immigration Court',
  'Detention Facility',
  'Unmarked',
  'Military',
];

export const AGENCY_GRADIENTS: Record<string, Record<number, string>> = {
  ICE: {
    0.2: 'rgba(0, 255, 255, 0.2)',
    0.4: '#00ffff',
    0.8: '#ffffff',
  },
  Police: {
    0.2: 'rgba(0, 255, 0, 0.2)',
    0.4: '#00ff00',
    0.8: '#ffffff',
  },
  Sheriff: {
    0.2: 'rgba(255, 255, 0, 0.2)',
    0.4: '#ffff00',
    0.8: '#ffffff',
  },
  'Border Patrol': {
    0.2: 'rgba(255, 102, 0, 0.2)',
    0.4: '#ff6600',
    0.8: '#ffffff',
  },
  'Immigration Court': {
    0.2: 'rgba(255, 0, 255, 0.2)',
    0.4: '#ff00ff',
    0.8: '#ffffff',
  },
  'Detention Facility': {
    0.2: 'rgba(255, 0, 0, 0.2)',
    0.4: '#ff0000',
    0.8: '#ffffff',
  },
  Unmarked: {
    0.2: 'rgba(180, 180, 180, 0.2)',
    0.4: '#dddddd',
    0.8: '#ffffff',
  },
  Military: {
    0.2: 'rgba(255, 165, 0, 0.2)',
    0.4: '#ffa500',
    0.8: '#ffffff',
  },
  other: {
    0.2: 'rgba(128, 128, 128, 0.2)',
    0.4: '#888888',
    0.8: '#ffffff',
  },
};

export const agencyColors: Record<string, string> = {
  ICE: 'bg-cyan-700',
  Police: 'bg-green-700',
  Sheriff: 'bg-yellow-700',
  'Border Patrol': 'bg-orange-700',
  'Immigration Court': 'bg-pink-600',
  'Detention Facility': 'bg-red-700',
  Unmarked: 'bg-gray-700',
  Military: 'bg-amber-700',
  Other: 'bg-slate-600',
};
