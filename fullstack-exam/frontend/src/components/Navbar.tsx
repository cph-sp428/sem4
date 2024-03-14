import { Outlet, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { authenticate, removeToken } from "../utils/AuthFacade";
import { useEffect, useState } from "react";

function Navbar() {
  const redirect = useNavigate();
  const username = useAuth("user");
  const { isValid } = authenticate("admin");
  const [searchCriteria, setSearchCriteria] = useState("");

  useEffect(() => {
    if (!username) redirect("/login");
  }, []);

  const handleLogout = () => {
    removeToken();
    redirect("/login");
  };

  return (
    <div className="main-div">
      <ul id="navbar">
        <li>
          <a className="navbar-brand">INSTAGRAM</a>
        </li>
        {isValid ? (
          <li>
            <Link to="/admin">Admin Page</Link>
          </li>
        ) : (
          <></>
        )}
        {username ? (
          <>
            <li>
              <input id="search-bar"
                type="text"
                value={searchCriteria}
                onChange={(e) => setSearchCriteria(e.target.value)}
              />
              <Link to={"/search/" + searchCriteria}>Search</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <Link to="/user/">My Profile</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        {username ? <li onClick={handleLogout}>Logout</li> : <></>}
      </ul>
      <div id="content-div">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
