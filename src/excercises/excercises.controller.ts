import { Controller, Get, Post, Body, Patch, Query } from '@nestjs/common';
import { ExcercisesService } from './excercises.service';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';

@Controller('excercises')
export class ExcercisesController {
  constructor(private readonly excercisesService: ExcercisesService) {}

  @Post()
  create(@Body() createExcerciseDto: CreateExcerciseDto) {
    return this.excercisesService.create(createExcerciseDto);
  }

  @Get()
  findAll() {
    return this.excercisesService.findAll();
  }

  @Get()
  findOne(@Query('name') name: string) {
    return this.excercisesService.findOne(name);
  }

  @Patch(':name')
  update(
    @Query('name') name: string,
    @Body() updateExcerciseDto: UpdateExcerciseDto,
  ) {
    return this.excercisesService.update(name, updateExcerciseDto);
  }
}
