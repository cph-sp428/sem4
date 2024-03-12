import useAuth from "../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_USERNAME } from "../queries/UserByUsername";

function ProfilePage() {
  const { username } = useAuth("user");
  const { loading, error, data } = useQuery(GET_USER_BY_USERNAME, {
    variables: { username: username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome to the profile page</p>
      <h2>Username: {username}</h2>
      <h2>Email: {data.user.email}</h2>
      <h2>Roles: {data.user.roles}</h2>
      <h2>Posts</h2>
      {data.user.posts.length === 0 ? (
        <h3>No posts yet...</h3>
      ) : (
        <ul>
          {data.user.posts.map((post: any) => (
            <li key={post.id}>{post.description}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfilePage;
