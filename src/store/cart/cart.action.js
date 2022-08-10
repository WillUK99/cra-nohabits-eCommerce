import { createAction } from "../../utils/reducers/reducers.utils"
import { CART_ACTION_TYPES } from "./cart.types"

export const addCartItem = (cartItems, itemToAdd) => {
  const isExistingCart = cartItems.find((cartItem) => cartItem.id === itemToAdd.id)
  if (isExistingCart) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    )
  }
  return [...cartItems, { ...itemToAdd, quantity: 1 }]
}

export const decreaseCartItem = (cartItems, cartItemToDecrease) => {
  const decrementedCartItems = cartItems.map((cartItem) =>
    cartItem.id === cartItemToDecrease.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  )
  const quanityLessThanOne = (item) => item.quantity > 0
  return decrementedCartItems.filter(quanityLessThanOne)
}

export const removeCartItem = (cartItems, itemToRemove) => cartItems.filter((item) => item.id !== itemToRemove.id)

export const setIsCartOpen = (bool) => {
  return createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool)
}

export const addItemToCart = (cartItems, itemToAdd) => {
  const newCartItems = addCartItem(cartItems, itemToAdd)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const decreaseItemFromCart = (cartItems, itemToDecrease) => {
  const newCartItems = decreaseCartItem(cartItems, itemToDecrease)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, itemToRemove) => {
  const newCartItems = removeCartItem(cartItems, itemToRemove)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}
