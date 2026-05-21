// import Container from "react-bootstrap/Container";
import Navigation from "./navigation";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navigation />
      <div className="mt-56">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
