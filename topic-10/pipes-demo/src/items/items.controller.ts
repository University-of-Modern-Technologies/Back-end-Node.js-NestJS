import { Controller, Get, Param } from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';

@Controller('items')
export class ItemsController {
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    console.log('id у handler:', id);
    return { id };
  }
}
