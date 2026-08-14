import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksCoreModule } from './core.module';

@Module({
  controllers: [TasksController],
  exports: [TasksCoreModule],
  imports: [TasksCoreModule],
})
export class TasksModule {}
