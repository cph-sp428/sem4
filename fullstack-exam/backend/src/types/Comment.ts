import mongoose from "mongoose";
import Post from "./Post";
import User from "./User";

type Comment = {
  _id?: mongoose.Types.ObjectId;
  user: User;
  post: Post;
  text: string;
  createdAt: Date;
};

export default Comment;
