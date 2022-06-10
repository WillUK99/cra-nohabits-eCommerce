import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'


import {
  CartIconContainer,
  ShoppingSVG,
  ItemCount,
} from "./cart-icon.styles.jsx"

function CartIcon() {
  const dispatch = useDispatch()
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)

  const toggleCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

  return (
    <CartIconContainer>
      <ShoppingSVG as={ShoppingIcon} onClick={toggleCartOpen} />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon