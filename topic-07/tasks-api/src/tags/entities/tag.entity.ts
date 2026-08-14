import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Task } from '../../tasks/entities/task.entity';

@Entity('tags')
export class Tag {
  @ApiProperty({ example: '7d1f9a3c-8e2b-4f6a-b1d4-3c5e7a9f0b2d' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'терміново' })
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @ManyToMany(() => Task, (task) => task.tags)
  tasks?: Task[];
}
