import { Outlet } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";

export function Root() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
