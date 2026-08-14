import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';

import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { TaskDetail } from './task-detail.entity';

@Entity('tasks')
export class Task {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Купити каву' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', default: false })
  done: boolean;

  @ApiProperty({ example: '2026-07-16T10:30:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiPropertyOptional({ type: () => Category, nullable: true })
  @ManyToOne(() => Category, (category) => category.tasks, {
    nullable: true,
    onDelete: 'SET NULL',
    // eager: true,
  })
  // category: Promise<Category | null>;
  category?: Category | null;

  @ApiPropertyOptional({ type: () => [Tag] })
  @ManyToMany(() => Tag, (tag) => tag.tasks)
  @JoinTable({ name: 'task_tags' })
  tags?: Tag[];

  @ApiPropertyOptional({ type: () => TaskDetail, nullable: true })
  @OneToOne(() => TaskDetail, (detail) => detail.task, {
    cascade: true,
    nullable: true,
  })
  detail?: TaskDetail | null;
}
