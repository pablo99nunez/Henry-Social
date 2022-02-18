import { Schema, model, ObjectId } from 'mongoose';
import '../db.ts';

export interface IUser {
  name: string;
  email: string;
  username?: string;
  avatar?: string | File | null;
  cohorte?: string;
  password?: string;
  linkedin?: string;
  github?: string;
  createdAt?: object;
  contactos:any
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
  github: String,
  linkedin: String,
  createdAt: {
    type: Date,
    default: new Date().toDateString(),
  },
  contactos: [{ type: Schema.Types.ObjectId, ref: 'contactos'}]
});



export default model<IUser>('User', userSchema);
