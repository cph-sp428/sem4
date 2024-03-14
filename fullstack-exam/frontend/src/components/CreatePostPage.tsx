import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../graphql/mutations/CREATE_POST";
import useAuth from "../hooks/useAuth";

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
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div id="create-post-page-container">
      <h1>Create Post</h1>
    </div>
  );
}

export default CreatePostPage;
