import { Schema, model } from 'mongoose';
import '../db.ts';

// export interface IUser {
//   name: string;
//   email: string;
//   username?: string;
//   avatar?: string;
//   cohorte?: string;
//   password?: string;
//   following: number;
//   followers: number;
//   linkedin?: string;
//   github?: string;
//   createdAt?: object;
// }
export interface IUser {
  name: string;
  email: string;
  username?: string;
  avatar?: string;
  cohorte?: string;
  password?: string;
  linkedin?: string;
  github?: string;
  createdAt?: object;
}


export interface IUser2 extends IUser {
    Following: IUser[];
    Followers: IUser[];
}

// const userSchema = new Schema<IUser2>({
//   name: {
//     type: String,
//     require: true,
//   },
//   username: {
//     type: String,
//     default: null,
//   },
//   email: {
//     type: String,
//     require: true,
//   },
//   avatar: String,
//   cohorte: String,
//   followers: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   following: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   github: String,
//   linkedin: String,
//   createdAt: {
//     type: Date,
//     default: new Date().toDateString(),
//   },
// });

const userSchema = new Schema<IUser2>({
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
  cohorte: String,
  github: String,
  linkedin: String,
  Followers: {
    type:[]
  },
  Following:{
    type:[]
  },
  createdAt: {
    type: Date,
    default: new Date().toDateString(),
  },
});

export default model<IUser2>('User', userSchema);
