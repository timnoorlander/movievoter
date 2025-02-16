import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { VotingStages } from "../constants/voting-stages";
import { getConfigValue } from "../utils/config";
import { VotingContext, TVotingContext } from "./VotingContext.ts";
import { Votes } from "../types/index.ts";

type VotingProviderProps = {
  children: React.ReactNode;
};

const MAX_NUMBER_OF_MOVIES = 2;

const socket = io(getConfigValue("VITE_WEBSOCKET_URL"));

// TODO: Utilize reducer

export function VotingProvider({ children }: VotingProviderProps) {
  const [isHost, setIsHost] = useState(false);
  const [votingName, setVotingName] = useState<string>();
  const [votingStage, setVotingStage] = useState<VotingStages | undefined>();
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>();
  // TODO: Make dynamic
  const [numberOfMoviesPerUser, setNumberOfMoviesPerUser] = useState<
    number | undefined
  >(MAX_NUMBER_OF_MOVIES);
  const [movieIds, setMovieIds] = useState<Array<string>>([]);
  const [votes, setVotes] = useState<Votes>([]);
  const [readyForNextStage, setReadyForNextStage] = useState<number>(0);

  useEffect(() => {
    if (readyForNextStage === numberOfParticipants) {
      setVotingStage(VotingStages.VOTE);
    }
  }, [numberOfParticipants, readyForNextStage]);

  useEffect(() => {
    if (numberOfParticipants === votes.length) {
      setVotingStage(VotingStages.RESULT);
    }
  }, [numberOfParticipants, votes]);

  useEffect(() => {
    console.log("votes", votes);
  }, [votes]);

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

    socket.on("vote-casted", (orderedMovieIds: Array<string>) => {
      //TODO: is not receiving anything
      console.log("vote casted", orderedMovieIds);
      setVotes((votes) => [...votes, orderedMovieIds]);
    });

    socket.on("vote-withdrawn", (orderedMovieIds: string) => {
      console.log("vote withdrawn", orderedMovieIds);
    });

    return () => {
      socket.off("participants-updated");
      socket.off("voting-stage-updated");
      socket.off("movies-added");
      socket.off("movies-removed");
      socket.off("vote-casted");
      socket.off("vote-withdrawn");
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

  function castVote(orderedMovieIds: Array<string>) {
    socket.emit("cast-vote", orderedMovieIds);
  }

  function withdrawVote() {
    socket.emit("withdraw-vote");
  }

  const value: TVotingContext = {
    joinVoting,
    createVoting,
    startVoting,
    persistMovies,
    undoPersistingMovies,
    castVote,
    withdrawVote,
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
