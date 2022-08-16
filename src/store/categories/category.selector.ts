import { createSelector } from 'reselect'
import { CategoriesState } from './category.reducer'
import { CategoryMap } from './category.types'

//Get the slice we want to use in our store
const selectCategoryReducerSlice = (state): CategoriesState => state.categories

// Select the categories state from the store and memoize the result
export const selectCategories = createSelector(
  [selectCategoryReducerSlice],
  (categoriesSlice) => categoriesSlice.categories
)

// Create categoriesMap selector that memoizes the result
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => categories.reduce((acc, category) => {
    const { title, items } = category
    acc[title.toLowerCase()] = items
    return acc
  }, {} as CategoryMap)
)

export const selectCategoriesLoading = createSelector(
  [selectCategoryReducerSlice],
  (categoriesSlice) => categoriesSlice.isLoading
)
