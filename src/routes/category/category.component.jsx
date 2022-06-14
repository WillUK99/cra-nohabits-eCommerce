import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCategoriesMap, selectCategoriesLoading } from '../../store/categories/category.selector'

import ProductCard from '../../components/product-card/product-card.component'
import Spinner from '../../components/spinner/spinner.component'

import {
  CategoryTitle,
  CategoryContainer
} from "./category.styles.jsx"

function Category() {
  const { category } = useParams()
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesLoading)
  const [categoryData, setCategoryData] = useState(categoriesMap[category])

  /**
   * Could get the products this way, however, this will cause the entire 
   * component to re-render
   */
  // const products = categoriesMap[category]


  /**
   *  using useEffect and useState means the component will only re-render
   *  if the category in the url changes or if the categoriesMap changes
   * 
   */
  useEffect(() => {
    const categoryData = categoriesMap[category]
    setCategoryData(categoryData)
  }, [category, categoriesMap])

  return (
    <>
      <CategoryTitle>{category}</CategoryTitle>
      {
        isLoading ?
          <Spinner /> :
          <CategoryContainer>
            {
              categoryData && categoryData.map((product) => <ProductCard key={product.id} product={product} />)
            }
          </CategoryContainer>
      }
    </>
  )
}

export default Category