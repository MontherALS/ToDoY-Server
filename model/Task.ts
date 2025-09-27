import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

interface ITask extends Document {
  name: string;
  createdAt: Date;
  due: Date;
  completed: boolean;
}

const taskSchema = new Schema<ITask>({
  name: { type: String, requier: true },
  createdAt: { type: Date, default: Date.now },
  due: { type: Date },
  completed: { type: Boolean, default: false },
});
const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
