import mongoose from 'mongoose'
import { Task } from './task.js'

try {
  await mongoose.connect('mongodb://localhost:27017/tasksdb')

  const task = await Task.create({
    title: 'Прибрати в кімнаті',
    tags: ['побут', 'дім'],
    detail: { description: 'встигнути до вечора', priority: 3 },
  })

  console.log(task)
} catch (error) {
  console.error('Помилка роботи з базою', error.message)
} finally {
  await mongoose.disconnect()
}
