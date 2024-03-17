import useAuth from "../../hooks/useAuth";
import { useQuery } from "@apollo/client";
import PostCardContainer from "../posts/PostCardContainer";
import { GET_RELEVANT_POSTS } from "../../graphql/queries/GetRelevantPosts";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const username: string | void = useAuth("user");

  const { loading, error, data } = useQuery(GET_RELEVANT_POSTS, {
    variables: { username: username },
  });

  const posts = data ? data.relevantPostsByUsername : [];

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    alert("Error: " + error.message);
    navigate("/home");
  }

  return (
    <div id="container">
      <h1>HOMEPAGE</h1>
      <PostCardContainer
        posts={posts}
        errorMessage="No Relevant Posts... Try following more people"
      />
    </div>
  );
}

export default HomePage;
