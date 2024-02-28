import commentModel from "../models/commentModel";
import { Comment } from "../types/Comment";

async function createComment(comment: Comment) {
  return await commentModel.create(comment);
}

async function getCommentById(id: string) {
  return await commentModel.find({ _id: id });
}

async function getAllComments() {
  return await commentModel.find();
}

async function updateComment(id: string, comment: Comment) {
    return await commentModel.findByIdAndUpdate(id, comment);
}

async function deleteComment(id: string) {
    return await commentModel.findByIdAndDelete(id);
}

export default {
    createComment,
    getCommentById,
    getAllComments,
    updateComment,
    deleteComment,
}