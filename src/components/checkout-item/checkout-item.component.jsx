import React, { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import {
  CheckoutItemContainer,
  ImageContainer,
  CheckoutItemName,
  CheckoutItemPrice,
  CheckoutItemQuantity,
  CheckoutItemQuantityArrow,
  CheckoutItemQuantityValue,
  CheckoutItemRemoveButton
} from "./checkout-item.styles.jsx"

function CheckoutItem({ cartItem }) {
  const { addItemToCart, decreaseItemFromCart, removeItemFromCart } = useContext(CartContext)
  const { name, imageUrl, price, quantity } = cartItem

  const increaseItemHandler = () => addItemToCart(cartItem)
  const decreaseItemHandler = () => decreaseItemFromCart(cartItem)
  const removeItemHandler = () => removeItemFromCart(cartItem)

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <CheckoutItemName>{name}</CheckoutItemName>
      <CheckoutItemQuantity>
        <CheckoutItemQuantityArrow onClick={decreaseItemHandler}>&#10094;</CheckoutItemQuantityArrow>
        <CheckoutItemQuantityValue>{quantity}</CheckoutItemQuantityValue>
        <CheckoutItemQuantityArrow onClick={increaseItemHandler}>&#10095;</CheckoutItemQuantityArrow>
      </CheckoutItemQuantity>
      <CheckoutItemPrice>£{price}</CheckoutItemPrice>
      <CheckoutItemRemoveButton onClick={removeItemHandler}>&#10005;</CheckoutItemRemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
