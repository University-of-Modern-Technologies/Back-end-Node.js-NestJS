import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  ArrayUnique,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsObject,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { TaskDetailDto } from './task-detail.dto';

export class CreateTaskDto {
  @ApiProperty({ example: 'Купити каву', description: 'Заголовок завдання' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: '9c1b6e2a-5f3d-4a71-9b6c-2d84f0a1c7e5',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string | null;

  @ApiPropertyOptional({
    example: ['7d1f9a3c-8e2b-4f6a-b1d4-3c5e7a9f0b2d'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  tagIds?: string[];

  @ApiPropertyOptional({ type: () => TaskDetailDto })
  @ValidateIf((_, value) => value !== undefined)
  @IsObject()
  @ValidateNested()
  @Type(() => TaskDetailDto)
  detail?: TaskDetailDto;
}
