import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
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

  async findOne(id: string) {
    const task = await this.taskModel.findById(id).populate('category');
    if (!task) {
      throw new NotFoundException(`Завдання ${id} не знайдено`);
    }
    return task;
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
    return task;
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id);
    if (!task) {
      throw new NotFoundException(`Завдання ${id} не знайдено`);
    }
    return task;
  }
}
