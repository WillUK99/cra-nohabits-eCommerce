import React, { useState } from 'react'

import {
  GlobalStyle,
  InputContainer,
  InputField,
  InputLabel,
} from "./form-input.styles.jsx"

function FormInput({ label, inputOptions }) {
  return (
    <>
      <GlobalStyle />
      <InputContainer>
        <InputField {...inputOptions} />
        {
          label &&
          <InputLabel shrink={inputOptions.value.length}>
            {label}
          </InputLabel>
        }
      </InputContainer>
    </>
  )
}

export default FormInput