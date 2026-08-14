import mongoose from 'mongoose'
import { Task } from './task.js'

try {
  await mongoose.connect('mongodb://localhost:27017/tasksdb')

  // const tasks = await Task.find({ done: false })
  // console.log(tasks)
  // const task = await Task.findById('6a5fde146ec45f6c48816dc9')
  const task = await Task.findOne({ _id: '6a5fde146ec45f6c48816dc9' })
  console.log(task)
} catch (error) {
  console.error('Помилка роботи з базою', error.message)
} finally {
  await mongoose.disconnect()
}
