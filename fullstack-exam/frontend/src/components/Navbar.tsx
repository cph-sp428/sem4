import { Outlet, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { removeToken } from "../utils/AuthFacade";
import { useEffect } from "react";

function Navbar() {
  const redirect = useNavigate();
  const username = useAuth("user");

  useEffect(() => {
    if (!username) redirect("/login");
  }, []);

  const handleLogout = () => {
    removeToken();
    redirect("/login");
  };

  return (
    <div className="main-div">
      <nav className="">
        <a className="navbar-brand">INSTAGRAM</a>
        {username ? (
          <div>
            <Link to="/home">
              <button>Home</button>
            </Link>
            <Link to="/explore">
              <button>Explore</button>
            </Link>
            <Link to="/user/">
              <button>My Profile</button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">Register</Link>
          </div>
        )}
        {username ? <button onClick={handleLogout}>Logout</button> : ""}
      </nav>

      <Outlet />
    </div>
  );
}

export default Navbar;
