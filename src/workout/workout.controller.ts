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
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@ApiTags('Workouts')
@Controller('workouts')
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
  @ApiOperation({ summary: 'Create a new workout with exercises' })
  @ApiResponse({ status: 201, description: 'Workout created successfully' })
  @Post('with-exercises')
  createWorkoutWithExercises(
    @Body() createWorkoutDto: CreateWorkoutDto,
    @Body('exerciseIds') exerciseIds: number[],
  ) {
    return this.workoutService.createWorkoutWithExercises(
      createWorkoutDto,
      exerciseIds,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create an empty workout' })
  @ApiResponse({
    status: 201,
    description: 'Empty workout created successfully',
  })
  @Post('empty')
  createEmptyWorkout(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.createEmptyWorkout(createWorkoutDto);
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
  @ApiOperation({ summary: 'Update a workout' })
  @ApiParam({ name: 'id', description: 'ID of the workout' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.update(id, updateWorkoutDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a workout' })
  @ApiParam({ name: 'id', description: 'ID of the workout' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add exercises to a workout' })
  @ApiParam({ name: 'id', description: 'ID of the workout' })
  @Post(':id/exercises')
  addExercisesToWorkout(
    @Param('id') id: string,
    @Body('exerciseIds') exerciseIds: number[],
  ) {
    return this.workoutService.addExercisesToWorkout(id, exerciseIds);
  }
}
