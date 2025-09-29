import mongoose, { Document, Types } from "mongoose";

const Schema = mongoose.Schema;

interface ITask extends Document {
  name: string;
  due: Date;
  user: Types.ObjectId;
  completed: boolean;
}

const taskSchema = new Schema<ITask>(
  {
    name: { type: String, required: true },
    due: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
