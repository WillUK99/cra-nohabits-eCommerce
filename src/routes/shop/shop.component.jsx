import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setCategoriesMap } from "../../store/categories/category.action"
import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils.js'

import CategoryPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'

import "./shop.styles.scss"

// Add category fetch here for redux

function Shop() {
  const dispatch = useDispatch()

  useEffect(() => {
    // fetching/reading data from firebase
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments()
      dispatch(setCategoriesMap(categoriesMap))
    }
    getCategoriesMap()
  }, [])

  return (
    <Routes>
      <Route index element={<CategoryPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop