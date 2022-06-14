import { CATEGORIES_ACTION_TYPES } from "./category.types";

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils.js'
import { createAction } from "../../utils/reducers/reducers.utils";

export const setCategories = (categories) => {
  return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
}

export const fetchCategoriesStart = () => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
}

export const fetchCategoriesSuccess = (categoriesArr) => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArr)
}

export const fetchCategoriesFailed = (error) => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
}

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart())
  try {
    const categoriesArray = await getCategoriesAndDocuments()
    dispatch(fetchCategoriesSuccess(categoriesArray))
  } catch (error) {
    dispatch(fetchCategoriesFailed(error))
  }
}