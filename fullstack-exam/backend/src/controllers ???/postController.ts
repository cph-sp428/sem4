import postModel from "../models/postModel";
import { Post } from "../types/Post";

async function createPost(post: Post) {
  return await postModel.create(post);
}

async function getPostById(id: string) {
  return await postModel.find({ _id: id });
}

async function getAllPosts() {
  return await postModel.find();
}

async function updatePost(id: string, post: Post) {
    return await postModel.findByIdAndUpdate(id, post);
}

async function deletePost(id: string) {
    return await postModel.findByIdAndDelete(id);
}

export default {
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost,
}