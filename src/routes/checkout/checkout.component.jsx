import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total
} from "./checkout.styles.jsx"

function Checkout() {
  const cartItems = useSelector(selectCartItems)
  const totalCartPrice = useSelector(selectCartTotal)

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Details</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {
        cartItems.map((item) => <CheckoutItem key={item.id} cartItem={item} />)
      }
      <Total>Total: £{totalCartPrice}</Total>
    </CheckoutContainer>
  )
}

export default Checkout