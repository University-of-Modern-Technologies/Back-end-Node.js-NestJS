import mongoose from 'mongoose'
import { Task } from './task.js'

try {
  await mongoose.connect('mongodb://localhost:27017/tasksdb')

  const updated = await Task.findByIdAndUpdate(
    '6a5fde146ec45f6c48816dc9',
    { done: true },
    { returnDocument: 'after' },
  )
  // const updated = await Task.updateMany({ done: true }, { done: false })
  console.log(updated)
} catch (error) {
  console.error('Помилка роботи з базою', error.message)
} finally {
  await mongoose.disconnect()
}
