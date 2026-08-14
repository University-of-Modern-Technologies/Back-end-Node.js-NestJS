import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';

export class PaginatedTasksDto {
  @ApiProperty({ type: [Task] })
  items: Task[];

  @ApiProperty({ example: 300, description: 'Загальна кількість задач' })
  total: number;

  @ApiProperty({ example: 1, description: 'Поточна сторінка' })
  page: number;

  @ApiProperty({ example: 20, description: 'Розмір сторінки' })
  limit: number;

  @ApiProperty({ example: 15, description: 'Загальна кількість сторінок' })
  totalPages: number;
}
