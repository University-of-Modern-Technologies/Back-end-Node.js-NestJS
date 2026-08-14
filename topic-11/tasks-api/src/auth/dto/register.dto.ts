import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'krabaton' })
  @IsString()
  @Length(3, 32)
  username: string;

  @ApiProperty({ example: 'krabaton@example.com' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: 'super-secret', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;
}
