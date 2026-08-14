import { Module, DynamicModule } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

import {
  TASKS_CONFIG,
  REQUESTED_PAGE_SIZE,
  type TasksConfig,
} from './tasks.config';
import { TasksCoreModule } from './core.module';

export interface TasksModuleOptions {
  requestedPageSize: number;
}

@Module({
  controllers: [TasksController],
  exports: [TasksCoreModule],
  imports: [TasksCoreModule],
})
export class TasksModule {
  static forRoot(options: TasksModuleOptions): DynamicModule {
    return {
      module: TasksModule,
      providers: [
        { provide: REQUESTED_PAGE_SIZE, useValue: options.requestedPageSize },
        {
          provide: TASKS_CONFIG,
          useFactory: async (
            requestedPageSize: number,
          ): Promise<TasksConfig> => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return { maxPageSize: Math.min(requestedPageSize, 100) };
          },
          inject: [REQUESTED_PAGE_SIZE],
        },
      ],
    };
  }
}
