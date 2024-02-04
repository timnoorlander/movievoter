export const theme = {
  colors: {
    primary: "white",
    secondary: "#D3E2D3",
    text: "white",
    background: "#4169E1",
    contrast: "#4169E1",
    error: "red",
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
  borderRadius: "1rem",
};

export type Theme = typeof theme;
