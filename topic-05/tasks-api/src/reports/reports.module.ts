import { Module, forwardRef } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { TasksCoreModule } from '../tasks/core.module';

@Module({
  imports: [forwardRef(() => TasksCoreModule)],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
