import dataSource from '../src/data-source';
import { Task } from '../src/tasks/entities/task.entity';

async function main() {
  await dataSource.initialize();

  const tasks = await dataSource
    .getRepository(Task)
    .createQueryBuilder('task')
    .leftJoinAndSelect('task.category', 'category')
    .leftJoinAndSelect('task.tags', 'tag')
    .getMany();

  console.log(JSON.stringify(tasks, null, 2));

  await dataSource.destroy();
}

main();
