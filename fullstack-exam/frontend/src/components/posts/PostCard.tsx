import { useMutation } from "@apollo/client";
import useAuth from "../../hooks/useAuth";
import Post from "../../types/Post";
import CommentCardContainer from "../comments/CommentCardContainer";
import { LIKE_POST } from "../../graphql/mutations/LIKE_POST";
import { dressPost } from "../../utils/PostFactory";
import { useState } from "react";

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

  const handleClick = () => {
    if (isLiked) {
      return;
    }
    likeComment();
    setLikes(likes + 1);
    setIsLiked(true);
  };

  const [likeComment, { loading, error }] = useMutation(LIKE_POST, {
    variables: {
      postId: post.id,
      username: user,
    },
    refetchQueries: ["GetPosts"],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-blue shadow-md rounded-lg overflow-hidden">
      <img className="h-60 w-60 relative mx-auto" src={post.picUrl} />
      <h2 className="text-center text-xl">{post.user.username} - {post.description}</h2>

      <h2 className="text-center text-xl">
        <button onClick={handleClick}>Like</button>
        {likes} likes
      </h2>
      {/* <p className="text-center text-sm">{post.createdAt.toString()}</p> */}
      <CommentCardContainer comments={post.comments} postID={post.id!} />
    </div>
  );
}

export default PostCard;
