import Comment from "../types/Comment";

interface CommentCardProps {
    comment: Comment;
}

function CommentCard( {comment} : CommentCardProps) {
    console.log(comment);
    return ( 
        <div id="comment-card">
            {/* <p >{comment.user.username}</p> */}
            <p >{comment.text}</p>
        </div>
     );
}

export default CommentCard;