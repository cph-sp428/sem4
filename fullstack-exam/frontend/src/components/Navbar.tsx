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
    <div id="main-div">
      {/* <div id="navbar-container" className=" flex flex-row"> */}
        <ul id="navbar">
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
                {/* <div id="search-bar-container">
                  <input
                    id="search-bar"
                    type="text"
                    value={searchCriteria}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                  />
                  <Link to={"/search/" + searchCriteria}>Search</Link>
                </div> */}
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
          {username ? <li onClick={handleLogout}><Link to={""}> Logout </Link></li> : <></>}
        </ul>
      {/* </div> */}
      <div id="content-div">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
