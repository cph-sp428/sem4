import Comment from "../../types/Comment";

interface CommentCardProps {
    comment: Comment;
}

function CommentCard( {comment} : CommentCardProps) {
    
    return ( 
        <div id="comment-card">
            {/* <p >{comment.user.username}</p> */}
            <p >{comment.text}</p>
        </div>
     );
}

export default CommentCard;