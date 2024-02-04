import styled from "styled-components";

export function GenericError() {
  return (
    <ErrorMessage>
      <h1>Something went wrong :(</h1>
    </ErrorMessage>
  );
}

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
