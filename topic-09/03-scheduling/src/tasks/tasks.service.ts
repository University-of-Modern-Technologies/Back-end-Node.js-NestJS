import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  removeExpiredSessions() {
    this.logger.log('Видаляю прострочені сесії');
  }

  @Cron('0 8 * * 1', { timeZone: 'Europe/Kyiv' })
  sendWeeklyReport() {
    this.logger.log('Надсилаю щотижневий звіт');
  }

  @Cron('*/5 * * * * *', { name: 'queue-check' })
  checkQueue() {
    this.logger.log('Перевіряю чергу');
  }

  @Timeout(3000)
  warmUpCache() {
    this.logger.log('Прогріваю кеш');
  }

  @Interval(7000)
  pingExternalService() {
    this.logger.log('Перевіряю доступність зовнішнього сервісу');
  }
}
