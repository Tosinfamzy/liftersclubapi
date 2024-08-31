export const MUSCLE = {
  ABS: 'abs',
  adductors: 'adductors',
  abductors: 'abductors',
  biceps: 'biceps',
  calves: 'calves',
  chest: 'chest',
  glutes: 'glutes',
  hamstrings: 'hamstrings',
  lats: 'lats',
  quads: 'quads',
  traps: 'traps',
  triceps: 'triceps',
};
export type MUSCLE = (typeof MUSCLE)[keyof typeof MUSCLE];
