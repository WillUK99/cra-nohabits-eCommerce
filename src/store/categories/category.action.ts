import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducers/reducers.utils";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => {
  /**
   * We don't need to pass the function an explicit type - TS can implicitly pass through the type - due to us using an enum value
   */
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
})

/**
 * Below are the two methods we assign to action creator functions -> see reducer.utils
 * 
 * .type returns back the type of the action -> eg CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
 * .match() is a type predicate which allows for the narrowing of this functions type. 
 */
// fetchCategoriesStart.type
// fetchCategoriesStart.match

export const fetchCategoriesSuccess = withMatcher((categoriesArr: Category[]): FetchCategoriesSuccess => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArr)
})

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
})
