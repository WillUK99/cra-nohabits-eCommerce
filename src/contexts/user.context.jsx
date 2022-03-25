import React, { createContext, useState, useEffect } from 'react'

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils"

// This is the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

// The actual component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }

  // consolidating auth across web app
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user)
      /**
       * if listener detects a user is logged and user != null in we pass the user 
       * of to createUserDocumentFromAuth to create a user doc in the db
       */
      if (user) {
        createUserDocumentFromAuth(user)
      }
      /**
       * previously setting context in seperate location such as sign-in and sign-up.
       * Now this listener will set the context whenever is 'sees' a user has logged in / out
       */
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
