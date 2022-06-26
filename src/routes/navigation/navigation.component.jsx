import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectCurrentUser } from '../../store/user/user.selector'
import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { signOutStart } from '../../store/user/user.action'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { ReactComponent as Logo } from "../../assets/crown.svg"

import "./navigation.styles.jsx"

import { 
  NavigationContainer, 
  LogoContainer,
  NavLinksContainer,
  NavLink,
 } from "./navigation.styles.jsx"

function NavBar() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  const signOut = async () => {
    dispatch(signOutStart())
  }

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
              (<NavLink as="span" onClick={signOut}>SIGN OUT</NavLink>)
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