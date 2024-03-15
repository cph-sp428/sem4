import { useMutation, useQuery } from "@apollo/client";
import useAuth from "../../hooks/useAuth";
import Post from "../../types/Post";
import CommentCardContainer from "../comments/CommentCardContainer";
import { LIKE_POST } from "../../graphql/mutations/LIKE_POST";
import { dressPost } from "../../utils/PostFactory";
import { useState } from "react";
import { Link } from "react-router-dom";
import { REPORT_POST } from "../../graphql/mutations/REPORT_POST";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const user = useAuth("user");

  const postToDisplay = dressPost(post);
  const [likes, setLikes] = useState(postToDisplay.numberOfLikes);
  const [isLiked, setIsLiked] = useState(
    post.likes.some((like) => like.username === user)
  );

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
    likePost();
  };

  const [likePost] = useMutation(LIKE_POST, {
    variables: {
      postId: post.id,
      username: user,
    },
  });

  const [reportPost] = useMutation(REPORT_POST, {
    variables: {
      postId: post.id,
    },
  });

  const handleReport = () => {
    alert("Post reported!");
    reportPost();
  };

  return (
    <div className="bg-blue rounded-lg overflow-hidden shadow-2xl shadow-gray-900">
      <img className="h-60 w-60 relative mx-auto" src={post.picUrl} />
      <Link to={"/user/" + post.user.username}>
        <h2 className="text-center text-xl">
          {post.user.username} - {post.description}
        </h2>
      </Link>
      <div className="text-center ">
        {likes}
        <img
          src="https://www.svgrepo.com/show/5414/like.svg"
          width={30}
          onClick={handleLike}
          className="cursor-pointer mx-auto"
        />
      </div>
      <button onClick={handleReport} className="bg-red-500 text-white p-2 m-2">
        Report
      </button>
      {/* <p className="text-center text-sm">{post.createdAt.toString()}</p> */}
      <CommentCardContainer comments={post.comments} postID={post.id!} />
    </div>
  );
}

export default PostCard;
