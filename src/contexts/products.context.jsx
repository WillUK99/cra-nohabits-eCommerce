import React, { createContext, useState, useEffect } from 'react'

import PRODUCTS from "../shop-data.json" // mock data

export const ProductsContext = createContext({
  // the initial state of the context should be empty/null
  products: [],
  setProducts: () => null
})

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS) // setting intial state of products from our mock data
  const value = { products, setProducts } // 'value' allows us to acces the products/setProducts from the context object

  // useEffect(() => {
  //   console.log("ProductProvider: useEffect")
    
  // }, [])

  return (
    <ProductsContext.Provider value={value}> {/*this is the value you want to access from the context*/}
      {children} {/* this is the component that is being rendered in this case its children*/}
    </ProductsContext.Provider>
  )
}