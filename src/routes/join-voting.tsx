import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { Button } from "../components/elements/Button";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

type Inputs = {
  votingName: string;
};

const socket = io("http://localhost:3001");

export function JoinVoting() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = (inputs: Inputs) => {
    console.log(inputs);
    socket.emit("join-room", inputs.votingName);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Voting name"
        autoFocus
        {...register("votingName", { required: true })}
      ></Input>

      <Button type="submit">Join voting</Button>
    </Form>
  );
}

const Form = styled.form`
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
