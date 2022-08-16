import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducers/reducers.utils";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
})

// fetchCategoriesStart.type
// fetchCategoriesStart.match

export const fetchCategoriesSuccess = withMatcher((categoriesArr: Category[]): FetchCategoriesSuccess => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArr)
})

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
})
