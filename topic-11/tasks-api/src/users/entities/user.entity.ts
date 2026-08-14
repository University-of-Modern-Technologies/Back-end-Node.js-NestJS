import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserRole } from '../user-role.enum';

@Entity('users')
export class User {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'krabaton' })
  @Column({ type: 'varchar', length: 32, unique: true })
  username: string;

  @ApiProperty({ example: 'krabaton@example.com' })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  passwordHash: string;

  @ApiProperty({ example: '2026-07-16T10:30:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ enum: UserRole, example: UserRole.User })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;
}
