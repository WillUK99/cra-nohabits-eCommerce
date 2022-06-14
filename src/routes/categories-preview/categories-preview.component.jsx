import React from 'react'
import { useSelector } from 'react-redux'

import { selectCategoriesMap, selectCategoriesLoading } from '../../store/categories/category.selector'

import CategoryPreview from '../../components/category-preview/category-preview.component'
import Spinner from '../../components/spinner/spinner.component'

function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesLoading)

  return (
    /**
     * categoriesMap is an object with keys as category titles and values as arrays of products
     */
    <>
      {
        isLoading ?
          <Spinner /> :
          Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title]

            return <CategoryPreview key={title} title={title} products={products} />
          })
      }
    </>
  )
}

export default CategoriesPreview