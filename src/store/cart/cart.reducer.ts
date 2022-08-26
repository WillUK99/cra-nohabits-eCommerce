import { AnyAction } from "redux"
import { CartItems } from "./cart.types"
import {
  setIsCartOpen,
  addItemToCart,
  decreaseItemFromCart,
  removeItemFromCart
} from "./cart.action"

export type CartState = {
  isCartOpen: boolean,
  cartItems: CartItems, 
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
}

export const cartReducer = (state = INITIAL_STATE, action = {} as AnyAction): CartState => {
 if (setIsCartOpen.match(action)) {
  return {
    ...state,
    isCartOpen: action.payload
  }
 }

 if (addItemToCart.match(action)) {
  return {
    ...state,
    cartItems: action.payload
  }
 }

 if (decreaseItemFromCart.match(action)) {
  return {
    ...state,
    cartItems: action.payload
  }
 }

 if (removeItemFromCart.match(action)) {
  return {
    ...state,
    cartItems: action.payload
  }
 }

 return state
}
