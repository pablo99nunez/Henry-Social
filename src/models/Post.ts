import { model, ObjectId, Schema, PopulatedDoc } from "mongoose";
import { IUser } from "./User";

export interface IPost {
    body: string;
    postTime: string;
    nLikes: [IUser];
    numComments: number;
    author: IUser;
    _id: number;
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

export default model<IPost>("Post", postSchema);
export const Comment = model<Comment>("Comment", commentSchema);
