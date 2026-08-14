import { Injectable } from '@nestjs/common';

export const TASKS_CONFIG = 'TASKS_CONFIG';
export const REQUESTED_PAGE_SIZE = 'REQUESTED_PAGE_SIZE';

export interface TasksConfig {
  maxPageSize: number;
}

@Injectable()
export class DefaultTasksConfig implements TasksConfig {
  maxPageSize = 20;
}
