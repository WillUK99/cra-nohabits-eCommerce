import React, { createContext, useState, useReducer } from 'react'

const addCartItem = (cartItems, itemToAdd) => {
  // find if cartItems contains itemToAdd
  /**
   * If the item we want to adds id is already in the cartItems[], then we will return that cartItem
   */
  const isExistingCart = cartItems.find((cartItem) => cartItem.id === itemToAdd.id)

  // if it does, increase quantity
  /**
   * Now that we know the cartItem we want to add is already in the cartItems[], we will increase the quantity.
   * We will map through the cartItems and return the cartItem which matches that of the itemToAdd.id 
   * Then we will increase the quanity property in the cartItem object by 1
   * - note we are spreading all other properties back into the object as we don't want to change these. 
   * Else we will return the CartItem object and continue looping through the array
   */
  if (isExistingCart) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    )
  }

  // else create a new cartItem
  // return new array with modified cartItems /new cart item
  return [...cartItems, { ...itemToAdd, quantity: 1 }]
}

const decreaseCartItem = (cartItems, cartItemToDecrease) => {
  const decrementedCartItems = cartItems.map((cartItem) =>
    cartItem.id === cartItemToDecrease.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  )

  const quanityLessThanOne = (item) => item.quantity > 0

  return decrementedCartItems.filter(quanityLessThanOne)
}

const removeCartItem = (cartItems, itemToRemove) => cartItems.filter((item) => item.id !== itemToRemove.id)


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  decreaseItemFromCart: () => { },
  removeItemFromCart: () => { },
  cartCount: 0,
  totalCartPrice: 0,
})

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  console.log(action)
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload // spread in the entire payload object
      }
    default:
      throw new Error(`Unhandled action type: ${type} in cartReducer`)
  }
}

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  const { cartItems, cartCount, totalCartPrice, } = state

  /**
   * 
   * @param {array} newCartItems
   * NOTE: This is a reducer, so we are not updating the state directly, but instead we are passing in the new state to the cartReducer in the form of a payload.
   */
  const updateCartItemsReducer = (newCartItems) => {
    const newTotalCartCount = newCartItems.reduce((accum, curr) => accum + curr.quantity, 0)
    const newCartTotalPrice = newCartItems.reduce((accum, curr) => accum + curr.price * curr.quantity, 0)

    const payload = {
      cartItems: newCartItems,
      cartCount: newTotalCartCount,
      cartTotal: newCartTotalPrice,
    }

    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload })
  }

  const addItemToCart = (itemToAdd) => {
    const newCartItems = addCartItem(cartItems, itemToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const decreaseItemFromCart = (itemToDecrease) => {
    const newCartItems = decreaseCartItem(cartItems, itemToDecrease)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemFromCart = (itemToRemove) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    totalCartPrice,
    setIsCartOpen,
    addItemToCart,
    decreaseItemFromCart,
    removeItemFromCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}