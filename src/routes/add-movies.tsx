import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Input } from "../components/elements/Input";
import { theme } from "../styles/theme";

const imdbUrlRegex = /^(https?:\/\/)?(www\.)?imdb\.com\/title\/tt\d+\/?$/;

type Inputs = {
  imdbUrl: string;
};

export function AddMovies() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<Inputs> = ({ imdbUrl }: Inputs) => {
    console.log("kaas");
    const splitImdbUrl = imdbUrl.split("/");
    const imdbId = splitImdbUrl[splitImdbUrl.length - 1];
    console.log(imdbId);
  };

  return (
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
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 100%;
  justify-content: center;
  text-align: center;
`;

const InputError = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.fontSizes.xs};
`;
