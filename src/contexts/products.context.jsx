import React, { createContext, useState, useEffect } from 'react'

import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js'

import SHOP_DATA from "../shop-data.js" // mock data

export const ProductsContext = createContext({
  // the initial state of the context should be empty/null
  products: [],
  setProducts: () => null
})

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]) // setting intial state of products from our mock data
  const value = { products, setProducts } // 'value' allows us to acces the products/setProducts from the context object

  // useEffect(() => {
  //   // setting shopdata to firebase
  //    addCollectionAndDocuments('categories', SHOP_DATA)
  // }, [])
   
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments()
      // console.log(categoriesMap)
    }
    getCategoriesMap()
  }, [])

  return (
    <ProductsContext.Provider value={value}> {/*this is the value you want to access from the context*/}
      {children} {/* this is the component that is being rendered in this case its children*/}
    </ProductsContext.Provider>
  )
}