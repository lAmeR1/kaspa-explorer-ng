import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTransactions = (
  address: string,
  limit: number = 50,
  before: number,
  after: number,
  fields: string,
  resolve_previous_outpoints: "no" | "light" | "full",
) =>
  useQuery({
    queryKey: ["transaction", { address, before, after, limit, fields, resolve_previous_outpoints }],
    queryFn: async () => {
      const response = await axios.get(`https://api.kaspa.org/addresses/${address}/full-transactions-page`, {
        params: {
          limit,
          before,
          after,
          fields,
          resolve_previous_outpoints,
        },
      });

      return {
        transactions: response.data as Transaction[],
        nextBefore: response.headers["x-next-page-before"],
        nextAfter: response.headers["x-next-page-after"],
        xPageCount: response.headers["x-page-count"],
      };
    },
  });

export interface PreviousOutpointResolved {
  transaction_id: string;
  index: number;
  amount: number;
  script_public_key: string;
  script_public_key_address: string;
  script_public_key_type: string;
  accepting_block_hash: string;
}

export interface Input {
  transaction_id: string;
  index: number;
  previous_outpoint_hash: string;
  previous_outpoint_index: string;
  previous_outpoint_resolved?: PreviousOutpointResolved;
  previous_outpoint_address?: string;
  previous_outpoint_amount?: number;
  signature_script: string;
  sig_op_count: string;
}

export interface Output {
  transaction_id: string;
  index: number;
  amount: number;
  script_public_key: string;
  script_public_key_address: string;
  script_public_key_type: string;
  accepting_block_hash: string;
}

export interface Transaction {
  subnetwork_id: string;
  transaction_id: string;
  hash: string;
  mass?: string | null;
  payload?: string | null;
  block_hash: string[];
  block_time: number;
  is_accepted: boolean;
  accepting_block_hash?: string;
  accepting_block_blue_score?: number;
  accepting_block_time?: number;
  inputs?: Input[];
  outputs?: Output[];
}
