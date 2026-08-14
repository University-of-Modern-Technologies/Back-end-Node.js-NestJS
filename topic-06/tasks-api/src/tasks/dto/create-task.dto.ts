import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Купити каву', description: 'Заголовок завдання' })
  @IsString()
  @IsNotEmpty()
  title: string;
}
