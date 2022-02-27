import { model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import Joi from "joi";

export interface IPost {
  image: string;
  costoClases: string;
  temasClases: string;
  tecnologíaClases: string;
  body: string;
  text: string;
  image: string;
  postTime: string;
  nLikes: [string];
  numComments: number;
  author: IUser;
  _id: number | boolean;
  typePost: string;
  company: string;
  position: string;
  companyLink: string;
  companyImage: string | File | null;
  salary: number;
  reportedTimes: number;
  question: IQuestions;
  tags: string[];
}
export interface IQuestions {  // Reference to question posts
  question: string,
  answer: string,
  answered: boolean,
}
interface Comment {
  postId: ObjectId; // Reference to blogs
  postTime: string;
  text: string;
  author: IUser;
  nLikes: [string];
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
  question: {
    type: [],
    default: []
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
  nLikes: {
   type: [Schema.Types.ObjectId],
   ref: "User",
   default: [],
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
