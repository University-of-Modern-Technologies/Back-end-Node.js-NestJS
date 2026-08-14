import dataSource from '../src/data-source';
// Потрібно в entity додати category: Promise<Category | null>;
import { Task } from '../src/tasks/entities/task.entity';

async function main() {
  await dataSource.initialize();

  const tasksRepository = dataSource.getRepository(Task);

  console.log('--- запит завдань ---');
  const tasks = await tasksRepository.find();

  console.log('--- звернення до категорії ---');
  const category = await tasks[0].category;
  console.log(category);

  await dataSource.destroy();
}

main();
