import mongoose from 'mongoose'
import { Task } from './task.js'

try {
  await mongoose.connect('mongodb://localhost:27017/tasksdb')

  const task = new Task({
    title: 'Купити продукти',
    tags: ['побут'],
    detail: { description: 'молоко, хліб, овочі', priority: 2 },
  })

  await task.save()
  console.log(task)
} catch (error) {
  console.error('Помилка роботи з базою', error.message)
} finally {
  await mongoose.disconnect()
}
