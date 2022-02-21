import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useFirebaseAuth } from "../hooks";

const SignIn = () => {
  const { auth } = useFirebaseAuth();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return <button onClick={signInWithGoogle}>Google sign in</button>;
};

export default SignIn;
