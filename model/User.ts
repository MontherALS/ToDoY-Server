import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: false, default: "User" }, // for later use
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
