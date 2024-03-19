import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import postModel from "../models/postModel";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";
import ReportedModel from "../models/reportedModel";
import { jwtDecode } from "jwt-decode";

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
  getAllPosts: async (_parent: never, args: { token: string }) => {
    authorizeTokenAsRole(args.token, "user");
    return await postModel
      .find()
      .populate("user")
      .populate("comments")
      .populate("likes")
      .sort({ createdAt: -1 });
  },
  relevantPostsByUsername: async (
    _parent: never,
    args: { token: string; username: string },
    _context: any
  ) => {
    authorizeTokenAsRole(args.token, "user");
    const user = await userModel
      .findOne({ username: args.username })
      .populate("following")
      .populate("posts");
    if (!user) {
      throw new Error("User not found");
    }
    const following = user.following;
    // console.log(following);
    const posts = await postModel
      .find({ user: { $in: following } })
      .populate("user")
      .populate("comments")
      .populate("likes")
      .sort({ createdAt: -1 });
    // console.log(posts);
    return posts;
  },
  postsByUsername: async (
    _parent: never,
    args: { token: string; username: string },
    _context: any
  ) => {
    authorizeTokenAsRole(args.token, "user");
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
    args: { token: string; username: string },
    _context: any
  ) => {
    authorizeTokenAsRole(args.token, "user");
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
    args: { token: string; searchCriteria: string },
    _context: any
  ) => {
    authorizeTokenAsRole(args.token, "user");
    const posts = await postModel
      .find({ description: { $regex: args.searchCriteria, $options: "i" } })
      .populate("user")
      .populate("comments")
      .populate("likes");
    return posts;
  },
  getAllReportedPosts: async (_parent: never, args: {token: string},_context: any) => {
    authorizeTokenAsRole(args.token, "admin");
    const reportedPosts = await ReportedModel.find().populate("post");
    const posts = reportedPosts.map((reportedPost) => reportedPost.post);
    return posts;
  },
  // isFollowingUser: async (
  //   _parent: never,
  //   args: { token: string; username: string; usernameToFollow: string },
  //   _context: any
  // ) => {
  //   authorizeTokenAsRole(args.token, "user");
  //   const user = await userModel
  //     .findOne({ username: args.username })
  //     .populate("following");
  //   const userToFollow = await userModel.findOne({
  //     username: args.usernameToFollow,
  //   });
  //   if (!user || !userToFollow) {
  //     throw new Error("User not found");
  //   }
  //   return user.following.some(
  //     (id) => id.toString() === userToFollow._id.toString()
  //   );
  // },
};

function authorizeTokenAsRole(token: string, role: string) {
  const decodedToken: any = jwtDecode(token);
  if (!decodedToken) {
    throw new Error("Invalid token");
  }
  if (!decodedToken.roles.includes(role)) {
    throw new Error("Unauthorized");
  }
}
