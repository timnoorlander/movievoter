import styled from "styled-components";
import { Button } from "../components/elements/Button";
import { useEffect } from "react";
import { VotingStages } from "../constants/voting-stages";
import { useNavigate } from "react-router-dom";
import { paths } from "../constants/paths";
import { Spinner } from "../components/elements/Spinner";
import { slideRightAnimation } from "../components/layout/animations/SlideRight";
import {useVotingContext} from "../providers/VotingContext.ts";

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

      {!isHost && (
        <LoadingIndication>
          <Spinner />
          Waiting for host to continue
        </LoadingIndication>
      )}
    </Container>
  );
}

const NumberOfParticipants = styled.span`
  font-size: 6rem;
`;

const Container = styled.div`
  animation: ${slideRightAnimation} 300ms;
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

const LoadingIndication = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
