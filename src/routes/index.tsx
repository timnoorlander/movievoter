import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { GenericError } from "../components/layout/GenericError";
import { Home } from "./home";
import { CreateVoting } from "./create-voting";
import { WaitingRoom } from "./waiting-room";
import { JoinVoting } from "./join-voting";
import { RedirectWithoutVoting } from "../components/elements/RedirectWithoutVoting";
import { AddMovies } from "./add-movies";
import { MainLayout } from "../components/layout/MainLayout";
import { paths } from "../constants/paths";
import { Vote } from "./vote";

const router = createBrowserRouter([
  {
    path: paths.ROOT,
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    errorElement: <GenericError />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: paths.CREATE_VOTING,
        element: <CreateVoting />,
      },
      {
        path: paths.JOIN_VOTING,
        element: <JoinVoting />,
      },
      {
        path: paths.WAITING_ROOM,
        element: (
          <RedirectWithoutVoting>
            <WaitingRoom />
          </RedirectWithoutVoting>
        ),
      },
      {
        path: paths.ADD_MOVIES,
        element: (
          <RedirectWithoutVoting>
            <AddMovies />
          </RedirectWithoutVoting>
        ),
      },
      {
        path: paths.VOTE,
        element: (
          // <RedirectWithoutVoting>
          <Vote />
          // </RedirectWithoutVoting>
        ),
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
