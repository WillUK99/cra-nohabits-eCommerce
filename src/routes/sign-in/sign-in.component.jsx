import React from 'react'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

function SignIn() {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup()
      const userDocRef = await createUserDocumentFromAuth(user)
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
      <SignUpForm></SignUpForm>
    </>
  )
}

export default SignIn