import React from "react";
import { Link } from "react-router-dom";

function MobileNav({ isLoggedIn, logOutUser, toggleMenu}) {
  return (
    <div className="mobileNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/meals" className="nav-link" onClick={toggleMenu}>
                Meal Plan
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/recipes" className="nav-link" onClick={toggleMenu}>
                Recipes
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/ingredients" className="nav-link" onClick={toggleMenu}>
                Fridge
              </Link>
            </li>

            <li className="nav-item">
              <Link onClick={() => logOutUser} className="nav-link logout-link">
                Logout
              </Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/signup" className="nav-link" onClick={toggleMenu}>
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={toggleMenu}>
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default MobileNav;
