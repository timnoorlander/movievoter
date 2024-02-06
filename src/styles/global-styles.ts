import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
  * {

    font-family: 'Montserrat', sans-serif; 
  }

  body, p {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.text};
  }

  html, body, #root {
  height: 100%
}

  h1 {
    font-size: clamp(${theme.fontSizes.md}, -1.0455rem + 9.0909vw, ${theme.fontSizes.lg});
    color: ${theme.colors.text};
    margin-bottom: 1.5rem;
    font-weight: 900;
    font-style: italic;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

`;
