/* eslint-disable react/prop-types */

import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <div className="mt-7 mx-7">
        <Navbar />
      </div>
      <main>{children}</main>
    </>
  );
}
