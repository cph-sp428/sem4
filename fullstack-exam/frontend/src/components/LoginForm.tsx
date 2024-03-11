import { useState } from "react";
import { JWT_SECRET } from "../config";
import { SignJWT } from "jose";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // TODO: validate username and password

    const alg = 'HS256'
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ username })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secretKey);
    document.cookie = `token=${token}`;

    // TODO: Redirect to protected page
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="username"
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

export default LoginForm;
