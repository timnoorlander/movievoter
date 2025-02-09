import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../components/elements/Button";
import { paths } from "../constants/paths";

export function Home() {
  return (
    <Container>
      <Link to={paths.JOIN_VOTING}>
        <Button>Join voting</Button>
      </Link>
      <Link to={paths.CREATE_VOTING}>
        <Button>Create voting</Button>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 100%;
  justify-content: center;
`;
