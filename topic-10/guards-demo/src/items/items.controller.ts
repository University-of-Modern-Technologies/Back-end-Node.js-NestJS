import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@Controller('items')
export class ItemsController {
  @Get()
  @Public()
  findAll() {
    console.log('handler: findAll');
    return [{ id: 1 }, { id: 2 }];
  }

  @Post()
  create(@Body() body: unknown) {
    console.log('handler: create');
    return body;
  }
}
