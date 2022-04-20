import React, {useContext} from 'react'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { CartContext } from '../../contexts/cart.context'

import {
  CartIconContainer,
  ShoppingSVG,
  ItemCount,
} from "./cart-icon.styles.jsx"

function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <CartIconContainer>
      <ShoppingSVG as={ShoppingIcon} onClick={toggleIsCartOpen}/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon