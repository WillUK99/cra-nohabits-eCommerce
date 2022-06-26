import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { emailSignUpStart } from '../../store/user/user.action'

import FormInput from '../form-input/form-input.component'
import Button from "../button/button.component"

import { SignUpContainer } from "./sign-up-form.styles.jsx"

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

function SignUpForm() {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try { 
      dispatch(emailSignUpStart(email, password, displayName))
      resetFormFields()
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already in use")
      } else {
        console.log("Oops something went wrong", err)
      }
    }
  }

  return (

    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Display Name"
          inputOptions={{
            required: true,
            type: "text",
            onChange: handleChange,
            name: "displayName",
            value: displayName,
            shrink: true,
          }}
        />

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

        <FormInput
          label="Confirm Password"
          inputOptions={{
            required: true,
            type: "password",
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword
          }}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm