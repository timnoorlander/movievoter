import styled from "styled-components";
import { Button } from "../components/elements/Button";
import { useVotingContext } from "../providers/VotingProvider";
import { Link } from "react-router-dom";

export function WaitingRoom() {
  const { votingName, numberOfParticipants, isHost } = useVotingContext();

  return (
    <Container>
      <span>Voting name: {votingName}</span>
      <ParticipantInfo>
        <span>There are currently</span>
        <NumberOfParticipants>{numberOfParticipants}</NumberOfParticipants>
        <span>participants</span>
      </ParticipantInfo>

      {isHost && (
        <Link to="">
          <Button>Start voting process</Button>
        </Link>
      )}
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
