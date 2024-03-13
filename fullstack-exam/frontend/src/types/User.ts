import mongoose from "mongoose";
import Post from "./Post";

type User = {
  id: string;
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