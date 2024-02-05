import styled from "styled-components";
import LoadingSpinner from "../../assets/loading.svg?react";
import { theme } from "../../styles/theme";

export const Spinner = styled(LoadingSpinner)`
  stroke: ${theme.colors.primary};
`;
