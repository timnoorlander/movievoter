import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { Button } from "../components/elements/Button";
import { useNavigate } from "react-router-dom";
import { useVotingContext } from "../providers/VotingProvider";
import { paths } from "../constants/paths";
import { slideRightAnimation } from "../components/layout/SlideRightAnimation";

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

  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = (inputs: Inputs) => {
    createVoting(inputs.votingName);
    navigate(paths.WAITING_ROOM);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Voting name"
        autoFocus
        {...register("votingName", { required: true })}
      ></Input>

      <Button type="submit">Create voting</Button>
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
  border-radius: ${theme.borderRadius};
  border: none;
  outline: none;
  font-size: ${theme.fontSizes.xs};
`;
