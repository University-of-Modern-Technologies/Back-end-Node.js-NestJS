import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';
import { RequestContextService } from '../shared/request-context.service';

@Injectable()
export class ReportsService {
  constructor(
    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,
    private readonly requestContext: RequestContextService,
  ) {}

  summary(): { requestId: string; total: number; done: number } {
    const all = this.tasksService.findAll();
    const done = this.tasksService.findAll(true);
    return {
      requestId: this.requestContext.requestId,
      total: all.length,
      done: done.length,
    };
  }
}
