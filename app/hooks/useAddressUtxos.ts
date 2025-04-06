import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAddressUtxos = (address: string) =>
  useQuery({
    queryKey: ["utxos", { address }],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.kaspa.org/addresses/${address}/utxos`);
      return data as Utxo[];
    },
  });

interface Utxo {
  address: string;
  outpoint: {
    transactionId: string;
    index: number;
  };
  utxoEntry: {
    amount: string[];
    scriptPublicKey: {
      scriptPublicKey: string;
    };
    blockDaaScore: string;
    isCoinbase: boolean;
  };
}
