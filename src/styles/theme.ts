import { css } from "styled-components";

export const theme = {
  colors: {
    primary: "white",
    secondary: "#D3E2D3",
    text: "white",
    textContrast: "#222222",
    background: "#4169E1",
    contrast: "#4169E1",
    error: "red",
    success: "#50C878",
  },
  breakpoints: {
    xs: "576px",
    sm: "768px",
    md: "992px",
    lg: "1200px",
  },
  fonts: {
    body: "'Montserrat', sans-serif",
    heading: "'Montserrat', sans-serif",
  },
  fontSizes: {
    xs: "1rem",
    sm: "1.5rem",
    md: "2rem",
    lg: "3rem",
  },
  borderRadius: {
    sm: "0.7rem",
    md: "1rem",
  },
  boxShadow: css`
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 0px 4px 8px rgba(0, 0, 0, 0.3);
  `,
};

export type Theme = typeof theme;
