import { useMutation } from "@apollo/client";
import { useState } from "react";
import { REGISTER_USER } from "../../graphql/mutations/REGISTER_USER";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
  });

  const validForm = (
    userInfo.username.length > 0 &&
    userInfo.password.length > 0 &&
    userInfo.email.length > 0
  )

  const [registerUser,{error}] = useMutation(REGISTER_USER, {
    variables: {
      username: userInfo.username,
      password: userInfo.password,
      email: userInfo.email,
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validForm) {
      registerUser();
      if(error) {
        alert("Error: " + error.message);
        return;
      }
      alert("User registered!");
      navigate("/login");
    } else {
        alert("Please fill in all fields");
    }
  };

  return (
    <div id="register-page">
      <h1 className=" ">REGISTER</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={userInfo.username}
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <label>Email</label>
        <input
          type="text"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <button className=" border-slate-100" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
