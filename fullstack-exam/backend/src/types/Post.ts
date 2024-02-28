import { User } from "./User";
import { Comment } from "./Comment";
import mongoose from "mongoose";

export type Post = {
    _id?: mongoose.Types.ObjectId;
    user : User;
    picUrl: string;
    description: string;
    createdAt: Date;
    likes: User[];
    comments: Comment[];
}