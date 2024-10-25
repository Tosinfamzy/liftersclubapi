import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Excercise } from './entities/excercise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExcercisesService {
  constructor(
    @InjectRepository(Excercise)
    private readonly excersiceRepository: Repository<Excercise>,
  ) {}
  create(@Body() createExcerciseDto: CreateExcerciseDto) {
    const exercise = this.excersiceRepository.create(createExcerciseDto);
    return this.excersiceRepository.save(exercise);
  }

  findAll() {
    return this.excersiceRepository.find();
  }

  async findOne(exerciseName: string) {
    const exercise = await this.excersiceRepository.findOne({
      where: { name: exerciseName },
    });
    if (!exercise) {
      throw new NotFoundException(`Exercise does not exist`);
    }
    return exercise;
  }

  async update(
    exerciseName: string,
    @Body() updateExcerciseDto: UpdateExcerciseDto,
  ) {
    const exercise = await this.excersiceRepository.preload({
      name: exerciseName,
      ...updateExcerciseDto,
    });

    if (!exercise) {
      throw new NotFoundException(
        `This exercise does not exist, recheck the inputs`,
      );
    }
    return this.excersiceRepository.save(exercise);
  }

  async findByName(name: string): Promise<Excercise> {
    return this.excersiceRepository.findOne({ where: { name } });
  }
}
