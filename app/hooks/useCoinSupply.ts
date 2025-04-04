import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CoinSupplyInfo {
  circulatingSupply: number;
  maxSupply: number;
}

export const useCoinSupply = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["coinSupply"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://api.kaspa.org/info/coinsupply",
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        },
      );
      return data as CoinSupplyInfo;
    },
    refetchInterval: 60000,
  });

  return { data, isLoading };
};
