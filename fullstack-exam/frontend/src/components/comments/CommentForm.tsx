import { useState } from "react";
import { POST_COMMENT } from "../../graphql/mutations/POST_COMMENT";
import { GET_ALL_POSTS } from "../../graphql/queries/GetAllPosts";
import { useMutation } from "@apollo/client";
import useAuth from "../../hooks/useAuth";
import { GET_POSTS_BY_USERNAME } from "../../graphql/queries/GetPostsByUsername";
import { GET_RELEVANT_POSTS } from "../../graphql/queries/GetRelevantPosts";
import { useNavigate, useParams } from "react-router";

interface CommentFormProps {
  postId: string;
}

function CommentForm({ postId }: CommentFormProps) {
  const possibleParam = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const username = useAuth("user");
  // console.log(username);

  const [addCommentMutation, { loading, error }] = useMutation(POST_COMMENT, {
    variables: {
      username: username,
      text: commentText,
      postId: postId,
    },
    refetchQueries: [
      { query: GET_ALL_POSTS },
      { query: GET_POSTS_BY_USERNAME, variables: { username: possibleParam.username }},
      { query: GET_RELEVANT_POSTS, variables: { username: username }},
    ],
  });

  const handleClick = () => {
    addCommentMutation();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="comment-form">
      <input id="comment-input"
      className="border-3 border-gray-300 p-2 background-white"
        type="text"
        placeholder="write a comment..."
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button className="border-3 border-gray-300 p-2 background-white" onClick={handleClick}>Comment</button>
    </div>
  );
}

export default CommentForm;
