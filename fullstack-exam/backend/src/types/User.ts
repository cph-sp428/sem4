import mongoose from "mongoose";
import Post from "./Post";

type User = {
  _id?: mongoose.Types.ObjectId;
  username: string;
  password: string;
  email: string;
  roles: string[];
  posts: Post[];
  following: User[];
  followers: User[];
  relevantPosts: Post[];
};

export default User;