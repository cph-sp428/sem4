import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import postModel from "../models/postModel";
import commentModel from "../models/commentModel";
import User from "../types/User";
import ReportedModel from "../models/reportedModel";

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
  likePost: async (
    _parent: never,
    args: { postId: string; username: string }
  ) => {
    const user = await userModel.findOne({ username: args.username });
    const post = await postModel.findOne({ _id: args.postId });

    if (!post) {
      throw new Error("Post not found");
    } else if (!user) {
      throw new Error("User not found");
    }
    // removes like if user already liked the post
    if (post.likes.includes(user._id)) {
      post.likes = post.likes.filter(
        (like) => like.toString() !== user._id.toString()
      );
      post.save();
      return post;
    }
    // saves userId in array of "likes"
    post.likes.push(user._id);
    post.save();
    return post;
  },
  followUser: async (
    _parent: never,
    args: { username: string; usernameToFollow: string }
  ) => {
    const user = await userModel
      .findOne({ username: args.username })
      .populate("following");
    const userToFollow = await userModel
      .findOne({ username: args.usernameToFollow })
      .populate("followers");

    if (!user || !userToFollow) {
      throw new Error("Users not valid");
    }
    
    user.following.push(userToFollow._id);
    userToFollow.followers.push(user._id);
    user.save();
    userToFollow.save();

    return userToFollow;
  },
  // TODO: rethink the logic of this function
  updateUser: async (
    _parent: never,
    args: { userId: string; username: string; password: string; email: string }
  ) => {
    const isUsernameUnique =
      (await userModel.findOne({ username: args.username })) !== null;

    if (!isUsernameUnique) {
      throw new Error("Username already exists");
    }

    const isEmailUnique =
      (await userModel.findOne({ email: args.email })) !== null;
    if (!isEmailUnique) {
      throw new Error("Email already exists");
    }

    const user = await userModel.findById(args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.username = args.username;
    user.password = bcrypt.hashSync(args.password, 10);
    user.email = args.email;
    user.save();
    return user;
  },
  reportPost: async (_parent: never, args: { postId: string }) => {
    const post = await ReportedModel.findOne({ post: args.postId });
    if (post) {
      throw new Error("Post already reported");
    }
    const reportedPost = await ReportedModel.create({ post: args.postId });
    return reportedPost;
  },
  // TODO: remove comments and likes
  removePost: async (_parent: never, args: { postId: string }) => {
    const post = await postModel.findByIdAndDelete(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }

    const report = await ReportedModel.findOneAndDelete({ post: post._id });

    const user = await userModel.findById(post.user);
    if (user) {
      user.posts = user.posts.filter(
        (postId) => postId.toString() !== post._id.toString()
      );
      user.save();
    }

    const comments = await commentModel.find({ post: post._id });
    comments.forEach((comment) => {
      commentModel.findByIdAndDelete(comment._id);
    });

    return post;
  },
  removeReport: async (_parent: never, args: { postId: string }) => {
    const reportedPost = await ReportedModel.findOneAndDelete({
      post: args.postId,
    });
    if (!reportedPost) {
      throw new Error("Reported post not found");
    }
    return reportedPost;
  },
  removeAllFollowersAndFollowing: async (
    _parent: never,
    args: { someString: string }
  ) => {
    console.log(args.someString);
    await userModel.updateMany({}, { $set: { following: [], followers: [] } });
    return true;
  },
};
