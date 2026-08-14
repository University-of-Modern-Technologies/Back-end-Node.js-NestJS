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
  ParseBoolPipe,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { EnvironmentVariables } from '../config/environment-variables';

@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);
  constructor(
    private readonly tasksService: TasksService,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  @Get()
  @ApiOkResponse({ type: [Task] })
  @ApiQuery({ name: 'done', required: false, type: Boolean })
  async findAll(
    @Query('done', new ParseBoolPipe({ optional: true })) done?: boolean,
  ): Promise<Task[]> {
    const tasks = await this.tasksService.findAll(done);
    const maxPageSize = this.configService.get('TASKS_MAX_PAGE_SIZE', {
      infer: true,
    });
    return tasks.slice(0, maxPageSize);
  }

  @Get(':id')
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ description: 'Завдання не знайдено' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: Task })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ description: 'Завдання не знайдено' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ description: 'Завдання не знайдено' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
