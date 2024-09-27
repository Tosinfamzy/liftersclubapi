import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutDto {
  @ApiProperty({ example: 'Chest Day', description: 'The name of the workout' })
  name: string;

  @ApiProperty({
    example: '2024-01-01',
    description: 'The date of the workout',
  })
  date: string;
}
