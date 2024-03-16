import useAuth from "../../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import ProfileCard from "../posts/ProfileCard";
import PostCardContainer from "../posts/PostCardContainer";
import { GET_POSTS_BY_USERNAME } from "../../graphql/queries/GetPostsByUsername";

function ProfilePage() {
  const navigate = useNavigate();
  let currentUsername = useAuth("user");
  const { username } = useParams();
  // const navigate = useNavigate();

  if (username || !currentUsername) {
    currentUsername = username;
  }

  const { loading, error, data } = useQuery(GET_POSTS_BY_USERNAME, {
    variables: { username: currentUsername },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    alert("Error: " + error.message);
    navigate("/home");
  }

  return (
    <div>
      <ProfileCard username={currentUsername} />

      <PostCardContainer
        posts={data.postsByUsername}
        errorMessage="No Available Posts..."
      />
    </div>
  );
}

export default ProfilePage;
