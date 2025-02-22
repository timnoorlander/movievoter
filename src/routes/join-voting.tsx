import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "../components/elements/Button";
import { useNavigate } from "react-router-dom";

import { Input } from "../components/elements/Input";
import { slideRightAnimation } from "../components/layout/animations/SlideRight";
import {useVotingContext} from "../providers/VotingContext.ts";

type Inputs = {
  votingName: string;
};

export function JoinVoting() {
  const navigate = useNavigate();
  const { joinVoting } = useVotingContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = (inputs: Inputs) => {
    joinVoting(inputs.votingName);
    navigate("/waiting-room");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        role="voting-name"
        placeholder="Voting name"
        {...register("votingName", { required: true })}
      ></Input>

      <Button type="submit" role="submit-voting">Join voting</Button>
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
