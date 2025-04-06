import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAddressBalance = (address: string) =>
  useQuery({
    queryKey: ["addresses", { address }],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.kaspa.org/addresses/${address}/balance`);
      return data as AddressBalance;
    },
  });

export interface AddressBalance {
  address: string;
  balance: number;
}
