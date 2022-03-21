import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as Logo } from "../../assets/crown.svg"

import "./navigation.styles.scss"

function NavBar() {
  return (
    <>
      <div className="navbar">
        <Link className="navbar__logo logo" to="/">
          <Logo></Logo>
        </Link>
        <div className="navbar__links">
          <Link className="navbar__link" to="/shop">
            SHOP
          </Link>
          <Link className="navbar__link" to="/signin">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default NavBar