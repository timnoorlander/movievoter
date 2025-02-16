export type Vote = Array<string>;
export type Votes = Array<Vote>;

export type VotingResult = { [key: string]: number };

export type Movie = {
  imdbID: string;
  Title: string;
  Genre: string;
  Plot: string;
  Poster: string;
  Year: string;
  Director: string;
  Actors: string;
  ImdbRating: string;
  ImdbVotes: string;
};
