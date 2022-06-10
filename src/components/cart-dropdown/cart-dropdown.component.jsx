import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCartItems } from '../../store/cart/cart.selector'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

import {
  CartDropdownContainer,
  CartItemsContainer,
  ButtonStyled,
} from "./cart-dropdown.styles.jsx"

function CartDropdown() {
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)

  const goToCheckoutHandler = () => {
    navigate("/checkout")
  }

  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {
          cartItems.map((item) => <CartItem key={item.id} cartItem={item}></CartItem>)
        }
      </CartItemsContainer>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown