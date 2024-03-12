import { auth } from "../facades/AuthFacade";
import { redirect } from "react-router-dom";

function useAuth(role: string) {
  const { isValid, username } = auth(role);

  if (!isValid) {
    redirect("/login");
  }

    return username;
}

export default useAuth;
