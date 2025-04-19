import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAddressUtxos = (address: string) =>
  useQuery({
    queryKey: ["utxos", { address }],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.kaspa.org/addresses/${address}/utxos`);
      return data.sort(
        (a: Utxo, b: Utxo) => Number(b.utxoEntry.blockDaaScore) - Number(a.utxoEntry.blockDaaScore),
      ) as Utxo[];
    },
  });

interface Utxo {
  address: string;
  outpoint: {
    transactionId: string;
    index: number;
  };
  utxoEntry: {
    amount: string;
    scriptPublicKey: {
      scriptPublicKey: string;
    };
    blockDaaScore: string;
    isCoinbase: boolean;
  };
}
