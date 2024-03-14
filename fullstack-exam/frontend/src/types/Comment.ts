import Post from "./Post";
import User from "./User";

type Comment = {
  id: string;
  username: string;
  post: Post;
  text: string;
  createdAt: Date;
};

export default Comment;
