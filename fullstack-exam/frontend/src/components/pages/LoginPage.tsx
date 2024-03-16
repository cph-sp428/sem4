import { useState } from "react";
import { authenticate, setToken } from "../../utils/AuthFacade";
import { useLazyQuery, useQuery } from "@apollo/client";
import { LOGIN } from "../../graphql/queries/Login";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {loading, error, data} = useQuery(LOGIN, {
    variables: { username: username, password: password },
  });

  const validateForm = (
    username.length > 0 &&
    password.length > 0
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm) {
      alert("Please fill in all fields");
      setUsername("");
      setPassword("");
      return;
    }
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const token = data.login.token;
    setToken(token);
    if (authenticate("user").isValid) {
      navigate("/home");
    }
  };

  return (
    <div id="login-page-container">
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="string"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className=" border-orange-200" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
