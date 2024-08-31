import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { MUSCLE } from '../../helpers/muscle';
import difficulty from 'src/helpers/difficulty';
import { excerciseType } from 'src/helpers/excerciseType';

export class CreateExcerciseDto {
  @ApiProperty({ description: 'Name of the exercise' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'type of exercise eg Cardio | strength etc' })
  @IsString()
  readonly type: excerciseType;

  @ApiProperty({ description: 'Muscle Group' })
  @IsString()
  readonly muscle: MUSCLE;

  @ApiProperty({ description: 'Name of gym equipment' })
  @IsString()
  readonly equipment: string;

  @ApiProperty({ description: 'Diffculty of exercise' })
  @IsString()
  readonly difficulty: difficulty;

  @ApiProperty({ description: 'How to perform exercise' })
  @IsString()
  @IsOptional()
  readonly instructions?: string;

  @ApiProperty({ description: 'Url to video of excercise' })
  @IsString()
  @IsOptional()
  readonly video?: string;
}
