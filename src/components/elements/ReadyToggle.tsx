import styled from "styled-components";
import { theme } from "../../styles/theme";
import { slideUpAnimation } from "../layout/animations/SlideUp";
import { Toggle } from "./Toggle";

type Props = {
  onToggleOn: () => unknown;
  onToggleOff: () => unknown;
};

export function ReadyToggle({ onToggleOn, onToggleOff }: Props) {
  return (
    <BottomBarContainer>
      <BottomBar>
        I'm done
        <Toggle
          name="is done"
          onToggleOn={onToggleOn}
          onToggleOff={onToggleOff}
        />
      </BottomBar>
    </BottomBarContainer>
  );
}

const BottomBarContainer = styled.div`
  position: sticky;
  bottom: 1.5rem;
  left: 0;
  width: 100%;
  animation: ${slideUpAnimation} 300ms;
`;

const BottomBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  line-height: 1.5rem;
  font-weight: bolder;
  ${theme.boxShadow}
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin: 0 0.5rem 0.5rem 0.5rem;
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textContrast};
`;
