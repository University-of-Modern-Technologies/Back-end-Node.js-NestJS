import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  @Get()
  findAll() {
    console.log('handler: findAll');
    return [{ id: 1 }, { id: 2 }];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('handler: findOne');
    return { id };
  }

  @Post()
  create(@Body() body: unknown) {
    console.log('handler: create');
    return body;
  }
}
