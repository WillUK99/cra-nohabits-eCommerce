import React, { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import {
  SignInContainer,
  ButtonsContainer
} from "./sign-in-form.styles.jsx"

const defaultFormFields = {
  email: "",
  password: "",
}

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      // As the user should already be in the db we don't need to create another document for them, just authenticate them
      const { user } = await signInAuthUserWithEmailAndPassword(email, password)

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
      await signInWithGooglePopup()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SignInContainer>
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

        <ButtonsContainer>
          <Button type="submit">Login</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Login</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm