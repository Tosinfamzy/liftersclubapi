import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { UpdateExcerciseDto } from 'src/excercises/dto/update-excercise.dto';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
    @InjectRepository(Excercise)
    private excerciseRepository: Repository<Excercise>,
  ) {}

  async create(workoutData: CreateWorkoutDto): Promise<Workout> {
    const workout = this.workoutRepository.create({
      ...workoutData,
      date: new Date(workoutData.date), // Convert string to Date object
    });
    return this.workoutRepository.save(workout);
  }

  async findOne(id: string): Promise<Workout> {
    return this.workoutRepository.findOne({
      where: { id },
      relations: ['exercises'],
    });
  }

  async findAll(): Promise<Workout[]> {
    return this.workoutRepository.find();
  }

  async addExerciseToWorkout(
    workoutId: string,
    exerciseId: number,
  ): Promise<Workout> {
    const workout = await this.findOne(workoutId);
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${workoutId} not found`);
    }

    const exercise = await this.excerciseRepository.findOne({
      where: { id: exerciseId },
    });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${exerciseId} not found`);
    }

    workout.exercises.push(exercise);
    return this.workoutRepository.save(workout);
  }

  async updateExerciseInWorkout(
    workoutId: string,
    exerciseId: number,
    updateExcerciseDto: UpdateExcerciseDto,
  ): Promise<Workout> {
    const workout = await this.findOne(workoutId);
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${workoutId} not found`);
    }

    const exercise = await this.excerciseRepository.findOne({
      where: { id: exerciseId },
    });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${exerciseId} not found`);
    }

    const updatedExercise = await this.excerciseRepository.preload({
      id: exerciseId,
      ...updateExcerciseDto,
    });

    if (!updatedExercise) {
      throw new NotFoundException(`Exercise with ID ${exerciseId} not found`);
    }

    await this.excerciseRepository.save(updatedExercise);

    return this.findOne(workoutId);
  }
}
