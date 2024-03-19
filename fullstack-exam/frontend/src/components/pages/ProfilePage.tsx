import useAuth from "../../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import ProfileCard from "../posts/ProfileCard";
import PostCardContainer from "../posts/PostCardContainer";
import { GET_POSTS_BY_USERNAME } from "../../graphql/queries/GET_POSTS_BY_USERNAME";
import PostCardGridContainer from "../posts/PostCardGridContainer";
import { useState } from "react";
import { getToken } from "../../utils/AuthFacade";

function ProfilePage() {
  const navigate = useNavigate();
  let currentUsername = useAuth("user");
  const { username } = useParams();
  const [gridMode, setGridMode] = useState(false);

  if (username || !currentUsername) {
    currentUsername = username;
  }

  const { loading, error, data } = useQuery(GET_POSTS_BY_USERNAME, {
    variables: { token: getToken(), username: currentUsername },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    alert("Error: " + error.message);
    navigate("/home");
  }

  return (
    <div id="container">
      <h1> PROFILE: {currentUsername!}</h1>

      <ProfileCard username={currentUsername} />

      <button id="gridmode-button" onClick={() => (setGridMode(!gridMode))}>Toggle Grid Mode</button>

      {gridMode ? (
        <PostCardGridContainer posts={data.postsByUsername} />
      ) : (
        <PostCardContainer
          posts={data.postsByUsername}
          errorMessage="No Available Posts..."
        />
      )}
    </div>
  );
}

export default ProfilePage;
