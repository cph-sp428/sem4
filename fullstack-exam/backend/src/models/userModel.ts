import mongoose from "mongoose";
import User from "../types/User";
import Post from "../types/Post";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 25,
    lowercase: true,
  },
  roles: {
    type: [String],
    required: true,
    default: ["user"],
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
});

UserSchema.virtual("numberOfPosts").get(function (this: User) {
  return this.posts.length;
});

UserSchema.virtual("numberOfFollowing").get(function (this: User) {
  return this.following.length;
});

UserSchema.virtual("numberOfFollowers").get(function (this: User) {
  return this.followers.length;
});

const userModel = mongoose.model("User", UserSchema);
export default userModel;
