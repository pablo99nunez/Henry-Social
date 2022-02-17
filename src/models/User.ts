import { Schema, model } from 'mongoose';
import '../db.ts';

export interface IUser {
  name: string;
  email: string;
  username?: string;
  avatar?: string;
  password?: string;
  createdAt: object;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    require: true,
  },
  avatar: String,
  createdAt: {
    type: Date,
    default: new Date().toDateString(),
  },
});
export default model<IUser>('User', userSchema);
