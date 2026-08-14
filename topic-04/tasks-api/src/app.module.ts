import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ReportsModule } from './reports/reports.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TasksModule.forRoot({ requestedPageSize: 200 }),
    ReportsModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
