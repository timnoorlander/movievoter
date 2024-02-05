import { keyframes } from "styled-components";

export const slideRightAnimation = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translate3d(40px, 0, 0);
    transform: translate3d(40px, 0, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
`;
