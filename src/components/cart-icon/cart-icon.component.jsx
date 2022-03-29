import React, {useContext} from 'react'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { CartContext } from '../../contexts/cart.context'

import "./cart-icon.styles.scss"

function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartItems, cartCount } = useContext(CartContext)

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  const cartItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)

  return (
    <div className='cart-icon-container'>
      <ShoppingIcon className="shopping-icon" onClick={toggleIsCartOpen}/>
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon