import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAddressDistribution = () =>
  useQuery({
    queryKey: ["addressDistribution"],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.kaspa.org/addresses/distribution`);
      return data as AddressDistribution[];
    },
  });

export interface AddressDistribution {
  tiers: {
    tier: number;
    count: number;
    amount: number;
  }[];
  timestamp: number;
}
