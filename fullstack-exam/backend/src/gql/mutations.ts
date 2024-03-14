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
      username: args.username,
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
  likePost: async (_parent: never, args: { postId: string; username: string }) => {
    const user = await userModel.findOne({ username: args.username });
    const post = await postModel.findById(args.postId);
    if (!post) {
      throw new Error("Post not found");
    } else if (!user){
      throw new Error("User not found");
    }
    if(post.likes.includes(user._id)) {
      //return JSON.stringify({error: "Post Already Liked..."});
      throw new Error("Post already liked");
    }
    post.likes.push(user._id);
    post.save();
    return post;
  },
  followUser: async (_parent: never, args: { username: string; usernameToFollow: string }) => {
    const user = await userModel.findOne({ username: args.username });
    const userToFollow = await userModel.findOne({ username: args.usernameToFollow });

    if(!user || !userToFollow) {
      throw new Error("User not found");
    }
    user.following.push(userToFollow._id);
    user.save();
    return userToFollow;
  },
  updateUser: async (_parent: never, args: { userId: string, username: string, password: string, email: string}) => {
    const user = await userModel.findById(args.userId);
    if(!user){
      throw new Error("User not found");
    }
    user.username = args.username;
    user.password = bcrypt.hashSync(args.password, 10);
    user.email = args.email;
    user.save();
    return user;
  },
};
