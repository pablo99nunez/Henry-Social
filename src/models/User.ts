import { Schema, model } from "mongoose";
import Joi from "joi";
import "../db.ts";

enum Roles {
  Estudiante = "Estudiante",
  Instructor = "Instructor",
  TA = "TA",
}
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  username?: string;
  avatar?: string | File | null;
  cohorte?: string;
  password?: string;
  linkedin?: string;
  github?: string;
  createdAt?: object;
  following?: string[];
  followers?: string[];
  isFollowing?: boolean;
  role?: Roles;
  portfolio?: string;
  bio?: string;
  admin: boolean;
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
  followers: {
    type: [],
    ref: "User",
    default: [],
  },
  following: {
    type: [],
    ref: "User",
    default: [],
  },
  cohorte: String,
  github: String,
  linkedin: String,
  portfolio: String,
  bio: String,
  role: {
    type: String,
    default: Roles.Estudiante,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date().toDateString(),
  },
});

export function userValidate(user: any) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    avatar: Joi.string(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  return schema.validate(user);
}

export default model<IUser>("User", userSchema);
