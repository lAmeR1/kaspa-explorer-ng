import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface HalvingInfo {
  nextHalvingTimestamp: number;
  nextHalvingDate: string;
  nextHalvingAmount: number;
}

export const useHalving = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["halving"],
    queryFn: async () => {
      const { data } = await axios.get("https://api.kaspa.org/info/halving", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      return data as HalvingInfo;
    },
  });

  return { data, isLoading };
};
