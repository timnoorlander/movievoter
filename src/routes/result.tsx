import { useQueries } from "@tanstack/react-query";
import { useVotingContext } from "../providers/VotingContext";
import { getMovieByImdbId } from "../utils/omdb-api";
import { calculateResult } from "../utils/calculate-result";
import { useMemo } from "react";

export function Result() {
  const { votes } = useVotingContext();

  const movies = useQueries({
    queries: Object.keys(votes[0]).map((imdbId) => ({
      queryKey: ["movies", imdbId],
      queryFn: () => getMovieByImdbId(imdbId),
      staleTime: Infinity,
    })),
  });

  const result = useMemo(() => calculateResult(votes, movies), [votes, movies]);

  return <div>Result</div>;
}
