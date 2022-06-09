export const selectCategoriesMap = (state) => {
  const { categories } = state.categories

  const categoriesMap = categories.reduce((acc, category) => {
    const { title, items } = category
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoriesMap
}
