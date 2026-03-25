import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface KaspadInfo {
  mempoolSize: string;
  serverVersion: string;
  isUtxoIndexed: boolean;
  isSynced: boolean;
  p2pIdHashed: string;
}

export const useKaspadInfo = () =>
  useQuery({
    queryKey: ["kaspadInfo"],
    queryFn: async () => {
      const { data } = await axios.get("https://api.kaspa.org/info/kaspad");
      return data as KaspadInfo;
    },
    refetchInterval: 60000,
    staleTime: Infinity,
  });
