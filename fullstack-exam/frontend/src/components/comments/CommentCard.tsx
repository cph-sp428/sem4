import { Link } from "react-router-dom";
import Comment from "../../types/Comment";

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {
  return (
    <div id="comment-card">
      <Link to={`/user/${comment.username}`}>{comment.username} : </Link>
      {comment.text}
    </div>
  );
}

export default CommentCard;
