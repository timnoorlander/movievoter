import styled from "styled-components";
import { Button } from "../components/elements/Button";
import io from "socket.io-client";

const socket = io("http://localhost:3001");
socket.emit("join-room", "roomname");

export function WaitingRoom() {
  return (
    <Container>
      <span>Group name: Testo</span>
      <ParticipantInfo>
        <span>There are currently</span>
        <NumberOfParticipants>7</NumberOfParticipants>
        <span>participants</span>
      </ParticipantInfo>
      <Button>Start voting process</Button>
    </Container>
  );
}

const NumberOfParticipants = styled.span`
  font-size: 6rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  text-align: center;
`;

const ParticipantInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
