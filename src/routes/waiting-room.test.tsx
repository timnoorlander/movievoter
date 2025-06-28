import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { MovieVoter } from "../MovieVoter.tsx";

test("Join a voting session", async () => {
  render(<MovieVoter />);

  act(() => {
    fireEvent.click(screen.getByRole("join-voting"));
  });

  act(() => {
    fireEvent.change(screen.getByRole("voting-name"), {
      target: { value: "Test3" },
    });
    fireEvent.click(screen.getByRole("submit-voting"));
  });

  await waitFor(() => {
    expect(screen.getByText("There are currently")).not.toBeNull();
    expect(screen.getByText("Waiting for host to continue")).not.toBeNull();
  });
});

test("Create a voting session", async () => {
  render(<MovieVoter />);

  act(() => {
    fireEvent.click(screen.getByRole("create-voting"));
  });

  act(() => {
    fireEvent.change(screen.getByRole("voting-name"), {
      target: { value: "Test3" },
    });
    fireEvent.click(screen.getByRole("submit-voting"));
  });

  await waitFor(() => {
    expect(screen.getByText("There are currently")).not.toBeNull();
    expect(screen.getByText("Start voting process")).not.toBeNull();
  });
  screen.debug();
});
