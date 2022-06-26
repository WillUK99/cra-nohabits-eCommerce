import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"

import {
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action'

import {
  SignInContainer,
  ButtonsContainer
} from "./sign-in-form.styles.jsx"

const defaultFormFields = {
  email: "",
  password: "",
}

function SignInForm() {
  const dispatch = useDispatch()
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
    if (!email || !password) {
      alert("Invalid form field")
      return
    }
    try {
      dispatch(emailSignInStart(email, password))
      resetFormFields()
    } catch (error) {
      console.log(error)
    }
  }

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart())
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
          <Button type="submit" onClick={handleSubmit}>Login</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Login</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm