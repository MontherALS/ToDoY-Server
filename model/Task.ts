import mongoose, { Document, Types } from "mongoose";

const Schema = mongoose.Schema;

interface ITask extends Document {
  name: string;
  dueDate: string;
  user: Types.ObjectId;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

const taskSchema = new Schema<ITask>(
  {
    name: { type: String, required: true },
    dueDate: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ["low", "medium", "high"] },
  },
  { timestamps: true }
);
const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
