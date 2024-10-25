import { User } from 'src/user/entities/user.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => User, (user) => user.workouts, { cascade: true })
  user: User;

  @ManyToMany(() => Excercise)
  @JoinTable()
  exercises: Excercise[];
}
