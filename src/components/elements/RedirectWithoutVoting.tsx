import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVotingContext } from "../../providers/VotingProvider";

type Props = {
  children: React.ReactNode;
};

export function RedirectWithoutVoting({ children }: Props) {
  const navigate = useNavigate();
  const { votingName } = useVotingContext();

  useEffect(() => {
    if (!votingName) {
      navigate("/");
    }
  }, [navigate, votingName]);

  return children;
}
