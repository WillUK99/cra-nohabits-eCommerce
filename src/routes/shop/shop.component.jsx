import React, { useContext } from 'react'
import ProductCard from '../../components/product-card/product-card.component'
import { CategoriesContext } from '../../contexts/categories.context'

import "./shop.styles.scss"

function Shop() {
  const { categoriesMap } = useContext(CategoriesContext)
  // console.log(categoriesMap)
  return (
    <>
      {
        Object.keys(categoriesMap).map(categoryTitle => {
          // console.log(categoriesMap[categoryTitle])
          /**
           * Getting the keys from the categoriesMap object passed from the CategoriesContext,
           * we are then mapping over this array of keys in this example each key is a "categoryTitle".
           * We are then able to access each array of products in the categoriesMap object using the [] operator.
           * This then gives us all of the category items to then loop through.
           */
          const categoryItems = categoriesMap[categoryTitle]
          return (
            <>
              <h2>{categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1)}</h2>
              <div className="products-container">
                {
                  categoryItems.slice(0, 4).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                }
              </div>
            </>
          )
        })
      }
      <div className='products-container'>

      </div>
    </>
  )
}

export default Shop