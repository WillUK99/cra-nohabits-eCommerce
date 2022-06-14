import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { fetchCategoriesAsync } from "../../store/categories/category.action"

import CategoryPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'

import "./shop.styles.scss"

function Shop() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategoriesAsync())
  }, [])

  return (
    <Routes>
      <Route index element={<CategoryPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop