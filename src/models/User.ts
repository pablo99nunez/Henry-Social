import { Schema, model, ObjectId } from "mongoose";
import "../db.ts";

enum Roles {
    Estudiante = "Estudiante",
    Instructor = "Instructor",
    TA = "TA",
}
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
    following?: IUser[];
    followers?: IUser[];
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
    createdAt: {
        type: Date,
        default: new Date().toDateString(),
    },
});

export default model<IUser>("User", userSchema);
