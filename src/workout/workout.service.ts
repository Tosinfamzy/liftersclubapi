import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
  ) {}

  async create(workoutData: Partial<Workout>): Promise<Workout> {
    const workout = this.workoutRepository.create(workoutData);
    return this.workoutRepository.save(workout);
  }

  async findOne(id: string): Promise<Workout> {
    return this.workoutRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Workout[]> {
    return this.workoutRepository.find();
  }
}
