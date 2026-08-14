import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Task } from './tasks/entities/task.entity';
import { Category } from './categories/entities/category.entity';
import { Tag } from './tags/entities/tag.entity';
import { TaskDetail } from './tasks/entities/task-detail.entity';

export default new DataSource({
  type: 'postgres',
  // logging: true,
  uuidExtension: 'pgcrypto',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Task, Category, Tag, TaskDetail],
  migrations: ['src/migrations/*.ts'],
});
