import useAuth from "../../hooks/useAuth";
import { useQuery } from "@apollo/client";
import PostCardContainer from "../posts/PostCardContainer";
import { GET_RELEVANT_POSTS } from "../../graphql/queries/GetRelevantPosts";
import { useEffect, useState } from "react";
import Post from "../../types/Post";

function HomePage() {
  const username: string | void = useAuth("user");

  const { loading, error, data } = useQuery(GET_RELEVANT_POSTS, {
    variables: { username: username },
  });

  const posts = data ? data.getRelevantPosts : [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Home Page</h1>
      <PostCardContainer
        posts={posts}
        errorMessage="No Relevant Posts... Try following more people"
      />
    </div>
  );
}

export default HomePage;
