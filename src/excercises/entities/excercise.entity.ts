import { Workout } from 'src/workout/entities/workout.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Excercise {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  muscle: string;

  @Column()
  equipment: string;

  @Column()
  difficulty: string;

  @Column()
  instructions: string;

  @Column()
  video: string;

  @ManyToMany(() => Workout, (workout) => workout.exercises)
  workouts: Workout[];
}
