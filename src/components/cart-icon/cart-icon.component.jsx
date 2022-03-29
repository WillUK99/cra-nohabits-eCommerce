import React, {useContext} from 'react'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { CartContext } from '../../contexts/cart.context'

import "./cart-icon.styles.scss"

function CartIcon() {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext)

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <div className='cart-icon-container'>
      <ShoppingIcon className="shopping-icon" onClick={toggleIsCartOpen}/>
      <span className='item-count'>1</span>
    </div>
  )
}

export default CartIcon