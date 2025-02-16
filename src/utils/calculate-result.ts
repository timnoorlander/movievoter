import { Movie, Votes } from "../types";

export function calculateResult(votes: Votes, movies: Array<Movie>) {
  const highestPossibleVote = votes[0].length;

  const calculation: { [key: string]: number } = {};

  votes.forEach((vote) => {
    vote.forEach((movieId, index) => {
      const currentValue = calculation[movieId] || 0;
      calculation[movieId] = currentValue + highestPossibleVote - index;
    });
  });

  return calculation;

  const draws = getDraws(calculation);

  if (draws.length) {
    // for each individual
    // get imdb rating of each movie where there is a a draw
  }
  // if there is a draw
  // check imdb rating of both movies and put the one with the higher rating first

  // if (draws.includes()) return ["id1", "id3", "id2"];
}

export function getDraws(result: { [key: string]: number }) {
  const draws: string[] = [];

  Object.entries(result).forEach(([movieId, votes]) => {
    const hasDraw = Object.entries(result).some(
      ([otherMovieId, otherVotes]) =>
        movieId !== otherMovieId && votes === otherVotes
    );

    if (hasDraw) {
      draws.push(movieId);
    }
  });

  return draws;
}
