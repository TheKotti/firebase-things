import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { AuthContext } from "./App";

export const useFirebaseAuth = () => {
  const auth = useContext(AuthContext);
  const [user] = useAuthState(auth);

  return { auth, user };
};
