import styled from "styled-components";
import { theme } from "../../styles/theme";
import React from "react";

type Props = {
  name: string;
  onToggleOn: () => void;
  onToggleOff: () => void;
};

export function Toggle({ name, onToggleOn, onToggleOff }: Props) {
  function onChange(event: React.FormEvent<HTMLInputElement>) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      onToggleOn();
    } else {
      onToggleOff();
    }
  }

  return <Checkbox name={name} type="checkbox" onChange={onChange}></Checkbox>;
}

const Checkbox = styled.input`
  position: relative;
  width: 3rem;
  height: 1.5rem;
  -webkit-appearance: none;
  appearance: none;
  background: #c6c6c6;
  outline: none;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(255, 0, 0, 0.2);
  transition: 0.7s;

  &:checked {
    background: ${theme.colors.success};
  }

  &:before {
    content: "";
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 20px;
    top: 0;
    left: 0;
    background: #ffffff;
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }

  &:checked:before {
    left: 1.5rem;
  }
`;
