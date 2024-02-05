type OmdbMovieResponse = {
  Genre: string;
  Plot: string;
  Poster: string;
  Year: string;
  Director: string;
  Actors: string;
  ImdbRating: string;
  ImdbVotes: string;
};

export async function getMovieByImdbId(
  imdbId: string
): Promise<OmdbMovieResponse> {
  const omdbMovieUrl = getOmdbMovieUrlByImdbId(imdbId);
  const response = await fetch(omdbMovieUrl);

  console.log({ response });

  return response.json();
}

function getOmdbMovieUrlByImdbId(imdbId: string) {
  return `https://www.omdbapi.com/?i=${imdbId}&apikey=${
    import.meta.env.VITE_OMDB_API_KEY
  }`;
}
