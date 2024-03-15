import useAuth from "../../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ProfileCard from "../posts/ProfileCard";
import PostCardContainer from "../posts/PostCardContainer";
import { GET_POSTS_BY_USERNAME } from "../../graphql/queries/GetPostsByUsername";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
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
  if (error) throw error;

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
