import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';

import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '../common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from '../common/interceptors/wrap-response.interceptor';
import { ItemEntity } from './entities/item.entity';

@Controller('items')
@UseInterceptors(
  LoggingInterceptor,
  WrapResponseInterceptor,
  TimeoutInterceptor,
  ClassSerializerInterceptor,
)
export class ItemsController {
  @Get()
  findAll() {
    return [{ id: 1 }, { id: 2 }];
  }

  @Get('slow')
  async findSlow() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { slow: true };
  }

  @Get('broken')
  findBroken() {
    throw new Error('щось пішло не так');
  }

  @Get('entity')
  findEntity() {
    return new ItemEntity({
      id: 1,
      title: 'Ноутбук',
      internalNote: 'куплено за 100',
    });
  }

  @Get('plain')
  @SerializeOptions({ type: ItemEntity })
  findPlain() {
    return { id: 1, title: 'Ноутбук', internalNote: 'куплено за 100' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }
}
