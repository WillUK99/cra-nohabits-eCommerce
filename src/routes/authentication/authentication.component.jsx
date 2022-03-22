import React from 'react'

import SignInForm from "../../components/sign-in-form/sign-in-form.component"
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

import "./authentication.styles.scss"

function Authentication() {
  return (
    <div className="authentication-container">
      <SignInForm></SignInForm>
      <SignUpForm></SignUpForm>
    </div>
  )
}

export default Authentication