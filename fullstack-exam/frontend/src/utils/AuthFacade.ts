import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

const cookies = new Cookies();

export const removeToken = () => {
  cookies.remove("token");
  //redirect("/login");
};

export const setToken = (token: string) => {
  cookies.set("token", token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
  // redirect("/home");
};

export const authenticate = (role: string) => {
  const token : string = cookies.get("token");
  if (!token) {
    return {isValid: false, username: ""};
  }
  const decoded : any = jwtDecode(token);
  const isValid =  decoded.roles.some((r: string) => r === role);
  const username = decoded.username;
  return {isValid, username};
};

