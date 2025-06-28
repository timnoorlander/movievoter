import styled, { css } from "styled-components";
import { MdDragIndicator } from "react-icons/md";
import { theme } from "../../styles/theme";
import { slideUpAnimation } from "../layout/animations/SlideUp";

type Props = {
  children: React.ReactNode;
  hasAnimation?: boolean;
  isDraggable?: boolean;
};

export function Card({
  children,
  hasAnimation = false,
  isDraggable = false,
}: Props) {
  return (
    <CardItem hasAnimation={hasAnimation}>
      {isDraggable ? (
        <DragIconContainer>
          <DragIcon />
        </DragIconContainer>
      ) : null}
      {children}
    </CardItem>
  );
}

export const CardItem = styled.div<{ hasAnimation?: boolean }>`
  display: flex;
  width: 100%;
  gap: 0.5rem;
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
  padding-left: 0.5rem;
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

const DragIcon = styled(MdDragIndicator)`
  color: ${theme.colors.textContrast};
  width: 1.5rem;
  height: 1.5rem;
`;

const DragIconContainer = styled.div`
  display: flex;
  align-items: center;
`;
