import React, { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { ReactComponent as Logo } from "../../assets/crown.svg"
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

import { signOutUser } from "../../utils/firebase/firebase.utils"

import "./navigation.styles.jsx"

import { 
  NavigationContainer, 
  LogoContainer,
  NavLinksContainer,
  NavLink,
 } from "./navigation.styles.jsx"

function NavBar() {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo></Logo>
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {
            currentUser ?
              (<NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>)
              :
              (<NavLink to="/auth">SIGN IN</NavLink>)
          }
          <CartIcon></CartIcon>
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default NavBar