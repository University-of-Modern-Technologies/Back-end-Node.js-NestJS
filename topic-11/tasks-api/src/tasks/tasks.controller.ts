import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginatedTasksDto } from './dto/paginated-tasks.dto';
import { FindTasksQueryDto } from './dto/find-tasks-query.dto';
import { Task } from './entities/task.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOkResponse({ type: PaginatedTasksDto })
  async findAll(
    @Query() query: FindTasksQueryDto,
    @CurrentUser('sub') userId: string,
  ): Promise<PaginatedTasksDto> {
    const [items, total] = await this.tasksService.findAll(query, userId);

    return {
      items,
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ description: 'Завдання не знайдено' })
  @ApiForbiddenResponse({ description: 'Завдання належить іншому користувачу' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('sub') userId: string,
  ): Promise<Task> {
    return this.tasksService.findOne(id, userId);
  }

  @Post()
  @ApiCreatedResponse({ type: Task })
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser('sub') userId: string,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto, userId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ description: 'Завдання не знайдено' })
  @ApiForbiddenResponse({ description: 'Завдання належить іншому користувачу' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser('sub') userId: string,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ description: 'Завдання не знайдено' })
  @ApiForbiddenResponse({ description: 'Завдання належить іншому користувачу' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('sub') userId: string,
  ): Promise<void> {
    return this.tasksService.remove(id, userId);
  }
}
