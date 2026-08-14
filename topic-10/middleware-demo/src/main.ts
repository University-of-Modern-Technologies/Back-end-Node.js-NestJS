import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { requestTime } from './common/middleware/request-time.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(requestTime);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
