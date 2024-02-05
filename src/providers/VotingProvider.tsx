import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { paths } from "../constants/paths";
import { VotingStages } from "../constants/voting-stages";

type VotingProviderProps = {
  children: React.ReactNode;
};

type VotingProviderValue = {
  joinVoting: (votingName: string) => void;
  createVoting: (votingName: string) => void;
  startVoting: () => void;
  votingName: string | undefined;
  votingStage: VotingStages | undefined;
  numberOfParticipants: number | undefined;
  isHost: boolean | undefined;
};

const VotingContext = createContext<VotingProviderValue | undefined>(undefined);

const socket = io("http://localhost:3001");

export function VotingProvider({ children }: VotingProviderProps) {
  const [votingName, setVotingName] = useState<string>();
  const [votingStage, setVotingStage] = useState<VotingStages | undefined>();
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>();
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    socket.on("participants-updated", (data: { roomSize: number }) => {
      console.log("update participants");
      setNumberOfParticipants(data.roomSize);
    });

    socket.on("voting-stage-updated", (votingStage: number) => {
      console.log({ votingStage });
      setVotingStage(VotingStages.ADD_MOVIES);
    });

    return () => {
      socket.off("participants-updated");
    };
  }, []);

  function joinVoting(newVotingName: string) {
    socket.emit("join-voting", newVotingName);
    setVotingName(newVotingName);
    setIsHost(false);
  }

  function createVoting(newVotingName: string) {
    socket.emit("create-voting", newVotingName);
    setVotingName(newVotingName);
    setIsHost(true);
  }

  function startVoting() {
    socket.emit("update-voting-stage", paths.ADD_MOVIES);
  }

  const value: VotingProviderValue = {
    joinVoting,
    createVoting,
    startVoting,
    votingStage,
    votingName,
    numberOfParticipants,
    isHost,
  };

  return (
    <VotingContext.Provider value={value}>{children}</VotingContext.Provider>
  );
}

export const useVotingContext = () => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error("useVotingContext must be used within an VotingProvider");
  }
  return context;
};
