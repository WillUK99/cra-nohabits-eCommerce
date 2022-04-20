import styled from "styled-components"

export const CategoryTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
`

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`
