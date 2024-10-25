import difficulty from 'src/helpers/difficulty';
import { excerciseType } from 'src/helpers/excerciseType';
import { MUSCLE } from 'src/helpers/muscle';
import { Workout } from 'src/workout/entities/workout.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Excercise {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: [
      'cardio',
      'olympic_weightlifting',
      'plyometrics',
      'powerlifting',
      'strength',
      'strongman',
    ],
  })
  type: excerciseType;

  @Column({
    type: 'enum',
    enum: [
      'abs',
      'adductors',
      'abductors',
      'biceps',
      'calves',
      'chest',
      'glutes',
      'hamstrings',
      'lats',
      'quads',
      'traps',
      'triceps',
    ],
  })
  muscle: MUSCLE;

  @Column()
  equipment: string;

  @Column({
    type: 'enum',
    enum: ['easy', 'medium', 'hard'],
  })
  difficulty: difficulty;

  @Column()
  instructions: string;

  @Column()
  video: string;

  @ManyToMany(() => Workout, (workout) => workout.exercises)
  workouts: Workout[];
}
