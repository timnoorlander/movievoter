import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Button = styled.button`
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background};
  color: ${theme.colors.primary};
  font-weight: bolder;
  font-size: ${theme.fontSizes.xs};
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  border: 2px solid ${theme.colors.primary};

  ${theme.boxShadow}
`;
