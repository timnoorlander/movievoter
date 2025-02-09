import { useQueries } from "@tanstack/react-query";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";
import { useVotingContext } from "../providers/VotingProvider";
import { getMovieByImdbId } from "../utils/omdb-api";
import {
  Card,
  CardImage,
  CardContent,
  CardTitle,
} from "../components/elements/Card";
import styled from "styled-components";
import { slideRightAnimation } from "../components/layout/animations/SlideRight";
import { useState } from "react";
import { Spinner } from "../components/elements/Spinner";
import { theme } from "../styles/theme";
import { ReadyToggle } from "../components/elements/ReadyToggle";

export function Vote() {
  const { movieIds } = useVotingContext();
  const [orderedMovieIds, setOrderedMovieIds] =
    useState<Array<string>>(movieIds);

  const results = useQueries({
    queries: orderedMovieIds.map((movieId) => ({
      queryKey: ["movies", movieId],
      queryFn: () => getMovieByImdbId(movieId),
      staleTime: Infinity,
    })),
  });

  const isFetchingMovies = results.some((result) => result.isPending);

  function handleOnDragEnd(result: DropResult) {
    const isDroppedOutsideDroppable = !result.destination;
    if (isDroppedOutsideDroppable) {
      return;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    const orderedIds = reorder(
      orderedMovieIds,
      source.index,
      destination.index
    );

    setOrderedMovieIds(orderedIds);
  }

  return (
    <Container>
      <h1>Vote</h1>

      {isFetchingMovies ? <StyledSpinner /> : null}

      <VotingContainer>
        <Positions>
          {results.map((_result, i) => (
            <li>{i + 1}</li>
          ))}
        </Positions>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="movies">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {results.map((result, i) => {
                  const movie = result.data;
                  if (!movie) {
                    return;
                  }

                  return (
                    <Draggable
                      key={movie.imdbID}
                      draggableId={movie.imdbID}
                      index={i}
                    >
                      {(provided) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="movies"
                        >
                          <Card>
                            <CardImage>
                              <Poster src={movie.Poster} />
                            </CardImage>
                            <CardContent>
                              <CardTitle>{movie.Title}</CardTitle>
                            </CardContent>
                          </Card>
                        </ListItem>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </VotingContainer>

      <ReadyToggle
        onToggleOn={() => {console.log('Wax on')}}
        onToggleOff={() => {console.log('Wax on')}}
      />
    </Container>
  );
}

const reorder = (
  list: Array<string>,
  startIndex: number,
  endIndex: number
): Array<string> => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Container = styled.div`
  animation: ${slideRightAnimation} 300ms;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100%;
  justify-content: flex-start;
  text-align: center;
`;

const VotingContainer = styled.div`
  display: flex;
`;

const Positions = styled.ul`
  display: flex;
  gap: 7rem;
  flex-direction: column;
  justify-content: center;
  margin: 0 1rem 0 0;
`;

const Poster = styled.img`
  width: 100%;
  display: block;
`;

const ListItem = styled.li`
  cursor: move;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledSpinner = styled(Spinner)`
  margin: 0 auto;
  margin-top: 1rem;
`;

const RankIndicator = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: gold;
  font-weight: bolder;
  border-radius: 50%;
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: center;

  ${theme.boxShadow};
`;
