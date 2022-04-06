import React, { useContext } from 'react'

import CategoryPreview from '../../components/category-preview/category-preview.component'

import { CategoriesContext } from '../../contexts/categories.context'


function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesContext)
  // console.log(categoriesMap)
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