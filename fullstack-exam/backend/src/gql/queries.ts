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
    if (!passwordCorrect) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { username: user.username, roles: user.roles },
      JWT_SECRET
    );

    return { token: token };
  },
  getAllPosts: async (_parent: never, _context: any) =>
    await postModel
    .find()
    .populate("user")
    .populate("comments"),
  relevantPostsByUsername: async (
    _parent: never,
    args: { username: string },
    _context: any
  ) => {
    const user: User | null = await userModel.findOne({
      username: args.username,
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user.relevantPosts;
  },
  postsByUsername: async (
    _parent: never,
    args: { username: string },
    _context: any
  ) => {
    const user = await userModel.findOne({ username: args.username });
    if (!user) {
      throw new Error("User not found");
    }
    const posts = await postModel
      .find({ user: user._id })
      .populate("user")
      .populate("comments");
    return posts;
  },
  userByUsername: async (
    _parent: never,
    args: { username: string },
    _context: any
  ) => {
    const user = await userModel
      .findOne({ username: args.username })
      .populate("posts");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};
