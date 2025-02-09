/* eslint-disable react/prop-types */

import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const location = useLocation();
  const hideNavbarRoutes = ["/sign-up", "/sign-in"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="md:px-16 px-4">
      {!shouldHideNavbar && (
        <div className="mt-7">
          <Navbar />
        </div>
      )}
      <main>{children}</main>
    </div>
  );
}
