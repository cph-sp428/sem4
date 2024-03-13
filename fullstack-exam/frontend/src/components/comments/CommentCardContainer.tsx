import { useId } from "react";
import CommentCard from "./CommentCard";
import Comment from "../../types/Comment";
import CommentForm from "./CommentForm";

interface CommentCardContainerProps {
  comments : Comment[];
  postID: string;
}

function CommentCardContainer({ comments, postID }: CommentCardContainerProps) {


  if (!comments || comments.length === 0) {
    return <h3>No Comments...</h3>;
  }
  
  return (
    <div id="comment-card-container">
      <ul>
        {comments.map((comment : Comment) => (
          <li key={comment.id || useId()}>
            <CommentCard comment={comment} />
          </li>
        ))}
        <CommentForm postId={postID} />
      </ul>
    </div>
  );
}

export default CommentCardContainer;
