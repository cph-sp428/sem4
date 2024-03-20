import { Outlet, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { authenticate, removeToken } from "../utils/AuthFacade";
import { useEffect } from "react";

function Navbar() {
  const redirect = useNavigate();
  let username = useAuth("user");
  const { isValid } = authenticate("admin");

  useEffect(() => {
    if(!username){
      handleLogout();
    }
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
          {username ? <li onClick={handleLogout}><a>Logout</a></li> : <></>}
        </ul>
      {/* </div> */}
      <div id="content-div">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
