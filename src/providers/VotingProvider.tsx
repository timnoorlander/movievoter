import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { VotingStages } from "../constants/voting-stages";

type VotingProviderProps = {
  children: React.ReactNode;
};

type VotingProviderValue = {
  joinVoting: (votingName: string) => void;
  createVoting: (votingName: string) => void;
  startVoting: () => void;
  persistMovies: (movieIds: Array<string>) => void;
  undoPersistingMovies: (movieIds: Array<string>) => void;
  votingName: string | undefined;
  votingStage: VotingStages | undefined;
  numberOfParticipants: number | undefined;
  numberOfMoviesPerUser: number | undefined;
  isHost: boolean | undefined;
  movieIds: Array<string>;
};

const VotingContext = createContext<VotingProviderValue | undefined>(undefined);

const socket = io(import.meta.env.VITE_WEBSOCKET_URL);

// TODO: Utilize reducer

export function VotingProvider({ children }: VotingProviderProps) {
  const [isHost, setIsHost] = useState(false);
  const [votingName, setVotingName] = useState<string>();
  const [votingStage, setVotingStage] = useState<VotingStages | undefined>();
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>();
  // TODO: Make dynamic
  const [numberOfMoviesPerUser, setNumberOfMoviesPerUser] = useState<
    number | undefined
  >(2);
  const [movieIds, setMovieIds] = useState<Array<string>>([
    "tt0111161", // The Shawshank Redemption
    "tt0068646", // The Godfather
    "tt0468569", // The Dark Knight
    "tt0137523", // Fight Club
    "tt1375666", // Inception
    "tt0109830", // Forrest Gump
    "tt0167260", // The Lord of the Rings: The Return of the King
    "tt0120737", // The Lord of the Rings: The Fellowship of the Ring
    "tt0133093", // The Matrix
    "tt0099685", // Goodfellas
  ]);
  const [readyForNextStage, setReadyForNextStage] = useState<number>(0);

  useEffect(() => {
    if (readyForNextStage === numberOfParticipants) {
      setVotingStage(VotingStages.VOTE);
    }
  }, [numberOfParticipants, readyForNextStage]);

  useEffect(() => {
    socket.on("participants-updated", (data: { roomSize: number }) => {
      setNumberOfParticipants(data.roomSize);
    });

    socket.on("voting-started", (data: { numberOfMoviesPerUser: number }) => {
      setNumberOfMoviesPerUser(data.numberOfMoviesPerUser);
      setVotingStage(VotingStages.ADD_MOVIES);
    });

    socket.on("movies-added", (ids: Array<string>) => {
      setMovieIds((movieIds) => [...movieIds, ...ids]);
      setReadyForNextStage((i) => i + 1);
    });

    socket.on("movies-removed", (ids: Array<string>) => {
      setMovieIds((movieIds) =>
        movieIds.filter((movieId) => !ids.includes(movieId))
      );
      setReadyForNextStage((i) => i - 1);
    });

    return () => {
      socket.off("participants-updated");
      socket.off("voting-stage-updated");
      socket.off("movies-added");
      socket.off("movies-removed");
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
    socket.emit("start-voting", {
      numberOfMoviesPerUser,
    });
  }

  function persistMovies(movieIds: Array<string>) {
    console.log("add movies");
    socket.emit("add-movies", movieIds);
  }

  function undoPersistingMovies(movieIds: Array<string>) {
    socket.emit("remove-movies", movieIds);
  }

  const value: VotingProviderValue = {
    joinVoting,
    createVoting,
    startVoting,
    persistMovies,
    undoPersistingMovies,
    votingStage,
    votingName,
    numberOfParticipants,
    numberOfMoviesPerUser,
    isHost,
    movieIds,
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
