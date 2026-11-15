export const COLORS = {
  B: { label: 'Blue', hex: '#2b6cb0' },
  G: { label: 'Green', hex: '#2f855a' },
  R: { label: 'Red', hex: '#c53030' },
  P: { label: 'Purple', hex: '#6b46c1' },
  W: { label: 'White', hex: '#718096' },
};

export const TYPES = ['Unit', 'Pilot', 'Command', 'Base'];

export const CARDS = [
  { id: 'dom-trooper', name: 'Dom Trooper', color: 'B', type: 'Unit' },
  { id: 're-gz', name: 'Re-GZ', color: 'G', type: 'Unit' },
  { id: 'zeon-gundam', name: 'Zeon Gundam', color: 'R', type: 'Unit' },
  { id: 'akatsuki-shinanju', name: 'Akatsuki Shinanju', color: 'W', type: 'Unit' },
  { id: 'blue-interceptor', name: 'Blue Interceptor', color: 'B', type: 'Unit' },
  { id: 'green-scout-ship', name: 'Green Scout Ship', color: 'G', type: 'Unit' },
  { id: 'red-vanguard', name: 'Red Vanguard', color: 'R', type: 'Unit' },
  { id: 'purple-phantom', name: 'Purple Phantom', color: 'P', type: 'Unit' },
  { id: 'white-guardian', name: 'White Guardian', color: 'W', type: 'Unit' },
  { id: 'blue-pilot-ace', name: 'Blue Pilot Ace', color: 'B', type: 'Pilot' },
  { id: 'red-veteran-pilot', name: 'Red Veteran Pilot', color: 'R', type: 'Pilot' },
  { id: 'red-strike-order', name: 'Red Strike Order', color: 'R', type: 'Command' },
  { id: 'purple-ambush', name: 'Purple Ambush', color: 'P', type: 'Command' },
  { id: 'white-shield-base', name: 'White Shield Base', color: 'W', type: 'Base' },
  { id: 'blue-harbor-base', name: 'Blue Harbor Base', color: 'B', type: 'Base' },
  { id: 'green-forest-base', name: 'Green Forest Base', color: 'G', type: 'Base' },
];

export const cardById = (id) => CARDS.find((c) => c.id === id);
