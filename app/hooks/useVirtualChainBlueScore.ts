import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BlueScore {
  blueScore: number;
}

export const useVirtualChainBlueScore = () =>
  useQuery({
    queryKey: ["bluescore"],
    queryFn: async () => {
      const { data } = await axios.get("https://api.kaspa.org/info/virtual-chain-blue-score");
      return data as BlueScore;
    },
    refetchInterval: 5000,
  });
