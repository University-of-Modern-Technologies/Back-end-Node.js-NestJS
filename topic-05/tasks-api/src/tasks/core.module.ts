import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [forwardRef(() => ReportsModule)],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksCoreModule {}
