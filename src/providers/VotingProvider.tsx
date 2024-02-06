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
};

const VotingContext = createContext<VotingProviderValue | undefined>(undefined);

const socket = io(import.meta.env.VITE_WEBSOCKET_URL);

export function VotingProvider({ children }: VotingProviderProps) {
  const [votingName, setVotingName] = useState<string>();
  const [votingStage, setVotingStage] = useState<VotingStages | undefined>();
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>();
  const [isHost, setIsHost] = useState(false);

  // Current implementation only works when everyone adds number of movies that equals $numberOfMoviesPerUser
  // It would be better if it's numberOfMoviesPerUser or less.

  // TODO: Make dynamic
  const [numberOfMoviesPerUser, setNumberOfMoviesPerUser] = useState<
    number | undefined
  >(2);
  const [movieIds, setMovieIds] = useState<Array<string>>([]);

  useEffect(() => {
    console.log({ movieIds });
  }, [movieIds]);

  useEffect(() => {
    if (!isHost || !numberOfMoviesPerUser || !numberOfParticipants) {
      return;
    }

    if (movieIds.length === numberOfMoviesPerUser * numberOfParticipants) {
      console.log("on to the next stage!");
    }
  }, [isHost, movieIds.length, numberOfMoviesPerUser, numberOfParticipants]);

  useEffect(() => {
    socket.on("participants-updated", (data: { roomSize: number }) => {
      setNumberOfParticipants(data.roomSize);
    });

    socket.on("voting-started", (data: { numberOfMoviesPerUser: number }) => {
      setNumberOfMoviesPerUser(data.numberOfMoviesPerUser);
      setVotingStage(VotingStages.ADD_MOVIES);
    });

    socket.on("movies-added", (ids: Array<string>) => {
      console.log("movies added");
      setMovieIds((movieIds) => [...movieIds, ...ids]);
    });

    socket.on("movies-removed", (ids: Array<string>) => {
      setMovieIds((movieIds) =>
        movieIds.filter((movieId) => !ids.includes(movieId))
      );
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
