import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { slideUpAnimation } from "../layout/animations/SlideUp";

export const Card = styled.div<{ hasAnimation?: boolean }>`
  display: flex;
  width: 100%;
  gap: 1rem;
  padding: 0.5rem;
  background-color: ${theme.colors.primary};

  border-radius: ${theme.borderRadius.md};

  ${theme.boxShadow}

  ${(props) =>
    props.hasAnimation
      ? css`
          animation: ${slideUpAnimation} 300ms;
        `
      : null}
`;

export const CardImage = styled.div`
  max-width: 6rem;
  max-height: 6rem;
  border-radius: ${theme.borderRadius.sm};
  overflow: hidden;
  ${theme.boxShadow}
`;

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  color: ${theme.colors.textContrast};
  text-align: left;
`;

export const CardTitle = styled.div`
  flex: 1;
  margin-top: 0.5rem;
`;

export const CardTopRightButton = styled.button`
  background: none;
  padding: none;
  border: none;
`;
