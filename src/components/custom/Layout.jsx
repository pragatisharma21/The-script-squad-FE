/* eslint-disable react/prop-types */

import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const location = useLocation();
  const hideNavbarRoutes = ["/sign-up", "/sign-in"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && (
        <div className="mt-7 px-4">
          <Navbar />
        </div>
      )}
      <main>{children}</main>
    </>
  );
}
