import React from 'react'
import { useSelector } from 'react-redux'

import { selectCategoriesMap } from '../../store/categories/category.selector'

import CategoryPreview from '../../components/category-preview/category-preview.component'


function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap)

  return (
    <>
      {
        /**
         * categoriesMap is an object with keys as category titles and values as arrays of products
         */
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title]
          
          return <CategoryPreview key={title} title={title} products={products}/>
        })
      }
    </>
  )
}

export default CategoriesPreview