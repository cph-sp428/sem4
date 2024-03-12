import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import postModel from "../models/postModel";
import commentModel from "../models/commentModel";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";
import Post from "../types/Post";
import User from "../types/User";

export default {
  login: async (
    _parent: never,
    args: { username: string; password: string }
  ) => {
    const user = await userModel.findOne({
      username: args.username,
    });
    if (!user) {
      throw new Error("Invalid username");
    }

    const passwordCorrect = await bcrypt.compare(args.password, user.password);
    if(!passwordCorrect) {
       throw new Error("Invalid password");
     };

    const token = jwt.sign(
      { username: user.username, roles: user.roles },
      JWT_SECRET
    );

    return {token: token};
  },
  users: async (_parent: never, _context: any) => await userModel.find(),
  user: async (_parent: never, args: { username: string }, _context: any) => {
    return await userModel.findOne({ username: args.username });
  },
  posts: async (_parent: never, _context: any) => await postModel.find(),
  comments: async (_parent: never, _context: any) => await commentModel.find(),
  postsByUserId: async (_parent: never, args: { id: string }, _context: any) =>
    await postModel.find({ user: args.id }),
  relevantPostsByUsername: async (_parent: never, args: { username: string }, _context: any) => {
    const user : User | null = await userModel.findOne({ username: args.username });
    if(!user) {
      throw new Error("User not found");
    }
    return user.relevantPosts;
  },
  commentsByPostId: async (
    _parent: never,
    args: { id: string },
    _context: any
  ) => await commentModel.find({ post: args.id }),
};
