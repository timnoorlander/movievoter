import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyles } from "./styles/global-styles";
import { AppRoutes } from "./routes/index.tsx";
import { VotingProvider } from "./providers/VotingProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <VotingProvider>
      <GlobalStyles />
      <AppRoutes />
    </VotingProvider>
  </React.StrictMode>
);
