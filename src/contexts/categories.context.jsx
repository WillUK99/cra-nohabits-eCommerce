import React, { createContext, useState, useEffect } from 'react'

import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js'

import SHOP_DATA from "../shop-data.js" // mock data

export const CategoriesContext = createContext({
  // the initial state of the context should be empty.
  categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})
  
  // useEffect(() => {
  //   // writing shopdata to firebase
  //    addCollectionAndDocuments('categories', SHOP_DATA)
  // }, [])
  
  useEffect(() => {
    // fetching/reading data from firebase
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments()
      // console.log(categoriesMap)
      setCategoriesMap(categoriesMap)
    }
    getCategoriesMap()
  }, [])
  
  const value = { categoriesMap } // 'value' allows us to acces the products/setProducts from the context object
  
  return (
    <CategoriesContext.Provider value={value}> {/*this is the value you want to access from the context*/}
      {children} {/* this is the component that is being rendered in this case its children*/}
    </CategoriesContext.Provider>
  )
}