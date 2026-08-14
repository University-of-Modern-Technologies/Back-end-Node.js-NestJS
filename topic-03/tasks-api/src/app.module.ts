import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { RequestContextService } from './request-context.service';
import {
  TASKS_CONFIG,
  REQUESTED_PAGE_SIZE,
  type TasksConfig,
} from './tasks/tasks.config';

@Module({
  imports: [],
  controllers: [AppController, TasksController],
  providers: [
    AppService,
    TasksService,
    RequestContextService,
    {
      provide: REQUESTED_PAGE_SIZE,
      useValue: 200,
    },
    {
      provide: TASKS_CONFIG,
      useFactory: async (requestedPageSize: number): Promise<TasksConfig> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { maxPageSize: Math.min(requestedPageSize, 100) };
      },
      inject: [REQUESTED_PAGE_SIZE],
    },
  ],
})
export class AppModule {}
