import Post from "./Post";
import User from "./User";

type Comment = {
  id: string;
  user: User;
  post: Post;
  text: string;
  createdAt: Date;
};

export default Comment;
