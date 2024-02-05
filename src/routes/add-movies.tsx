import { useForm, SubmitHandler } from "react-hook-form";
import styled, { keyframes } from "styled-components";
import { Input } from "../components/elements/Input";
import { theme } from "../styles/theme";
import { getImdbIdByUrl, imdbUrlRegex } from "../utils/imdb";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getMovieByImdbId } from "../utils/omdb-api";
import { Spinner } from "../components/elements/Spinner";
import { slideRightAnimation } from "../components/layout/SlideRightAnimation";

type Inputs = {
  imdbUrl: string;
};

export function AddMovies() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  const [imdbId, setImdbId] = useState<string>();

  const { isPending, error, data } = useQuery({
    queryKey: ["movies", imdbId],
    enabled: !!imdbId,
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: () => {
      if (!imdbId) {
        return;
      }

      return getMovieByImdbId(imdbId);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({ imdbUrl }: Inputs) => {
    console.log("submit");
    const imdbId = getImdbIdByUrl(imdbUrl);
    setImdbId(imdbId);
    console.log("imdb id set");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Add a movie</h1>
        <Input
          type="text"
          placeholder="Paste IMDB URL"
          autoFocus
          {...register("imdbUrl", { required: true, pattern: imdbUrlRegex })}
        ></Input>
        {errors.imdbUrl ? (
          <InputError>Please provide a valid IMDB movie url</InputError>
        ) : null}
      </Form>

      {imdbId && isPending ? <Spinner /> : null}

      {data && !errors.imdbUrl ? <Poster src={data.Poster} /> : null}
    </Container>
  );
}

const slideUpAnimation = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 40px, 0);
    transform: translate3d(0, 40px, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
`;

const Container = styled.div`
  animation: ${slideRightAnimation} 300ms;
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 100%;
  justify-content: center;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  justify-content: center;
  text-align: center;
`;

const InputError = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.fontSizes.xs};
`;

const Poster = styled.img`
  animation: ${slideUpAnimation} 300ms;
`;
