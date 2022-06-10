import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCurrentUser } from '../../store/user/user.selector'
import { selectIsCartOpen } from '../../store/cart/cart.selector'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { signOutUser } from "../../utils/firebase/firebase.utils"
import { ReactComponent as Logo } from "../../assets/crown.svg"

import "./navigation.styles.jsx"

import { 
  NavigationContainer, 
  LogoContainer,
  NavLinksContainer,
  NavLink,
 } from "./navigation.styles.jsx"

function NavBar() {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

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