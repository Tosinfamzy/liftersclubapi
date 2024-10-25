import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
} from '@nestjs/common';
import { ExcercisesService } from './excercises.service';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Excercises')
@Controller('excercises')
export class ExcercisesController {
  constructor(private readonly excercisesService: ExcercisesService) {}

  @ApiOperation({ summary: 'Create a new exercise' })
  @ApiResponse({ status: 201, description: 'Exercise created successfully' })
  @Post()
  create(@Body() createExcerciseDto: CreateExcerciseDto) {
    return this.excercisesService.create(createExcerciseDto);
  }

  @ApiOperation({ summary: 'List all exercises' })
  @ApiResponse({ status: 200, description: 'List of exercises' })
  @Get()
  findAll() {
    return this.excercisesService.findAll();
  }

  @Get()
  findOne(@Query('name') name: string) {
    return this.excercisesService.findOne(name);
  }

  @ApiOperation({ summary: 'Get exercise by name' })
  @ApiParam({ name: 'name', description: 'Name of the exercise' })
  @Get('/:name')
  findByName(@Param('name') name: string) {
    return this.excercisesService.findByName(name);
  }

  @Patch(':name')
  update(
    @Query('name') name: string,
    @Body() updateExcerciseDto: UpdateExcerciseDto,
  ) {
    return this.excercisesService.update(name, updateExcerciseDto);
  }
  @ApiOperation({ summary: 'Get exercises by muscle' })
  @ApiParam({ name: 'muscle', description: 'Muscle group of the exercises' })
  @Get('muscle/:muscle')
  findByMuscle(@Param('muscle') muscle: string) {
    return this.excercisesService.findByMuscle(muscle);
  }
}
