import { Movie } from "../types";
import { getConfigValue } from "./config";

export async function getMovieByImdbId(imdbId: string): Promise<Movie> {
  const omdbMovieUrl = getOmdbMovieUrlByImdbId(imdbId);
  const response = await fetch(omdbMovieUrl);
  return response.json();
}

function getOmdbMovieUrlByImdbId(imdbId: string) {
  return `https://www.omdbapi.com/?i=${imdbId}&apikey=${getConfigValue(
    "VITE_OMDB_API_KEY"
  )}`;
}
