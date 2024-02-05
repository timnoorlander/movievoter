import styled from "styled-components";
import { Button } from "../components/elements/Button";
import { useVotingContext } from "../providers/VotingProvider";
import { useEffect } from "react";
import { VotingStages } from "../constants/voting-stages";
import { useNavigate } from "react-router-dom";
import { paths } from "../constants/paths";

export function WaitingRoom() {
  const navigate = useNavigate();
  const { votingName, numberOfParticipants, isHost, startVoting, votingStage } =
    useVotingContext();

  function onStartVotingProcess() {
    startVoting();
  }

  useEffect(() => {
    if (votingStage === VotingStages.ADD_MOVIES) {
      navigate(paths.ADD_MOVIES);
    }
  }, [navigate, votingStage]);

  return (
    <Container>
      <span>Voting name: {votingName}</span>
      <ParticipantInfo>
        <span>There are currently</span>
        <NumberOfParticipants>{numberOfParticipants}</NumberOfParticipants>
        <span>participants</span>
      </ParticipantInfo>

      {isHost && (
        <Button onClick={onStartVotingProcess}>Start voting process</Button>
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
