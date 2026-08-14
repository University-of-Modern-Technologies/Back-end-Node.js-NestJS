import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Controller('jobs')
export class TasksController {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  @Get()
  findAll() {
    const jobs = this.schedulerRegistry.getCronJobs();

    return [...jobs.entries()].map(([name, job]) => ({
      name,
      running: job.isActive,
      nextRun: job.nextDate().toISO(),
    }));
  }

  @Post(':name/stop')
  stop(@Param('name') name: string) {
    const job = this.getJob(name);
    job.stop();

    return { name, running: job.isActive };
  }

  @Post(':name/start')
  start(@Param('name') name: string) {
    const job = this.getJob(name);
    job.start();

    return { name, running: job.isActive, nextRun: job.nextDate().toISO() };
  }

  private getJob(name: string): CronJob {
    if (!this.schedulerRegistry.doesExist('cron', name)) {
      throw new NotFoundException(`Завдання ${name} не знайдено`);
    }

    return this.schedulerRegistry.getCronJob(name);
  }
}
