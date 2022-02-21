import { useFirebaseAuth } from "../hooks";

const SignOut = () => {
  const { auth, user } = useFirebaseAuth();

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div>
      {user?.displayName}
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default SignOut;
