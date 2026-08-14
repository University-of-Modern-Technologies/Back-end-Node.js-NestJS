import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { ReportsService } from '../reports/reports.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private tasks: Task[] = [
    { id: 1, title: 'Записатися до стоматолога', done: false },
    { id: 2, title: 'Купити квитки на потяг', done: true },
  ];
  private nextId = 3;

  constructor(
    @Inject(forwardRef(() => ReportsService))
    private readonly reportsService: ReportsService,
  ) {
    this.logger.log('TasksService створено');
  }

  findAll(done?: boolean): Task[] {
    if (done === undefined) {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.done === done);
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      this.logger.warn(`Завдання з id ${id} не знайдено`);
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
    this.logger.log(`Усього завдань: ${this.reportsService.summary().total}`);
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
