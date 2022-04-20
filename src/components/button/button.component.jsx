import React from 'react'

import {
  BaseButton,
  GoogleButton,
  InvertedButton,
} from "./button.styles.jsx"

/**
 * Button types available to use in the Button component
 */
export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
}

/**
 * Helper function to get the correct button styling
 * @param {string} buttonType - The type of button to render e.g. "base", "google", "inverted"
 */
function getButtonStyling(buttonType = BUTTON_TYPE_CLASSES.base) {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]
}

function Button({ children, buttonType, ...otherProps }) {
  const CustomButton = getButtonStyling(buttonType)
  return (
    <CustomButton {...otherProps}>
      {children}
    </CustomButton>
  )
}

export default Button