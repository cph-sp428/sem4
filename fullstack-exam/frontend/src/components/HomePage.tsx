import useAuth from "../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { RELEVANT_POSTS } from "../queries/RelevantPosts";

function HomePage() {
  const username : string = useAuth("user");

  const { loading, error, data } = useQuery(RELEVANT_POSTS, {
    variables: { username: username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page</p>
      <h2>Relevant posts</h2>
      {data.relevantPostsByUsername.length === 0 && 
      <h3>No relevant posts... try following some more people</h3>
      }
      <ul>
        {data.relevantPostsByUsername.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
