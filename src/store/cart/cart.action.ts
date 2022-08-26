import { createAction, ActionWithPayload, withMatcher } from "../../utils/reducers/reducers.utils"
import { CART_ACTION_TYPES, CartItem } from "./cart.types"
import { CategoryItem } from "../categories/category.types"

export const addCartItem = (cartItems: CartItem[], itemToAdd: CategoryItem): CartItem[] => {
  const isExistingCartItem = cartItems.find((cartItem) => cartItem.id === itemToAdd.id)

  if (isExistingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    )
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }]
}

export const decreaseCartItem = (cartItems: CartItem[], cartItemToDecrease: CartItem): CartItem[] => {
  const isExistingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToDecrease.id)

  if (isExistingCartItem && isExistingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToDecrease.id)
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToDecrease.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  )
}

export const removeCartItem = (cartItems: CartItem[], itemToRemove: CategoryItem): CartItem[] => cartItems.filter((item) => item.id !== itemToRemove.id)

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_CART_OPEN, boolean>
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool)
})

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
})

export const addItemToCart = (cartItems: CartItem[], itemToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, itemToAdd)
  return setCartItems(newCartItems)
}

export const decreaseItemFromCart = (cartItems: CartItem[], itemToDecrease: CartItem) => {
  const newCartItems = decreaseCartItem(cartItems, itemToDecrease)
  return setCartItems(newCartItems)
}

export const removeItemFromCart = (cartItems: CartItem[], itemToRemove: CartItem) => {
  const newCartItems = removeCartItem(cartItems, itemToRemove)
  return setCartItems(newCartItems)
}
