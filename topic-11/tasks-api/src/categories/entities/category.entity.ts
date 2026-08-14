import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Task } from '../../tasks/entities/task.entity';

@Entity('categories')
export class Category {
  @ApiProperty({ example: '9c1b6e2a-5f3d-4a71-9b6c-2d84f0a1c7e5' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Робота' })
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ApiPropertyOptional({ example: 'Робочі задачі та зустрічі', nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string | null;

  @OneToMany(() => Task, (task) => task.category)
  tasks?: Task[];
}
