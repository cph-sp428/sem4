import useAuth from "../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import PostCardContainer from "./PostCardContainer";
import { GET_POSTS_BY_USERNAME } from "../graphql/queries/GetPostsByUsername";

function ProfilePage() {
  let currentUsername = useAuth("user");
  const { username } = useParams();

  if (username || !currentUsername) {
    currentUsername = username;
  }


  const {loading, error, data} = useQuery(GET_POSTS_BY_USERNAME, {
    variables: { username: currentUsername },
  });

  if (loading) return <p>Loading...</p>;
  if (error) throw error;


  console.log(data);

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
