import mongoose from 'mongoose'
import { Task } from './task.js'

try {
  await mongoose.connect('mongodb://localhost:27017/tasksdb')

  const deleted = await Task.findByIdAndDelete('6a5fde146ec45f6c48816dc9')
  console.log(deleted)
} catch (error) {
  console.error('Помилка роботи з базою', error.message)
} finally {
  await mongoose.disconnect()
}
