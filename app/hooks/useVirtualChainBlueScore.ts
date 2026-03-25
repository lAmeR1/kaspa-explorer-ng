import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface VirualChainInfo {
  blueScore: number;
}

export const useVirtualChainBlueScore = () =>
  useQuery({
    queryKey: ["virtualChainBlueScore"],
    queryFn: async () => {
      const { data } = await axios.get("https://api.kaspa.org/info/virtual-chain-blue-score");
      return data as VirualChainInfo;
    },
    refetchInterval: 5000,
    staleTime: Infinity,
  });
