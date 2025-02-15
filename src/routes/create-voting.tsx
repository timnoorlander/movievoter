import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { Button } from "../components/elements/Button";
import { useNavigate } from "react-router-dom";
import { paths } from "../constants/paths";
import { slideRightAnimation } from "../components/layout/animations/SlideRight";
import {useVotingContext} from "../providers/VotingContext.ts";

type Inputs = {
  votingName: string;
};

export function CreateVoting() {
  const navigate = useNavigate();
  const { createVoting } = useVotingContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (inputs: Inputs) => {
    createVoting(inputs.votingName);
    navigate(paths.WAITING_ROOM);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        role="voting-name"
        placeholder="Voting name"
        {...register("votingName", { required: true })}
      ></Input>

      <Button type="submit" role="submit-voting">Create voting</Button>
    </Form>
  );
}

const Form = styled.form`
  animation: ${slideRightAnimation} 300ms;
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 100%;
  justify-content: center;
`;

const Input = styled.input`
  text-align: center;
  padding: 1rem;
  border-radius: ${theme.borderRadius.md};
  border: none;
  outline: none;
  font-size: ${theme.fontSizes.xs};
`;
