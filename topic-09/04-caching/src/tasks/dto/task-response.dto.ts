import { ApiProperty } from '@nestjs/swagger';

export class TaskDetailResponseDto {
  @ApiProperty({ example: 'встигнути до вечора' })
  description: string;

  @ApiProperty({ example: 3 })
  priority: number;
}

export class CategoryResponseDto {
  @ApiProperty({ example: '6a6752d18f52d42265094273' })
  _id: string;

  @ApiProperty({ example: 'Побут' })
  name: string;
}

export class TaskResponseDto {
  @ApiProperty({ example: '6a669fc84b88aad9374c6407' })
  _id: string;

  @ApiProperty({ example: 'Прибрати в кімнаті' })
  title: string;

  @ApiProperty({ example: false })
  done: boolean;

  @ApiProperty({ type: [String], example: ['побут', 'дім'] })
  tags: string[];

  @ApiProperty({ type: TaskDetailResponseDto })
  detail: TaskDetailResponseDto;

  @ApiProperty({ type: CategoryResponseDto })
  category: CategoryResponseDto;

  @ApiProperty({ example: '2026-07-27T00:01:12.458Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-07-27T00:01:12.458Z' })
  updatedAt: string;
}
