export const MUSCLE = {
  ABS: 'abs',
  ADDUCTORS: 'adductors',
  ABDUCTORS: 'adductors',
  BICEPS: 'biceps',
  CALVES: 'calves',
  CHEST: 'chest',
  GLUTES: 'glutes',
  HAMSTRING: 'hamstrings',
  LATS: 'lats',
  QUADS: 'quads',
  TRAPS: 'traps',
  TRICEPS: 'triceps',
};
export type MUSCLE = (typeof MUSCLE)[keyof typeof MUSCLE];
