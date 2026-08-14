import dataSource from '../src/data-source';
import { Task } from '../src/tasks/entities/task.entity';

async function main() {
  await dataSource.initialize();

  const tasksRepository = dataSource.getRepository(Task);
  const tasks = await tasksRepository.find();

  console.log(tasks);

  await dataSource.destroy();
}

main();
