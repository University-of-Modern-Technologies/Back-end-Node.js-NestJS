import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RefreshTokensService } from './refresh-tokens.service';
import { TokenPair } from './interfaces/token-pair.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, email, password } = registerDto;

    const existingUsername = await this.usersService.findByUsername(username);
    if (existingUsername !== null) {
      throw new ConflictException(`Користувача ${username} вже зареєстровано`);
    }

    const existingEmail = await this.usersService.findByEmail(email);
    if (existingEmail !== null) {
      throw new ConflictException(`Пошту ${email} вже зареєстровано`);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return this.usersService.create({ username, email, passwordHash });
  }

  async login(loginDto: LoginDto): Promise<TokenPair> {
    const { username, password } = loginDto;

    const user = await this.usersService.findByUsername(username);
    if (user === null) {
      throw new UnauthorizedException(
        'Неправильне імʼя користувача або пароль',
      );
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Неправильне імʼя користувача або пароль',
      );
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      role: user.role,
    });
    const refreshToken = await this.refreshTokensService.issue(user.id);

    return { accessToken, refreshToken };
  }

  async refresh(token: string): Promise<TokenPair> {
    const { userId, token: refreshToken } =
      await this.refreshTokensService.rotate(token);

    const user = await this.usersService.findByIdOrFail(userId);

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      role: user.role,
    });

    return { accessToken, refreshToken };
  }

  async logout(token: string): Promise<void> {
    await this.refreshTokensService.revoke(token);
  }
}
