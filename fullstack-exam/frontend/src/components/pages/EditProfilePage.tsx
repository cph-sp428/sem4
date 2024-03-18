import useAuth from "../../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_USERNAME } from "../../graphql/queries/GET_USER_BY_USERNAME";
import { useState } from "react";
import User from "../../types/User";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { UPDATE_USER } from "../../graphql/mutations/UPDATE_USER";

function EditProfilePage() {
  const navigate = useNavigate();
  const username = useAuth("user");
  const { loading, error, data } = useQuery(GET_USER_BY_USERNAME, {
    variables: { username: username },
  });

  const [user, setUser] = useState<User>(data.userByUsername);

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: {
      userId: data.userByUsername.id,
      username: user.username,
      password: user.password,
      email: user.email,
    },
    refetchQueries: [
      { query: GET_USER_BY_USERNAME, variables: { username: user.username } },
    ],
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    alert("Error: " + error.message);
    navigate("/home");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser();
    navigate("/user/");
  };

  return (
    <>
      <h1> EDIT PROFILE </h1>

      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <label>Email</label>
        <input
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default EditProfilePage;
