import mongoose  from 'mongoose';
import { Post } from './Post';

export type User = { 
    _id?: mongoose.Types.ObjectId;
    username: string;
    password: string;
    email: string;
    roles: string[];
    posts: Post[];
    following: User[];
    followers: User[];
}