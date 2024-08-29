export class CreateExcerciseDto {
  readonly name: string;

  readonly type: string;

  readonly muscle: string;

  readonly equipment: string;

  readonly difficulty: string;

  readonly instructions?: string;

  readonly video?: string;
}
