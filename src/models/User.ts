import { Schema, model } from 'mongoose';
import '../db.ts';

enum Roles{
  Estudiante="Estudiante",
  Instructor="Instructor",
  TA="TA"
}
export interface IUser {
  name: string;
  email: string;
  username?: string;
  avatar?: string | File | null;
  cohorte?: string;
  password?: string;
  following?: number;
  followers?: number;
  linkedin?: string;
  github?: string;
  createdAt?: object;
  role?:Roles;
  portfolio?:string;
  bio?:string;
  admin:boolean
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
  admin:{
    type: Boolean,
    default: false
  },
  github: String,
  linkedin: String,
  portfolio: String,
  bio:String,
  role:{
    type:String,
    default: Roles.Estudiante
  },
  createdAt: {
    type: Date,
    default: new Date().toDateString(),
  },
});

export default model<IUser>('User', userSchema);
