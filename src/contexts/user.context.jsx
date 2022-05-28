import React, { createContext, useEffect, useReducer } from 'react'

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils"

// This is the actual value you want to access/this is the value you want to access from the context
export const UserContext = createContext({
  // the initial state of the context - null checking for the user object
  currentUser: null,
  setCurrentUser: () => null,
})

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled action type: ${type} in userReducer`)
  }
}

const INITIAL_STATE = {
  currentUser: null
}

// The actual component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)
  const { currentUser } = state // destructuring the state from userReducer

  console.log('UserProvider: currentUser', currentUser)

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
  }

  // consolidating auth across web app
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      /**
       * if listener detects a user is logged and user != null in we pass the user 
       * of to createUserDocumentFromAuth to create a user doc in the db
       */
      if (user) {
        createUserDocumentFromAuth(user)
      }
      /**
       * previously setting context in seperate location such as sign-in and sign-up.
       * Now this listener will set the context whenever it 'sees' a user has logged in / out
       */
      setCurrentUser(user)
    })
    
    return unsubscribe
  }, [])
  
  const value = { currentUser, setCurrentUser } // 'value' allows us to acces the currentUser/setCurrentUser from the context
  
  return (
    <UserContext.Provider value={value}> {/*this is the value you want to access from the context*/}
      {children} {/* this is the component that is being rendered */}
    </UserContext.Provider>
  )
}


