import React from 'react';
import { Link } from "react-router-dom";


function DesktopNav({ isLoggedIn, logOutUser }) {
  return (
    <div className='desktopNav'>
        <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/meals" className="nav-link">
                Meal Plan
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/recipes" className="nav-link">
                Recipes
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/ingredients" className="nav-link">
                Fridge
              </Link>
            </li>

            <li className="nav-item">
              <Link onClick={logOutUser} className="nav-link logout-link">
                Logout
              </Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default DesktopNav