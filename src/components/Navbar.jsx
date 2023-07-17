import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./../context/auth.context";
import "../css/styles.css";
import logo from "../images/newLogo.png";
import MobileNav from "./MobileNav";
import Hamburger from "./Hamburger";
import DesktopNav from "./DesktopNav";


function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const[showMobile, setShowMobile] = useState(false);

  const toggleMenu = () => {
    setShowMobile(!showMobile)
  }

  return (
    <div>
    <nav className="navbar">
    <Link to="/" className="logoLink">
    <img src={logo} alt="logo" className="newLogo" />
    </Link>
    <DesktopNav isLoggedIn={isLoggedIn} logOutUser={logOutUser}/>
    <Hamburger toggleMenu={toggleMenu}/>
    </nav>
    {showMobile && <MobileNav isLoggedIn={isLoggedIn} logOutUser={logOutUser} toggleMenu={toggleMenu}/>}
</div>
  );
}

export default Navbar;
