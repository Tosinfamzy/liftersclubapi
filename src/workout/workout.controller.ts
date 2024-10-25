import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateExcerciseDto } from 'src/excercises/dto/update-excercise.dto';

@ApiTags('Workouts')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new workout' })
  @ApiResponse({ status: 201, description: 'Workout created successfully' })
  @Post()
  create(@Body() workoutData: CreateWorkoutDto) {
    return this.workoutService.create(workoutData);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get workout by ID' })
  @ApiParam({ name: 'id', description: 'ID of the workout' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all workouts' })
  @ApiResponse({ status: 200, description: 'List of workouts' })
  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add an exercise to a workout' })
  @ApiParam({ name: 'workoutId', description: 'ID of the workout' })
  @ApiParam({ name: 'exerciseId', description: 'ID of the exercise' })
  @Post(':workoutId/exercises/:exerciseId')
  addExerciseToWorkout(
    @Param('workoutId') workoutId: string,
    @Param('exerciseId') exerciseId: number,
  ) {
    return this.workoutService.addExerciseToWorkout(workoutId, exerciseId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update an exercise in a workout' })
  @ApiParam({ name: 'workoutId', description: 'ID of the workout' })
  @ApiParam({ name: 'exerciseId', description: 'ID of the exercise' })
  @Patch(':workoutId/exercises/:exerciseId')
  updateExerciseInWorkout(
    @Param('workoutId') workoutId: string,
    @Param('exerciseId') exerciseId: number,
    @Body() updateExcerciseDto: UpdateExcerciseDto,
  ) {
    return this.workoutService.updateExerciseInWorkout(
      workoutId,
      exerciseId,
      updateExcerciseDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove an exercise from a workout' })
  @ApiParam({ name: 'workoutId', description: 'ID of the workout' })
  @ApiParam({ name: 'exerciseId', description: 'ID of the exercise' })
  @Delete(':workoutId/exercises/:exerciseId')
  removeExerciseFromWorkout(
    @Param('workoutId') workoutId: string,
    @Param('exerciseId') exerciseId: number,
  ) {
    return this.workoutService.removeExerciseFromWorkout(workoutId, exerciseId);
  }
}
