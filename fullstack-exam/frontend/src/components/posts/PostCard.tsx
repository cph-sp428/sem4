import { useMutation } from "@apollo/client";
import useAuth from "../../hooks/useAuth";
import Post from "../../types/Post";
import CommentCardContainer from "../comments/CommentCardContainer";
import { LIKE_POST } from "../../graphql/mutations/LIKE_POST";
import { dressPost } from "../../utils/PostFactory";
import { useState } from "react";
import { Link } from "react-router-dom";
import { REPORT_POST } from "../../graphql/mutations/REPORT_POST";
import { useNavigate } from "react-router";
import { GET_ALL_REPORTED_POSTS } from "../../graphql/queries/GET_ALL_REPORTED_POSTS";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();
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

  const [reportPost, { error }] = useMutation(REPORT_POST, {
    variables: {
      postId: post.id,
    },
    refetchQueries: [
      {
        query: GET_ALL_REPORTED_POSTS,
      }
    ],
  });

  const handleReport = () => {
    reportPost();
    if (error) {
      console.log(error.message);
      alert("Error reporting post");
      navigate("/home");
    }
    alert("Post reported");
  };

  return (
    <div
      className="bg-blue rounded-lg overflow-hidden shadow-3xl shadow-gray-900"
      id="post-card-container"
    >
      <img className=" size-full mx-auto" src={post.picUrl} />

      <h2 className="text-center text-xl ">
        <Link to={"/user/" + post.user.username}>{post.user.username}</Link> -{" "}
        {post.description}
      </h2>
      <div
        id="post-actions-container"
        className=" flex justify-around items-center"
      >
        <div id="likes-container" className="flex items-center gap-4">
          <p>{likes}</p>
          <img
            src="https://www.svgrepo.com/show/5414/like.svg"
            onClick={handleLike}
            className="cursor-pointer hover:scale-110 w-auto max-w-8"
          />
        </div>
        <button
          onClick={handleReport}
          id={true ? "report-button" : "report-button-div"}
          className=" bg-pink-100 text-black p-2 m-2 hover:bg-pink-300 hover:text-white border-3 border-pink-300 rounded-lg">
          report
        </button>
      </div>
      {/* <p className="text-center text-sm">{post.createdAt.toString()}</p> */}
      <CommentCardContainer comments={post.comments} postID={post.id!} />
    </div>
  );
}

export default PostCard;
