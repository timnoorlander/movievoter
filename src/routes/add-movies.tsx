import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { Input } from "../components/elements/Input";
import { theme } from "../styles/theme";
import { getImdbIdByUrl, imdbUrlRegex } from "../utils/imdb";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { getMovieByImdbId } from "../utils/omdb-api";
import { Spinner } from "../components/elements/Spinner";
import { slideRightAnimation } from "../components/layout/animations/SlideRight";
import { Toggle } from "../components/elements/Toggle";
import {
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardTopRightButton,
} from "../components/elements/Card";
import { slideUpAnimation } from "../components/layout/animations/SlideUp";
import { useVotingContext } from "../providers/VotingProvider";

type Inputs = {
  imdbUrl: string;
};

export function AddMovies() {
  const {
    register,
    handleSubmit,
    reset: resetInput,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  const { persistMovies, undoPersistingMovies } = useVotingContext();

  const [imdbIds, setImdbIds] = useState<Array<string>>([]);

  const results = useQueries({
    queries: imdbIds.map((imdbId) => ({
      queryKey: ["movies", imdbId],
      queryFn: () => getMovieByImdbId(imdbId),
      staleTime: Infinity,
    })),
  });

  const isFetchingMovie = results.some((result) => result.isPending);

  const onAddMovie: SubmitHandler<Inputs> = ({ imdbUrl }: Inputs) => {
    const imdbId = getImdbIdByUrl(imdbUrl);

    // Prevent duplicates
    if (imdbIds.some((id) => id === imdbId)) {
      return;
    }

    setImdbIds([...imdbIds, imdbId]);
    resetInput();
  };

  const onRemoveMovie = (imdbId: string) => {
    setImdbIds((imdbIds) => imdbIds.filter((id) => id !== imdbId));
  };

  if (results.some((result) => result.error)) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  return (
    <>
      <Container>
        <h1>Add movies</h1>

        <Form onSubmit={handleSubmit(onAddMovie)} autoComplete="off">
          <Input
            type="text"
            placeholder="Paste IMDB URL"
            autoFocus
            autoComplete="false"
            {...register("imdbUrl", { required: true, pattern: imdbUrlRegex })}
          ></Input>
          {errors.imdbUrl ? (
            <InputError>Please provide a valid IMDB movie url</InputError>
          ) : null}
        </Form>

        <ul>
          {results.map((result) => {
            const movie = result.data;
            if (!movie) {
              return;
            }

            return (
              <ListItem key={movie.imdbID}>
                <Card>
                  <CardImage>
                    <Poster src={movie.Poster} />
                  </CardImage>
                  <CardContent>
                    <CardTitle>{movie.Title}</CardTitle>
                    <CardTopRightButton>
                      <CloseIcon onClick={() => onRemoveMovie(movie.imdbID)} />
                    </CardTopRightButton>
                  </CardContent>
                </Card>
              </ListItem>
            );
          })}
        </ul>

        {isFetchingMovie ? <StyledSpinner /> : null}
      </Container>

      {(imdbIds.length && !isFetchingMovie) || imdbIds.length > 1 ? (
        <BottomBarContainer>
          <BottomBar>
            I'm done
            <Toggle
              name="is done"
              onToggleOn={() => persistMovies(imdbIds)}
              onToggleOff={() => undoPersistingMovies(imdbIds)}
            />
          </BottomBar>
        </BottomBarContainer>
      ) : null}
    </>
  );
}

const Container = styled.div`
  animation: ${slideRightAnimation} 300ms;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  justify-content: flex-start;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputError = styled.span`
  margin-top: 0.5rem;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xs};
`;

const Poster = styled.img`
  width: 100%;
  display: block;
`;

const ListItem = styled.li`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CloseIcon = styled(FiX)`
  height: 1.5rem;
  width: 1.5rem;
  color: ${theme.colors.textContrast};
`;

const StyledSpinner = styled(Spinner)`
  margin: 0 auto;
  margin-top: 1rem;
`;

const BottomBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  animation: ${slideUpAnimation} 300ms;
`;

const BottomBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  line-height: 1.5rem;
  font-weight: bolder;
  ${theme.boxShadow}
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin: 0 0.5rem 0.5rem 0.5rem;
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textContrast};
`;
