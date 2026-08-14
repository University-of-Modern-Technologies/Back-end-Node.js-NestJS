import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from './user-role.enum';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOkResponse({ type: User })
  @ApiUnauthorizedResponse({ description: 'Потрібна автентифікація' })
  async me(@CurrentUser('sub') userId: string): Promise<User> {
    return this.usersService.findByIdOrFail(userId);
  }

  @Get()
  @Roles(UserRole.Admin)
  @ApiOkResponse({ type: [User] })
  @ApiForbiddenResponse({ description: 'Недостатньо прав' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
