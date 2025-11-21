import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFeeEstimate = () =>
  useQuery({
    queryKey: ["fee-estimate"],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.kaspa.org/info/fee-estimate`);
      return data as FeeEstimate;
    },
    retry: false,
  });

interface FeeBucket {
  feerate: number;
  estimateSeconds: number;
}

interface FeeEstimate {
  priorityBucket: FeeBucket;
  normalBuckets: FeeBucket[];
  lowBuckets: FeeBucket[];
}
