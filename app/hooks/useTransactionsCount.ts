import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTransactionsCount = () =>
  useQuery({
    queryKey: ["transactionsCount"],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.kaspa.org/transactions/count/`);
      return data as TransactionCount;
    },
  });

interface TransactionCount {
  timestamp: number;
  dateTime: string;
  coinbase: number;
  regular: number;
}
