import { VotingStages } from "../constants/voting-stages.ts";
import { createContext, useContext } from "react";
import { Votes } from "../types/index.ts";

export type TVotingContext = {
  joinVoting: (votingName: string) => void;
  createVoting: (votingName: string) => void;
  startVoting: () => void;
  persistMovies: (movieIds: Array<string>) => void;
  undoPersistingMovies: (movieIds: Array<string>) => void;
  castVote: (orderedMovieIds: Array<string>) => void;
  withdrawVote: () => void;
  votingName: string | undefined;
  votingStage: VotingStages | undefined;
  numberOfParticipants: number | undefined;
  numberOfMoviesPerUser: number | undefined;
  isHost: boolean | undefined;
  movieIds: Array<string>;
  votes: Votes;
};

export const VotingContext = createContext<TVotingContext | undefined>(
  undefined
);

export const useVotingContext = () => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error("useVotingContext must be used within an VotingProvider");
  }
  return context;
};
