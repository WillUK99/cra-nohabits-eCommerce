import React from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

function SignIn() {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup()
      console.log(user)
      await createUserDocumentFromAuth(user)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign in with google popup
      </button>
    </>
  )
}

export default SignIn