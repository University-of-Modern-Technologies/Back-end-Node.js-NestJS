import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { TaskDetail } from './entities/task-detail.entity';
import { CategoriesModule } from '../categories/categories.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskDetail]),
    CategoriesModule,
    TagsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
