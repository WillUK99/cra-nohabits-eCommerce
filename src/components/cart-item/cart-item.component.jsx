import React from 'react'

import {
  CartItemContainer,
  ItemDetailsContainer,
  ItemName,
} from "./cart-item.styles.jsx"

function CartItem({ cartItem }) {
  const { name, price, quantity, imageUrl } = cartItem

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetailsContainer>
        <ItemName>{name}</ItemName>
        <span>£{price} x {quantity}</span>
      </ItemDetailsContainer>
    </CartItemContainer>
  )
}

export default CartItem
