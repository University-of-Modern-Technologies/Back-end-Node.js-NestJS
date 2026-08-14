import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async findAll(done?: boolean): Promise<Task[]> {
    if (done === undefined) {
      return this.tasksRepository.find();
    }
    return this.tasksRepository.find({ where: { done } });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (task === null) {
      this.logger.warn(`Завдання з id ${id} не знайдено`);
      throw new NotFoundException(`Завдання з id ${id} не знайдено`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.preload({ id, ...updateTaskDto });
    if (task === undefined) {
      this.logger.warn(`Завдання з id ${id} не знайдено`);
      throw new NotFoundException(`Завдання з id ${id} не знайдено`);
    }
    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.tasksRepository.remove(task);
  }
}
