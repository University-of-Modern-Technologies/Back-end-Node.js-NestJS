import dataSource from '../src/data-source';
import { Task } from '../src/tasks/entities/task.entity';
import { Category } from '../src/categories/entities/category.entity';

async function main() {
  await dataSource.initialize();

  const category = await dataSource.getRepository(Category).findOne({
    where: {},
    order: { name: 'ASC' },
  });

  if (category === null) {
    console.log('Спершу створи хоча б одну категорію');
    await dataSource.destroy();
    return;
  }

  const tasks = await dataSource
    .getRepository(Task)
    .createQueryBuilder('task')
    .leftJoinAndSelect('task.category', 'category')
    .leftJoinAndSelect('task.tags', 'tag')
    .where('task.done = :done', { done: false })
    .andWhere('category.id = :categoryId', { categoryId: category.id })
    .getMany();

  console.log(JSON.stringify(tasks, null, 2));

  await dataSource.destroy();
}

main();
