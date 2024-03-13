import Post from "../types/Post";
import CommentCardContainer from "./CommentCardContainer";

interface PostCardProps {
    post : Post;
}

function PostCard( { post }: PostCardProps) {

    return ( 
        <div className="bg-blue shadow-md rounded-lg overflow-hidden">
            <img className="h-32 w-32 mx-auto" src={post.picUrl}/>
            <h1 className="text-center text-3xl">{post.description}</h1>
            <p className="text-center text-sm">{post.createdAt as unknown as string}</p>
            <CommentCardContainer comments={post.comments} postID={post.id!}/>
        </div>
     );
}

export default PostCard;