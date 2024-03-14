import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../../graphql/queries/GetAllPosts";
import PostCardContainer from "../posts/PostCardContainer";

function ExplorePage() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) throw error;


  return (
    <div id="explore-page-container">
      <h1>EXPLORE</h1>
      <PostCardContainer
        posts={data.getAllPosts}
        errorMessage="911 - MASSIVE SERVER ERROR..."
      />
    </div>
  );
}

export default ExplorePage;
