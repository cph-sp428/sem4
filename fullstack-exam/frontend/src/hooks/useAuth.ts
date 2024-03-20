import { useEffect, useRef } from "react";
import { authenticate } from "../utils/AuthFacade";
import { redirect } from "react-router-dom";

function useAuth(role: string) : string | void {

  const currentUser = useRef<string | null>(null);

  const { isValid, username } = authenticate(role);

  useEffect(() => {
    currentUser.current = username;
  }, []);

  if (!isValid) {
    redirect("/login");
  } else {
    return username;
  }
}

export default useAuth;
