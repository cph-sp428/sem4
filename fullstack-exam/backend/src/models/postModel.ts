import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  picUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
  },
});

PostSchema.virtual("numberOfLikes").get(function (this: any) {
  return this.likes.length;
});

const postModel = mongoose.model("Post", PostSchema);
export default postModel;