import { useSocketRoom } from "./useSocketRoom";
import { useCallback, useState } from "react";

export const useVirtualChainBlueScore = () => {
  const [virtualChainBlueScore, setVirtualChainBlueScore] = useState<number>();

  const handleResponse = useCallback((blueScore: { blueScore: string }) => {
    setVirtualChainBlueScore(parseInt(blueScore.blueScore));
  }, []);

  useSocketRoom({
    room: "bluescore",
    eventName: "bluescore",
    onMessage: handleResponse,
  });

  return {
    virtualChainBlueScore,
  };
};
