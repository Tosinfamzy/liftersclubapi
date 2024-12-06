import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
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

  async createWorkoutWithExercises(
    createWorkoutDto: CreateWorkoutDto,
    exerciseIds: number[],
  ): Promise<Workout> {
    const workout = this.workoutRepository.create({
      ...createWorkoutDto,
      date: new Date(createWorkoutDto.date),
    });

    const exercises = await this.excerciseRepository.findByIds(exerciseIds);
    if (exercises.length !== exerciseIds.length) {
      throw new NotFoundException('One or more exercises not found');
    }

    workout.exercises = exercises;
    return this.workoutRepository.save(workout);
  }

  async createEmptyWorkout(
    createWorkoutDto: CreateWorkoutDto,
  ): Promise<Workout> {
    const workout = this.workoutRepository.create({
      ...createWorkoutDto,
      date: new Date(createWorkoutDto.date),
      exercises: [],
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

  async update(
    id: string,
    updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<Workout> {
    const workout = await this.workoutRepository.preload({
      id,
      ...updateWorkoutDto,
    });

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    return this.workoutRepository.save(workout);
  }

  async remove(id: string): Promise<void> {
    const workout = await this.findOne(id);
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    await this.workoutRepository.remove(workout);
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

  async addExercisesToWorkout(
    workoutId: string,
    exerciseIds: number[],
  ): Promise<Workout> {
    const workout = await this.findOne(workoutId);
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${workoutId} not found`);
    }

    const exercises = await this.excerciseRepository.findByIds(exerciseIds);
    if (exercises.length !== exerciseIds.length) {
      throw new NotFoundException('One or more exercises not found');
    }

    workout.exercises.push(...exercises);
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

    const exerciseIndex = workout.exercises.findIndex(
      (ex) => ex.id === exerciseId,
    );
    if (exerciseIndex === -1) {
      throw new NotFoundException(
        `Exercise with ID ${exerciseId} not found in workout`,
      );
    }

    const updatedExercise = await this.excerciseRepository.preload({
      id: exerciseId,
      ...updateExcerciseDto,
    });

    if (!updatedExercise) {
      throw new NotFoundException(`Exercise with ID ${exerciseId} not found`);
    }

    workout.exercises[exerciseIndex] = updatedExercise;
    await this.workoutRepository.save(workout);

    return this.findOne(workoutId);
  }

  async removeExerciseFromWorkout(
    workoutId: string,
    exerciseId: number,
  ): Promise<Workout> {
    const workout = await this.findOne(workoutId);
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${workoutId} not found`);
    }

    const exerciseIndex = workout.exercises.findIndex(
      (ex) => ex.id === exerciseId,
    );
    if (exerciseIndex === -1) {
      throw new NotFoundException(
        `Exercise with ID ${exerciseId} not found in workout`,
      );
    }

    workout.exercises.splice(exerciseIndex, 1);
    await this.workoutRepository.save(workout);

    return this.findOne(workoutId);
  }
}
