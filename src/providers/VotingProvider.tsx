import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

type VotingProviderProps = {
  children: React.ReactNode;
};

type VotingProviderValue = {
  joinVoting: (votingName: string) => void;
  createVoting: (roomName: string) => void;
  numberOfParticipants: number | undefined;
  votingName: string | undefined;
  isHost: boolean | undefined;
};

const VotingContext = createContext<VotingProviderValue | undefined>(undefined);

const socket = io("http://localhost:3001");

export function VotingProvider({ children }: VotingProviderProps) {
  const [votingName, setVotingName] = useState<string>();
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>();
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    socket.on("participants-updated", (data: { roomSize: number }) => {
      setNumberOfParticipants(data.roomSize);
      console.log(data);
    });

    return () => {
      socket.off("participants-updated");
    };
  }, []);

  function joinVoting(newVotingName: string) {
    socket.emit("join-room", newVotingName);
    setVotingName(newVotingName);
    setIsHost(false);
  }

  function createVoting(newVotingName: string) {
    socket.emit("create-room", newVotingName);
    setVotingName(newVotingName);
    setIsHost(true);
  }

  const value: VotingProviderValue = {
    joinVoting,
    createVoting,
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
