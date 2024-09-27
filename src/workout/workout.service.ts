import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
  ) {}

  async create(workoutData: CreateWorkoutDto): Promise<Workout> {
    const workout = this.workoutRepository.create({
      ...workoutData,
      date: new Date(workoutData.date), // Convert string to Date object
    });
    return this.workoutRepository.save(workout);
  }

  async findOne(id: string): Promise<Workout> {
    return this.workoutRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Workout[]> {
    return this.workoutRepository.find();
  }
}
