import { Outlet } from "react-router-dom";
import Navbar from "../NavBar";

const NavHeader = () => (
  <>
    <header>
      <Navbar />
    </header>
    <Outlet />
  </>
);

export default NavHeader;
