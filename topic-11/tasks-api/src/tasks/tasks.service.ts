import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTasksQueryDto } from './dto/find-tasks-query.dto';
import { Task } from './entities/task.entity';
import { CategoriesService } from '../categories/categories.service';
import { TagsService } from '../tags/tags.service';
import { TaskDetail } from './entities/task-detail.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly categoriesService: CategoriesService,
    private readonly tagsService: TagsService,
  ) {}

  async findAll(
    query: FindTasksQueryDto,
    ownerId: string,
  ): Promise<[Task[], number]> {
    const { done, categoryId, tagId, page, limit } = query;

    const where: FindOptionsWhere<Task> = { ownerId };

    if (done !== undefined) {
      where.done = done;
    }

    if (categoryId !== undefined) {
      where.category = { id: categoryId };
    }

    if (tagId !== undefined) {
      where.tags = { id: tagId };
    }

    return this.tasksRepository.findAndCount({
      where,
      relations: { category: true, tags: true },
      order: { createdAt: 'DESC', id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string, ownerId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: { category: true, tags: true, detail: true },
    });

    if (task === null) {
      this.logger.warn(`Завдання з id ${id} не знайдено`);
      throw new NotFoundException(`Завдання з id ${id} не знайдено`);
    }

    if (task.ownerId !== ownerId) {
      throw new ForbiddenException('Завдання належить іншому користувачу');
    }

    return task;
  }

  async create(createTaskDto: CreateTaskDto, ownerId: string): Promise<Task> {
    const { categoryId, tagIds, detail, ...taskData } = createTaskDto;

    const category =
      categoryId === undefined || categoryId === null
        ? null
        : await this.categoriesService.findOne(categoryId);

    const tags = await this.tagsService.findByIds(tagIds ?? []);

    const task = this.tasksRepository.create({
      ...taskData,
      ownerId,
      category,
      tags,
    });

    if (detail !== undefined) {
      const taskDetail = new TaskDetail();
      Object.assign(taskDetail, detail);
      task.detail = taskDetail;
    }

    return this.tasksRepository.save(task);
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    ownerId: string,
  ): Promise<Task> {
    const { categoryId, tagIds, detail, ...taskData } = updateTaskDto;

    const task = await this.findOne(id, ownerId);

    Object.assign(task, taskData);

    if (categoryId === null) {
      task.category = null;
    }

    if (categoryId !== undefined && categoryId !== null) {
      task.category = await this.categoriesService.findOne(categoryId);
    }

    if (tagIds !== undefined) {
      task.tags = await this.tagsService.findByIds(tagIds);
    }

    if (detail !== undefined) {
      if (task.detail) {
        Object.assign(task.detail, detail);
      } else {
        const taskDetail = new TaskDetail();
        Object.assign(taskDetail, detail);
        task.detail = taskDetail;
      }
    }

    return this.tasksRepository.save(task);
  }

  async remove(id: string, ownerId: string): Promise<void> {
    const task = await this.findOne(id, ownerId);
    await this.tasksRepository.remove(task);
  }
}
