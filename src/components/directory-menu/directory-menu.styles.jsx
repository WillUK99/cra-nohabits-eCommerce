import styled from 'styled-components';

export const DirectoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-flow: column nowrap;

  @media (min-width: 500px) {
    flex-flow: row wrap;
  }
`
