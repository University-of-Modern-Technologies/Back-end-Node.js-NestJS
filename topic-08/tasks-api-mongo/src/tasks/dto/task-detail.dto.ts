import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class TaskDetailDto {
  @ApiProperty({ example: 'встигнути до вечора' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 3, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  priority: number;
}
