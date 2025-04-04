import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface HalvingInfo {
  nextHalvingTimestamp: number;
  nextHalvingDate: string;
  nextHalvingAmount: number;
}

export const useHalving = () =>
  useQuery({
    queryKey: ["halving"],
    queryFn: async () => {
      const { data } = await axios.get("https://api.kaspa.org/info/halving");
      return data as HalvingInfo;
    },
  });
