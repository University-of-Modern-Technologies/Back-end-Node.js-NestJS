import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'krabaton' })
  @IsString()
  @Length(3, 32)
  username: string;

  @ApiProperty({ example: 'super-secret', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;
}
