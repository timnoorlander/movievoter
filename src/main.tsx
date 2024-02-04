import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyles } from "./styles/global-styles";
import { AppRoutes } from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles />
    <AppRoutes />
  </React.StrictMode>
);
