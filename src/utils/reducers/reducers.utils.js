export const createAction = (type, payload) => ({ type, payload })

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
