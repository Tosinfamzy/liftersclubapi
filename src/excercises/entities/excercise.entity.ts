import difficulty from 'src/helpers/difficulty';
import { excerciseType } from 'src/helpers/excerciseType';
// import { MUSCLE } from 'src/helpers/muscle';
import { Workout } from 'src/workout/entities/workout.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Excercise {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column({ nullable: true })
  type: excerciseType;

  @Column({ nullable: true })
  muscle: string;

  @Column()
  equipment: string;

  @Column({
    type: 'enum',
    enum: ['easy', 'medium', 'hard'],
  })
  difficulty: difficulty;

  @Column()
  instructions: string;

  @Column({ nullable: true })
  video: string;

  @ManyToMany(() => Workout, (workout) => workout.exercises)
  workouts: Workout[];
}
