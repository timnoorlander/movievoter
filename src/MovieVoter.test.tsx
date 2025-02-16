import {render, screen} from "@testing-library/react";
import {expect} from "vitest";
import {MovieVoter} from "./MovieVoter.tsx";

test('Renders the nice movie voter app', () =>{
  render(<MovieVoter />)
  console.log('I was adding of tests, so i can refactor with confidence')
  expect(screen.getByRole('create-voting')).not.toBeNull()
  expect(screen.getByRole('join-voting')).not.toBeNull()
})