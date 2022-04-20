import styled from "styled-components"

export const AuthenticationContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  max-width: 900px;
  margin: 30px auto;

  @media (min-width: 1050px) {
    flex-flow: row; 
  }
`
