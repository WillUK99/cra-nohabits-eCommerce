import { createSelector } from 'reselect'
import { CartState } from './cart.reducer'

const selectCartReducerSlice = (state): CartState => state.cart

export const selectIsCartOpen = createSelector(
  [selectCartReducerSlice],
  (cartSlice) => cartSlice.isCartOpen
)

export const selectCartItems = createSelector(
  [selectCartReducerSlice],
  (cartSlice) => cartSlice.cartItems
)

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0)
)
