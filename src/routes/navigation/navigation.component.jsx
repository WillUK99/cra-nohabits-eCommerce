import React, { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'

import { ReactComponent as Logo } from "../../assets/crown.svg"
import { UserContext } from '../../contexts/user.context'

import { signOutUser } from "../../utils/firebase/firebase.utils"

import "./navigation.styles.scss"

function NavBar() {
  const { currentUser } = useContext(UserContext)

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
          {
            currentUser ?
              (<span className="navbar__link" onClick={signOutUser}>SIGN OUT</span>)
              :
              (<Link className="navbar__link" to="/auth">SIGN IN</Link>)
          }
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default NavBar