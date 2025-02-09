import ReactDOM from "react-dom/client";
import { GlobalStyles } from "./styles/global-styles";
import { AppRoutes } from "./routes";
import { VotingProvider } from "./providers/VotingProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <VotingProvider>
      <GlobalStyles />
      <AppRoutes />
    </VotingProvider>
  </QueryClientProvider>
);
