import React from 'react';
import hamburger from "../images/menu_FILL0_wght400_GRAD0_opsz48.png";
import { Link } from "react-router-dom";


function Hamburger({toggleMenu}) {
  return (
    <div className='hamburger'>
    <Link onClick={toggleMenu}>
    <img src={hamburger} alt="hamburger" />
    </Link>
    </div>
  )
}

export default Hamburger