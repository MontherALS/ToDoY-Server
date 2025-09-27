import mongoose, { Document } from "mongoose";

//TODO Reletions between user and task
const Schema = mongoose.Schema;

interface IUser extends Document {
  email: string;
  password: number;
  tasks?: string[];
  tasksDone?: string[];
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: Number, required: true },
  tasks: { type: [String] },
  tasksDone: { type: [String] },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
