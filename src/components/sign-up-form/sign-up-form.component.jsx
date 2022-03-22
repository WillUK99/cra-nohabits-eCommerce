import React, { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from "../button/button.component"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import "./sign-up-form.styles.scss"
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => {
    setFormFields({
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
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
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      const userDocRef = await createUserDocumentFromAuth(user, { displayName })
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

    <div className="sign-up-container">
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

        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default SignUpForm