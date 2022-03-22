import React, { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from "../button/button.component"

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import "./sign-in-form.styles.scss"

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    setFormFields({
      email: "",
      password: "",
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields()
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("incorrect password")
          break

        case "auth/user-not-found":
          alert("email not found")
          break

        default:
          console.error(err)
      }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup()
      const userDocRef = await createUserDocumentFromAuth(user)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Email"
          inputOptions={{
            required: true,
            type: "email",
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />

        <FormInput
          label="Password"
          inputOptions={{
            required: true,
            type: "password",
            onChange: handleChange,
            name: "password",
            value: password
          }}
        />

        <div className="buttons-container">
          <Button type="submit">Login</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Login</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm