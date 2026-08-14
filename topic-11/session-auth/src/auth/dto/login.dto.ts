import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'krabaton' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'super-secret' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
