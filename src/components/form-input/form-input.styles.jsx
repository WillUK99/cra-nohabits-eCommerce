import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --main-color: black;
    --sub-color: grey;
  }
`

const ShrinkLabelMixin = css`
  top: -20px;
  font-size: 12px;
  color: var(--main-color);
`

export const InputContainer = styled.div`
  position: relative;
  margin: 45px 0;
`

export const InputLabel = styled.label`
  color: var(--sub-color);
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${({ shrink }) => shrink && ShrinkLabelMixin}
`

export const InputField = styled.input`
  background: none;
  background-color: white;
  color: var(--sub-color);
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid var(--sub-color);;
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${InputLabel} {
     ${ShrinkLabelMixin};
  }

  &:hover ~ ${InputLabel} {
    ${ShrinkLabelMixin};
  }
`

//   .form-input {
//     background: none;
//     background-color: white;
//     color: $sub-color;
//     font-size: 18px;
//     padding: 10px 10px 10px 5px;
//     display: block;
//     width: 100%;
//     border: none;
//     border-radius: 0;
//     border-bottom: 1px solid $sub-color;
//     margin: 25px 0;

//     &:focus {
//       outline: none;
//     }

//     &:focus ~ .form-input-label {
//       @include shrinkLabel();
//     }
//   }

//   input[type='password'] {
//     letter-spacing: 0.3em;
//   }

//   .form-input-label {
//     color: $sub-color;
//     font-size: 16px;
//     font-weight: normal;
//     position: absolute;
//     pointer-events: none;
//     left: 5px;
//     top: 10px;
//     transition: 300ms ease all;

//     &.shrink {
//       @include shrinkLabel();
//     }
//   }
// }
