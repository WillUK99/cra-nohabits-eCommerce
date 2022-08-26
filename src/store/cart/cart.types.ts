export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = 'SET_CART_ITEMS',
  SET_CART_OPEN = 'SET_CART_OPEN',
}

export type CartItem = {
  id: number,
  image: string,
  name: string,
  price: number,
  quantity: number,
}

export type CartItems = CartItem[]
