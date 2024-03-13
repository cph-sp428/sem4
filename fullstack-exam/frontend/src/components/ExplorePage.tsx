import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/queries/GetAllPosts";
import PostCardContainer from "./PostCardContainer";
import { useEffect, useState } from "react";

function ExplorePage() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data) {
      setPosts(data.getAllPosts);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) throw error;

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
