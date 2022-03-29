import React, { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { ReactComponent as Logo } from "../../assets/crown.svg"
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

import { signOutUser } from "../../utils/firebase/firebase.utils"

import "./navigation.styles.scss"

function NavBar() {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

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
          <CartIcon></CartIcon>
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  )
}

export default NavBar