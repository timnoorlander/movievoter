import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVotingContext } from "../../providers/VotingProvider";
import { paths } from "../../constants/paths";

type Props = {
  children: React.ReactNode;
};

export function RedirectWithoutVoting({ children }: Props) {
  const navigate = useNavigate();
  const { votingName } = useVotingContext();

  useEffect(() => {
    if (!votingName) {
      navigate(paths.ROOT);
    }
  }, [navigate, votingName]);

  return children;
}
