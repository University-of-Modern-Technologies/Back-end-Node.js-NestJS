import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestContextService } from '../request-context.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: 1, title: 'Записатися до стоматолога', done: false },
    { id: 2, title: 'Купити квитки на потяг', done: true },
  ];
  private nextId = 3;

  constructor() // private readonly requestContext: RequestContextService
  {
    console.log('TasksService створено');
  }

  findAll(done?: boolean): Task[] {
    // console.log(`Сервіс: ${this.requestContext.requestId}`);
    if (done === undefined) {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.done === done);
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Завдання з id ${id} не знайдено`);
    }
    return task;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.nextId++,
      title: createTaskDto.title,
      done: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    Object.assign(task, updateTaskDto);
    return task;
  }

  remove(id: number): void {
    this.findOne(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
