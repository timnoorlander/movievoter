import { keyframes } from "styled-components";

export const slideUpAnimation = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 40px, 0);
    transform: translate3d(0, 40px, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
`;
