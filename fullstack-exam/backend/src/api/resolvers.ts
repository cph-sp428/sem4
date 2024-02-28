import { User } from "../types/User";
import { Post } from "../types/Post";
import { Comment } from "../types/Comment";
import userModel from "../models/userModel";
import postModel from "../models/postModel";
import commentModel from "../models/commentModel";

export const resolvers = {
  Query: {
    users: async (_parent: never, _context: any) => await userModel.find(),
    posts: async (_parent: never, _context: any) => await postModel.find(),
    comments: async (_parent: never, _context: any) =>
      await commentModel.find(),
  },

  Mutation: {
    addUser: (_parent: never, args: User, _context: never, _info: never) => {
      const user = userModel.findOne({ username: args.username });
      if (!user) {
        throw new Error("Username already exists");
      }
      return userModel.create(args);
    },

    addPost: (_parent: never, args: Post, _context: never, _info: never) => {
      userModel.findById(args.user).then((user) => {
        if (user && args._id) {
          user.posts.push(args._id);
          user.save();
        }
      });
      return postModel.create(args);
    },

    addComment: (
      _parent: never,
      args: Comment,
      _context: never,
      _info: never
    ) => {
      const post = postModel.findById(args.post);
      if (!post) {
        throw new Error("Post does not exist");
      }
      const user = userModel.findById(args.user);
      if (!user) {
        throw new Error("User does not exist");
      }
      postModel.findById(args.post).then((post) => {
        if (post && args._id) {
          post.comments.push(args._id);
          post.save();
        }
      });
      return commentModel.create(args);
    },
  },
};