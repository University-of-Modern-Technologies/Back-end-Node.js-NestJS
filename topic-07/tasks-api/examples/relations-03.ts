import dataSource from '../src/data-source';
// Потрібно додати властивість eager: true у ManyToOne, щоб при отриманні завдань автоматично підвантажувалася категорія
import { Task } from '../src/tasks/entities/task.entity';

async function main() {
  await dataSource.initialize();

  const tasksRepository = dataSource.getRepository(Task);
  const tasks = await tasksRepository.find();

  console.log(tasks);

  await dataSource.destroy();
}

main();
