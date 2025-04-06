import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAddressTxCount = (address: string) =>
  useQuery({
    queryKey: ["txCount", { address }],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.kaspa.org/addresses/${address}/transactions-count`);
      return data as TxCount;
    },
  });

interface TxCount {
  total: number;
  limit_exceeded: boolean;
}
