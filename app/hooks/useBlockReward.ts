import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BlockRewardInfo {
  blockreward: number;
}

export const useBlockReward = () =>
  useQuery({
    staleTime: 60000,
    queryKey: ["blockReward"],
    queryFn: async () => {
      const { data } = await axios.get("https://api.kaspa.org/info/blockreward");
      return data as BlockRewardInfo;
    },
  });
