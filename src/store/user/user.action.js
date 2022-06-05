import { createAction } from '../../utils/reducers/reducers.utils'
import { USER_ACTION_TYPES } from './user.types'

/**
 * 
 * @param {*} user 
 * @returns {object} Object with type and payload properties - type is USER_ACTION_TYPES.SET_CURRENT_USER and payload is the user object 
 */
export const setCurrentUser = (user) => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
}
