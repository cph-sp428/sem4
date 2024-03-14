import { useState } from "react";
import Post from "../../types/Post";
import CommentCardContainer from "../comments/CommentCardContainer";

interface PostCardProps {
    post : Post;
}

function PostCard( { post }: PostCardProps) {


    return ( 
        <div className="bg-blue shadow-md rounded-lg overflow-hidden">
            <img className="h-60 w-60 relative mx-auto" src={post.picUrl}/>
            <h1 className="text-center text-3xl">{post.description}</h1>
            <h2 className="text-center text-xl">{post.user.username}</h2>
            {/* <p className="text-center text-sm">{post.createdAt.toString()}</p> */}
            <CommentCardContainer comments={post.comments} postID={post.id!}/>
        </div>
     );
}

export default PostCard;