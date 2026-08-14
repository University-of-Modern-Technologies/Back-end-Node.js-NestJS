import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TaskDetailDto } from './task-detail.dto';

export class CreateTaskDto {
  @ApiProperty({ example: 'Прибрати в кімнаті' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ type: [String], example: ['побут', 'дім'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ type: TaskDetailDto })
  @ValidateNested()
  @Type(() => TaskDetailDto)
  detail: TaskDetailDto;

  @ApiProperty({ example: '656a1f2c8b3e4a1d9c0f1a01' })
  @IsMongoId()
  category: string;
}
