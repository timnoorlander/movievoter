import styled from "styled-components";
import { theme } from "../../styles/theme";

// export const Button = styled.button`
//   border-radius: ${theme.borderRadius};
//   background-color: ${theme.colors.primary};
//   color: ${theme.colors.contrast};
//   font-weight: bolder;
//   font-size: ${theme.fontSizes.sm};
//   /* font-style: italic; */
//   text-align: center;
//   padding-top: 1rem;
//   padding-bottom: 1rem;
//   width: 100%;
//   border: 2px solid ${theme.colors.primary};

//   box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
//   -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
//   -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
// `;

export const Button = styled.button`
  border-radius: ${theme.borderRadius};
  background-color: ${theme.colors.background};
  color: ${theme.colors.primary};
  font-weight: bolder;
  font-size: ${theme.fontSizes.xs};
  /* font-style: italic; */
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  border: 2px solid ${theme.colors.primary};

  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 4px 8px rgba(0, 0, 0, 0.3);
`;
