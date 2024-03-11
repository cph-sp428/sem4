import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import postModel from "../models/postModel";
import commentModel from "../models/commentModel";
import { JWT_SECRET } from "../config";

export default {
  login: async (
    _parent: never,
    args: { username: string; password: string }
  ) => {
    const hashedPassword = bcrypt.hashSync(args.password, 10);
    const user = await userModel.findOne({
      username: args.username,
      password: hashedPassword,
    });
    if (!user) {
      throw new Error("Invalid username or password");
    }
    
    return {username: user.username, roles : user.roles};
  },
  users: async (_parent: never, _context: any) => await userModel.find(),
  user: async (_parent: never, args: { id: string }, _context: any) => {
    await userModel.findById(args.id);
  },
  posts: async (_parent: never, _context: any) => await postModel.find(),
  comments: async (_parent: never, _context: any) => await commentModel.find(),
  postsByUserId: async (_parent: never, args: { id: string }, _context: any) =>
    await postModel.find({ user: args.id }),
  commentsByPostId: async (
    _parent: never,
    args: { id: string },
    _context: any
  ) => await commentModel.find({ post: args.id }),
};
