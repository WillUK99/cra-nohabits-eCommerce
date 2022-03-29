import React, { createContext, useState, useEffect } from 'react'

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils"

// This is the actual value you want to access/this is the value you want to access from the context
export const UserContext = createContext({
  // the initial state of the context - null checking for the user object
  currentUser: null,
  setCurrentUser: () => null,
})

// The actual component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser } // 'value' allows us to acces the currentUser/setCurrentUser from the context

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

  return (
    <UserContext.Provider value={value}> {/*this is the value you want to access from the context*/}
      {children} {/* this is the component that is being rendered */}
    </UserContext.Provider>
  )
}
