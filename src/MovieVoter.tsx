import {VotingProvider} from "./providers/VotingProvider.tsx";
import {GlobalStyles} from "./styles/global-styles.ts";
import {AppRoutes} from "./routes";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

export const MovieVoter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <VotingProvider>
        <GlobalStyles />
        <AppRoutes />
      </VotingProvider>
    </QueryClientProvider>
  )
}
