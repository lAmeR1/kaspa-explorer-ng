import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAddressNames = () =>
  useQuery({
    queryKey: ["addressNames"],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.kaspa.org/addresses/names`);
      return data.reduce((result: Record<string, string>, item: AddressName) => {
        result[item.address] = item.name;
        return result;
      }) as Record<string, string>;
    },
  });

export interface AddressName {
  address: string;
  name: string;
}
