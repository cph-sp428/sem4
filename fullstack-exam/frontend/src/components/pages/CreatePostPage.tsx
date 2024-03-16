import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../graphql/mutations/CREATE_POST";
import useAuth from "../../hooks/useAuth";
import { GET_POSTS_BY_USERNAME } from "../../graphql/queries/GetPostsByUsername";

function CreatePostPage() {
  const navigate = useNavigate();
  const username = useAuth("user");
  const [postInfo, setPostInfo] = useState({
    picUrl: "",
    description: "",
  });
  const [createPost] = useMutation(CREATE_POST, {
    variables: {
      username: username,
      picUrl: postInfo.picUrl,
      description: postInfo.description,
    },
    refetchQueries: [
      { query: GET_POSTS_BY_USERNAME, variables: { username: username } },
    ],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost();
    alert("Post created!");
    navigate("/user/" + username);
  };

  return (
    <div id="create-post-page-container">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Image URL</label>
        <input
          type="text"
          value={postInfo.picUrl}
          onChange={(e) => setPostInfo({ ...postInfo, picUrl: e.target.value })}
        />
        <label>Description</label>
        <input
          type="text"
          value={postInfo.description}
          onChange={(e) =>
            setPostInfo({ ...postInfo, description: e.target.value })
          }
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePostPage;
