import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/queries/GetAllPosts";
import PostCardContainer from "./posts/PostCardContainer";
import Post from "../types/Post";

function ExplorePage() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) throw error;

  data.getAllPosts.sort( (a: Post,b : Post) => {
    a.createdAt > b.createdAt ? -1 : 1
  })

  return (
    <div id="explore-page-container">
      <PostCardContainer
        posts={data.getAllPosts}
        errorMessage="911 - MASSIVE SERVER ERROR..."
      />
    </div>
  );
}

export default ExplorePage;
