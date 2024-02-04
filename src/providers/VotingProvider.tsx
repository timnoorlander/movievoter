import { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

type VotingProviderProps = {
  children: React.ReactNode;
};

type VotingProviderValue = {
  joinVoting: (votingName: string) => void;
  createRoom: (roomName: string) => void;
  numberOfParticipants: number;
};

const VotingContext = createContext<VotingProviderValue | undefined>(undefined);

export function VotingProvider({ children }: VotingProviderProps) {
  const [socket, _setSocketInstance] = useState<Socket>(
    io("http://localhost:3001")
  );

  function joinVoting() {
    socket.emit("join-room", "roomname");
  }

  <VotingContext.Provider value={contextValue}>
    {children}
  </VotingContext.Provider>;
}
