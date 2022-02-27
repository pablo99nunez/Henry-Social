import { model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import Joi from "joi";

export interface IPost {
  body: string;
  postTime: string;
  nLikes: [string];
  numComments: number;
  author: IUser;
  _id: number;
  typePost: string;
  company: string;
  position: string;
  companyLink: string;
  companyImage: string | File | null;
  salary: number;
  reportedTimes: number;
  tags: string[];
}

interface Comment {
  postId: ObjectId; // Reference to blogs
  postTime: string;
  text: string;
  author: IUser;
}

interface Like {
  referenceId: ObjectId; // Reference to post
  likeTime: string;
  author: IUser;
}

const postSchema = new Schema({
  body: {
    type: String,
    require: true,
  },
  postTime: { type: Date, default: Date.now },
  nLikes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  numComments: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  typePost: {
    type: String,
    require: true,
    default: "normal",
  },
  company: {
    type: String,
  },
  companyImage: {
    type: String,
  },
  position: {
    type: String,
  },
  companyLink: {
    type: String,
  },
  salary: {
    type: Number,
  },
  reportedTimes: {
    type: Number,
    default: 0
  },
  tags: {
    type: Array
  }
});

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  postTime: { type: Date, default: Date.now },
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export function postValidate(post: any) {
  const schema = Joi.object({
    body: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(post);
}

export default model<IPost>("Post", postSchema);
export const Comment = model<Comment>("Comment", commentSchema);
