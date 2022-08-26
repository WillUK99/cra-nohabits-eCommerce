import { createAction, ActionWithPayload, withMatcher } from "../../utils/reducers/reducers.utils"
import { CART_ACTION_TYPES, CartItem, CartItems } from "./cart.types"

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_CART_OPEN, boolean>
export type AddItemToCart = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItems>
export type DecreaseItemFromCart = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItems>
export type RemoveItemFromCart = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItems>

export const addCartItem = (cartItems: CartItems, itemToAdd: CartItem) => {
  const isExistingCart = cartItems.find((cartItem) => cartItem.id === itemToAdd.id)
  if (isExistingCart) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    )
  }
  return [...cartItems, { ...itemToAdd, quantity: 1 }]
}

export const decreaseCartItem = (cartItems: CartItems, cartItemToDecrease: CartItem) => {
  const decrementedCartItems = cartItems.map((cartItem) =>
    cartItem.id === cartItemToDecrease.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  )
  const quanityLessThanOne = (item: CartItem) => item.quantity > 0
  return decrementedCartItems.filter(quanityLessThanOne)
}

export const removeCartItem = (cartItems: CartItems, itemToRemove: CartItem) => cartItems.filter((item) => item.id !== itemToRemove.id)

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool)
})

export const addItemToCart = withMatcher((cartItems: CartItems, itemToAdd: CartItem): AddItemToCart => {
  const newCartItems = addCartItem(cartItems, itemToAdd)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
})

export const decreaseItemFromCart = withMatcher((cartItems: CartItems, itemToDecrease: CartItem): DecreaseItemFromCart => {
  const newCartItems = decreaseCartItem(cartItems, itemToDecrease)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
})

export const removeItemFromCart = withMatcher((cartItems: CartItems, itemToRemove: CartItem): RemoveItemFromCart => {
  const newCartItems = removeCartItem(cartItems, itemToRemove)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
})
