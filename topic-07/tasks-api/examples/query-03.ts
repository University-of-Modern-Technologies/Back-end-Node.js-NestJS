import dataSource from '../src/data-source';
import { Task } from '../src/tasks/entities/task.entity';
import { Tag } from '../src/tags/entities/tag.entity';

async function main() {
  await dataSource.initialize();

  const tag = await dataSource.getRepository(Tag).findOne({
    where: {},
    order: { name: 'ASC' },
  });

  if (tag === null) {
    console.log('Спершу створи хоча б один тег');
    await dataSource.destroy();
    return;
  }

  const tasks = await dataSource
    .getRepository(Task)
    .createQueryBuilder('task')
    .leftJoinAndSelect('task.tags', 'tag')
    .where((qb) => {
      const sub = qb
        .subQuery()
        .select('filteredTask.id')
        .from(Task, 'filteredTask')
        .leftJoin('filteredTask.tags', 'filterTag')
        .where('filterTag.id = :tagId')
        .getQuery();
      return 'task.id IN ' + sub;
    })
    .setParameter('tagId', tag.id)
    .getMany();

  console.log(JSON.stringify(tasks, null, 2));

  await dataSource.destroy();
}

main();
