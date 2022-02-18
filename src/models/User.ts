import { Schema, model } from 'mongoose';
import '../db.ts';

export interface IUser {
  name: string;
  email: string;
  username?: string;
  avatar?: string;
  cohorte?: string;
  password?: string;
  following?: number;
  followers?: number;
  linkedin?: string;
  github?: string;
  createdAt?: object;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    default: null,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  avatar: String,
  cohorte: String,
  followers: {
    type: Number,
    required: true,
    default: 0,
  },
  following: {
    type: Number,
    required: true,
    default: 0,
  },
  github: String,
  linkedin: String,
  createdAt: {
    type: Date,
    default: new Date().toDateString(),
  },
});

export default model<IUser>('User', userSchema);
