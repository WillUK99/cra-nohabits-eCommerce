import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setCategories } from "../../store/categories/category.action"
import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils.js'

import CategoryPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'

import "./shop.styles.scss"

function Shop() {
  const dispatch = useDispatch()

  useEffect(() => {
    // fetching/reading data from firebase
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments()
      dispatch(setCategories(categoriesArray))
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