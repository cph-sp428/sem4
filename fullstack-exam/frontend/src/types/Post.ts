import User from "./User";
import Comment from "./Comment";

type Post = {
  id: string;
  user: User;
  picUrl: string;
  description: string;
  createdAt: Date;
  likes: User[];
  comments: Comment[];
};

export default Post;
