export function getImdbIdByUrl(imdbUrl: string) {
  const splitUrl = imdbUrl.split("/");
  return splitUrl[splitUrl.length - 2];
}

export const imdbUrlRegex =
  /^(https?:\/\/)?(www\.)?imdb\.com\/title\/tt\d+\/?$/;
