/* eslint-disable react/prop-types */
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const PrivateRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default PrivateRoute;
