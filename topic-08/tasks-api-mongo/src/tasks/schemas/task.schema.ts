import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ _id: false })
export class TaskDetail {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  priority: number;
}

export const TaskDetailSchema = SchemaFactory.createForClass(TaskDetail);

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  done: boolean;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: TaskDetailSchema })
  detail: TaskDetail;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
