import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Request, Response } from 'express';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AccessTokenDto } from './dto/access-token.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { Public } from '../common/decorators/public.decorator';
import { EnvironmentVariables } from '../config/environment-variables';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService<EnvironmentVariables, true>,
  ) {}

  private get refreshCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.config.get('NODE_ENV', { infer: true }) === 'production',
      sameSite: 'strict',
      path: '/auth',
    };
  }

  private setRefreshCookie(response: Response, refreshToken: string): void {
    const ttlDays = this.config.get('REFRESH_TOKEN_TTL_DAYS', { infer: true });

    response.cookie('refreshToken', refreshToken, {
      ...this.refreshCookieOptions,
      maxAge: ttlDays * 24 * 60 * 60 * 1000,
    });
  }

  private extractRefreshToken(request: Request): string {
    const token: unknown = request.cookies?.refreshToken;

    if (typeof token !== 'string') {
      throw new UnauthorizedException('Refresh token відсутній');
    }

    return token;
  }

  @Public()
  @Post('register')
  @ApiCreatedResponse({ type: User })
  @ApiConflictResponse({ description: 'Користувача вже зареєстровано' })
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AccessTokenDto })
  @ApiUnauthorizedResponse({ description: 'Неправильні облікові дані' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AccessTokenDto> {
    const { accessToken, refreshToken } =
      await this.authService.login(loginDto);

    this.setRefreshCookie(response, refreshToken);

    return { accessToken };
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AccessTokenDto })
  @ApiUnauthorizedResponse({ description: 'Refresh token недійсний' })
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AccessTokenDto> {
    const token = this.extractRefreshToken(request);
    const { accessToken, refreshToken } = await this.authService.refresh(token);

    this.setRefreshCookie(response, refreshToken);

    return { accessToken };
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Вихід виконано' })
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const token: unknown = request.cookies?.refreshToken;

    if (typeof token === 'string') {
      await this.authService.logout(token);
    }

    response.clearCookie('refreshToken', this.refreshCookieOptions);
  }
}
