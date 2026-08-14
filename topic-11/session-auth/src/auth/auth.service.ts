import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: RegisterDto): Promise<User> {
    const existing = await this.usersService.findByUsername(dto.username);

    if (existing) {
      throw new ConflictException(`Користувач ${dto.username} вже існує`);
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    return this.usersService.create(dto.username, passwordHash);
  }

  async validateUser(dto: LoginDto): Promise<User> {
    const user = await this.usersService.findByUsername(dto.username);

    if (!user) {
      throw new UnauthorizedException(
        'Неправильне імʼя користувача або пароль',
      );
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Неправильне імʼя користувача або пароль',
      );
    }

    return user;
  }
}
