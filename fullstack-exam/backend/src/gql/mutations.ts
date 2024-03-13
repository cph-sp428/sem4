import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import postModel from "../models/postModel";
import commentModel from "../models/commentModel";
import User from "../types/User";
import Post from "../types/Post";
import Comment from "../types/Comment";

export default {
  addUser: async (
    _parent: never,
    args: User,
    _context: never,
    _info: never
  ) => {
    const user = userModel.findOne({ username: args.username });
    if (!user) {
      throw new Error("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(args.password, 10);
    return userModel.create({ ...args, password: hashedPassword });
  },

  addPost: async (
    _parent: never,
    args: { username: string; picUrl: string; description: string },
    _context: never,
    _info: never
  ) => {
    const user = await userModel.findOne({ username: args.username });
    if (!user) {
      throw new Error("Username not found");
    }
    const post = await postModel.create({
      user: user,
      picUrl: args.picUrl,
      description: args.description,
    });
    user.posts.push(post._id);
    user.save();
    return post;
  },

  addComment: async (
    _parent: never,
    args: { username: string; postId: string; text: string },
    _context: never,
    _info: never
  ) => {
    const user = await userModel.findOne({ username: args.username });
    const post = await postModel.findById(args.postId);

    const comment = await commentModel.create({
      user: user,
      post: post,
      text: args.text,
    });
    postModel.findById(args.postId).then((post) => {
      if (post) {
        post.comments.push(comment._id);
        post.save();
      }
    });
    return comment;
  },
};
