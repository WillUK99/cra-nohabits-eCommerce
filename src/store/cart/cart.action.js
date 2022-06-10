import { createAction, addCartItem, decreaseCartItem, removeCartItem } from "../../utils/reducers/reducers.utils"
import { CART_ACTION_TYPES } from "./cart.types"

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
