import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Routes, Route } from 'react-router-dom'

import { setCurrentUser } from './store/user/user.action'
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils"
import "./App.css"
import NavBar from './routes/navigation/navigation.component'
import Home from './routes/home/home.component'
import Authentication from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component'

function App() {
  const dispatch = useDispatch()

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
       * dispatch the setCurrentUser action to set the current user in the store
       */
      dispatch(setCurrentUser(user))
    })

    return unsubscribe
  }, [])

  return (
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop/>} />
          <Route path="auth" element={<Authentication/>} />
          <Route path="checkout" element={<Checkout/>} />
        </Route>
      </Routes> 
  )
}

export default App