import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@ApiTags('workouts')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @ApiOperation({ summary: 'Create a new workout' })
  @ApiResponse({ status: 201, description: 'Workout created successfully' })
  @Post()
  create(@Body() workoutData: CreateWorkoutDto) {
    return this.workoutService.create(workoutData);
  }

  @ApiOperation({ summary: 'Get workout by ID' })
  @ApiParam({ name: 'id', description: 'ID of the workout' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutService.findOne(id);
  }

  @ApiOperation({ summary: 'Get all workouts' })
  @ApiResponse({ status: 200, description: 'List of workouts' })
  @Get()
  findAll() {
    return this.workoutService.findAll();
  }
}
