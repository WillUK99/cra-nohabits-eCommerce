import React, { createContext, useEffect, useState } from 'react'

const addCartItem = (cartItems, itemToAdd) => {
  // find if cartItems contains itemToAdd
  /**
   * If the item we want to adds id is already in the cartItems[], then we will return that cartItem
   */
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToAdd.id)

  // if it does, increase quantity
  /**
   * Now that we know the cartItem we want to add is already in the cartItems[], we will increase the quantity.
   * We will map through the cartItems and return the cartItem which matches that of the itemToAdd.id 
   * Then we will increase the quanity property in the cartItem object by 1
   * - note we are spreading all other properties back into the object as we don't want to change these. 
   * Else we will return the CartItem object and continue looping through the array
   */
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    )
  }

  // else create a new cartItem
  // return new array with modified cartItems /new cart item
  return [...cartItems, { ...itemToAdd, quantity: 1 }]
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  cartCount: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const totalCartCount = cartItems.reduce((accum, curr) => accum + curr.quantity, 0)
    setCartCount(totalCartCount)
  }, [cartItems])
  
  const addItemToCart = (itemToAdd) => {
    setCartItems(addCartItem(cartItems, itemToAdd))
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}