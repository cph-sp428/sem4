import { FormEvent, useEffect, useState } from "react";
import { auth, setToken } from "../facades/AuthFacade";
import { useQuery } from "@apollo/client";
import { LOGIN } from "../queries/Login";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, data } = useQuery(LOGIN, {
    variables: { username: username, password: password },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const token = data.login.token;
    setToken(token);
    if(auth("user").isValid){
      navigate("/home");
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="string"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
