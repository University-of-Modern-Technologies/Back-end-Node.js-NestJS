import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  tags: [String],
  detail: {
    description: String,
    priority: Number,
  },
})

export const Task = mongoose.model('Task', taskSchema)
