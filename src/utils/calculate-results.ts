import { Votes } from "../types";

export function calculateResults(votes: Votes) {
  const highestPossibleVote = votes[0].length;

  const result: { [key: string]: number } = {};

  votes.forEach((vote) => {
    vote.forEach((movieId, index) => {
      const currentValue = result[movieId] || 0;
      result[movieId] = currentValue + highestPossibleVote - index;
    });
  });

  return result;
}
