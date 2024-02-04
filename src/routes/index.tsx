import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./root";
import { GenericError } from "../components/layout/GenericError";
import { Home } from "./home";
import { CreateVoting } from "./create-voting";
import { WaitingRoom } from "./waiting-room";
import { JoinVoting } from "./join-voting";
import { RedirectWithoutVoting } from "../components/elements/RedirectWithoutVoting";
import { AddMovies } from "./add-movies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <GenericError />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/create-voting",
        element: <CreateVoting />,
      },
      {
        path: "/join-voting",
        element: <JoinVoting />,
      },
      {
        path: "/waiting-room",
        element: (
          <RedirectWithoutVoting>
            <WaitingRoom />
          </RedirectWithoutVoting>
        ),
      },
      {
        path: "/add-movies",
        element: <AddMovies />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
