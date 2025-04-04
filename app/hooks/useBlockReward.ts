import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BlockRewardInfo {
  blockreward: number;
}

export const useBlockReward = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["blockReward"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://api.kaspa.org/info/blockreward",
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        },
      );
      return data as BlockRewardInfo;
    },
  });

  return { data, isLoading };
};
