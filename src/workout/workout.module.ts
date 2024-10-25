import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workout]),
    TypeOrmModule.forFeature([Excercise]),
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
