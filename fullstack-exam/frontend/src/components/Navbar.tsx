import { Outlet, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { removeToken } from "../facades/AuthFacade";

function Navbar() {
  const redirect = useNavigate();
  const username = useAuth("user");

  if (!username) redirect("/login");
  else redirect("/home");

  const handleLogout = () => {
    removeToken();
    redirect("/login");
  };

  return (
    <>
      <nav className="navbar">
        <a className="navbar-brand">INSTAGRAM</a>
        {username ? (
          <Link to="/home">
            <button>Home</button>
          </Link>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        {username ? (
          <Link to="/profile">
            <button>Profile</button>
          </Link>
        ) : (
          <Link to="/register">Register</Link>
        )}

        {username ? <button onClick={handleLogout}>Logout</button> : ""}
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
