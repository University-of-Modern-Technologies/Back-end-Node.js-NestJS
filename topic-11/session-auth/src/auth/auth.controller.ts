import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SessionGuard } from './session.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiConflictResponse({ description: 'Користувач з таким іменем уже існує' })
  async register(@Body() dto: RegisterDto): Promise<UserResponseDto> {
    const user = await this.authService.register(dto);

    return { id: user.id, username: user.username, createdAt: user.createdAt };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserResponseDto })
  @ApiUnauthorizedResponse({
    description: 'Неправильне імʼя користувача або пароль',
  })
  async login(
    @Body() dto: LoginDto,
    @Req() request: Request,
  ): Promise<UserResponseDto> {
    const user = await this.authService.validateUser(dto);

    request.session.userId = user.id;

    return { id: user.id, username: user.username, createdAt: user.createdAt };
  }

  @Get('me')
  @UseGuards(SessionGuard)
  @ApiOkResponse({ type: UserResponseDto })
  @ApiUnauthorizedResponse({ description: 'Потрібна автентифікація' })
  me(@Req() request: Request): UserResponseDto {
    const user = request.currentUser;

    return { id: user.id, username: user.username, createdAt: user.createdAt };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(SessionGuard)
  @ApiNoContentResponse({ description: 'Сесію завершено' })
  @ApiUnauthorizedResponse({ description: 'Потрібна автентифікація' })
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      request.session.destroy((error) => (error ? reject(error) : resolve()));
    });

    response.clearCookie('connect.sid');
  }
}
