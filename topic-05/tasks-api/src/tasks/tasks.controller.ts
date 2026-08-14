import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
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
import { RequestContextService } from '../shared/request-context.service';
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
    private readonly requestContext: RequestContextService,
  ) {}

  @Get()
  @ApiOkResponse({ type: [Task] })
  @ApiQuery({ name: 'done', required: false, type: Boolean })
  findAll(
    @Query('done', new ParseBoolPipe({ optional: true })) done?: boolean,
  ): Task[] {
    this.logger.log(`Запит ${this.requestContext.requestId}`);
    const tasks = this.tasksService.findAll(done);
    const maxPageSize = this.configService.get('TASKS_MAX_PAGE_SIZE', {
      infer: true,
    });
    return tasks.slice(0, maxPageSize);
  }

  @Get(':id')
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ description: 'Завдання не знайдено' })
  findOne(@Param('id', ParseIntPipe) id: number): Task {
    return this.tasksService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: Task })
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ description: 'Завдання не знайдено' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ description: 'Завдання не знайдено' })
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.tasksService.remove(id);
  }
}
