import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { CategoryDocument } from '../categories/schemas/category.schema';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  async create(dto: CreateTaskDto) {
    const task = await this.taskModel.create(dto);
    return task.populate('category');
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.taskModel
        .find()
        .sort({ createdAt: 'desc' })
        .skip(skip)
        .limit(limit)
        .populate('category'),
      this.taskModel.countDocuments(),
    ]);

    return { items, total, page, limit };
  }

  async findOne(id: string): Promise<TaskResponseDto> {
    return this.cache.wrap(
      `task:${id}`,
      async () => {
        const task = await this.taskModel
          .findById(id)
          .populate<{ category: CategoryDocument }>('category');

        if (!task) {
          throw new NotFoundException(`Завдання ${id} не знайдено`);
        }

        return {
          _id: task._id.toString(),
          title: task.title,
          done: task.done,
          tags: task.tags,
          detail: task.detail,
          category: {
            _id: task.category._id.toString(),
            name: task.category.name,
          },
          createdAt: task.createdAt.toISOString(),
          updatedAt: task.updatedAt.toISOString(),
        };
      },
      100_000,
    );
  }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.taskModel
      .findByIdAndUpdate(id, dto, {
        returnDocument: 'after',
        runValidators: true,
      })
      .populate('category');

    if (!task) {
      throw new NotFoundException(`Завдання ${id} не знайдено`);
    }

    await this.cache.del(`task:${id}`);

    return task;
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id);

    if (!task) {
      throw new NotFoundException(`Завдання ${id} не знайдено`);
    }

    await this.cache.del(`task:${id}`);

    return task;
  }
}
