import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { Task } from './task.entity';

@Entity('task_details')
export class TaskDetail {
  @PrimaryColumn('uuid')
  taskId: string;

  @ApiProperty({ example: 'Детальний опис того, що треба зробити' })
  @Column({ type: 'text' })
  description: string;

  @ApiPropertyOptional({
    example: 'https://example.com/materials',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  materialsUrl: string | null;

  @OneToOne(() => Task, (task) => task.detail, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task;
}
