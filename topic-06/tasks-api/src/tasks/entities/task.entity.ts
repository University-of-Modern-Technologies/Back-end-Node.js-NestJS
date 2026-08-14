import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
