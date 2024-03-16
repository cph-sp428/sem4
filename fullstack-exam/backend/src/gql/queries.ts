import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import postModel from "../models/postModel";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";
import ReportedModel from "../models/reportedModel";

export default {
  login: async (
    _parent: never,
    args: { username: string; password: string },
    context: { token: string }
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
  getAllPosts: async (_parent: never, args: never) =>
    await postModel
      .find()
      .populate("user")
      .populate("comments")
      .populate("likes")
      .sort({ createdAt: -1 }),
  relevantPostsByUsername: async (
    _parent: never,
    args: { username: string },
    _context: any
  ) => {
    const user = await userModel
      .findOne({ username: args.username })
      .populate("following")
      .populate("posts");
    if (!user) {
      throw new Error("User not found");
    }
    const following = user.following;
    const posts = await postModel
      .find({ user: { $in: following } })
      .populate("user")
      .populate("comments")
      .populate("likes")
      .sort({ createdAt: -1 });
    return posts;
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
      .populate("comments")
      .populate("likes");

    // console.log(posts);
    return posts;
  },
  userByUsername: async (
    _parent: never,
    args: { username: string },
    _context: any
  ) => {
    const user = await userModel
      .findOne({ username: args.username })
      .populate("posts")
      .populate("following")
      .populate("followers");
    if (!user) {
      throw new Error("User not found");
    }
    //console.log(user);
    return user;
  },
  searchPosts: async (
    _parent: never,
    args: { searchCriteria: string },
    _context: any
  ) => {
    const posts = await postModel
      .find({ description: { $regex: args.searchCriteria, $options: "i" } })
      .populate("user")
      .populate("comments")
      .populate("likes");
    return posts;
  },
  getAllReportedPosts: async (_parent: never, _context: any) => {
    const reportedPosts = await ReportedModel.find().populate("post");
    const posts = reportedPosts.map((reportedPost) => reportedPost.post);
    return posts;
  },
  isFollowingUser: async (
    _parent: never,
    args: { username: string; usernameToFollow: string },
    _context: any
  ) => {
    const user = await userModel
      .findOne({ username: args.username })
      .populate("following");
    const userToFollow = await userModel.findOne({
      username: args.usernameToFollow,
    });
    if (!user || !userToFollow) {
      throw new Error("User not found");
    }
    return user.following.some(
      (id) => id.toString() === userToFollow._id.toString()
    );
  },
};

function authorizeToken(token: string) {
  const decodedToken = jwt.verify(token, JWT_SECRET);
  if (!decodedToken) {
    throw new Error("Invalid token");
  }
}
