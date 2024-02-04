import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../components/elements/Button";

export function Home() {
  return (
    <Container>
      <Link to="/join-voting">
        <Button>Join voting</Button>
      </Link>
      <Link to="/create-voting">
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
