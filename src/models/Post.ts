import { model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";

interface Post {
  body: string;
  postTime: string;
  nLikes: number;
  numComments: number;
  author: IUser;
}

interface Comments {
  postId: ObjectId; // Reference to blogs
  postTime: string;
  text: string;
  author: IUser;
}

interface Likes {
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
    type:Number,
    default:0
  },
  numComments: {
    type:Number,
    default:0
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    // ref: "postSchema"
  },
  postTime: { type: Date, default: Date.now },
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const likeSchema = new Schema({
  referenceId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  likeTime: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default model<Post>("Post", postSchema);
export const Comments = model<Comments>("Comments", commentSchema);
export const Likes = model<Likes>("Likes", likeSchema);
