import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTransactionCount = () =>
  useQuery({
    queryKey: ["transactionCount", {}],
    queryFn: async () => {
      const fetchForDate = async (date: string): Promise<TransactionCount[]> => {
        const { data } = await axios.get<TransactionCount[]>(`https://api.kaspa.org/transactions/count/${date}`);

        if (data && data.length > 0) {
          return data;
        }

        // If no data, try previous day
        const previousDay = new Date(date);
        previousDay.setDate(previousDay.getDate() - 1);
        const formattedPreviousDay = previousDay.toISOString().split("T")[0];

        return fetchForDate(formattedPreviousDay);
      };

      const initialDate = new Date().toISOString().split("T")[0];
      return fetchForDate(initialDate);
    },
  });

export interface TransactionCount {
  timestamp: number;
  dateTime: string;
  coinbase: number;
  regular: number;
}
