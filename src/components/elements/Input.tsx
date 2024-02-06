import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Input = styled.input`
  text-align: center;
  padding: 1rem;
  border-radius: ${theme.borderRadius.md};
  border: none;
  outline: none;
  font-size: ${theme.fontSizes.xs};
`;
