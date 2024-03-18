import { authenticate } from "../utils/AuthFacade";
import { redirect } from "react-router-dom";

function useAuth(role: string) : string | void {
  const { isValid, username } = authenticate(role);

  if (!isValid) {
    redirect("/login");
  } else {
    return username;
  }
}

export default useAuth;
