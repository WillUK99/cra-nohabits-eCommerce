import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addItemToCart, decreaseItemFromCart, removeItemFromCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'

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
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  
  const { name, imageUrl, price, quantity } = cartItem

  const increaseItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))
  const decreaseItemHandler = () => dispatch(decreaseItemFromCart(cartItems, cartItem))
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))

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
