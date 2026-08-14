import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { requestTime } from './common/middleware/request-time.middleware';
import { ItemsController } from './items/items.controller';
import { apiKey } from './common/middleware/api-key.middleware';

@Module({
  imports: [],
  controllers: [AppController, ItemsController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .exclude({ path: 'items/:id', method: RequestMethod.GET })
  //     .forRoutes(ItemsController);
  //   consumer
  //     .apply(requestTime)
  //     .forRoutes({ path: 'items', method: RequestMethod.POST });
  //   consumer.apply(apiKey).forRoutes(ItemsController);
  // }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(ItemsController);
  }
}
