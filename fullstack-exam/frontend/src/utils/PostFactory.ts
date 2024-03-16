import Post from "../types/Post";
import DressedPost from "../types/DressedPost";

export function dressPost(post: Post): DressedPost {
  return {
    ...post,
    numberOfLikes: post.likes.length,
    numberOfComments: post.comments.length,
  };
}
