import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTransactionsSearch = (
  transactionIds: string[],
  fields: string,
  resolve_previous_outpoints: "no" | "light" | "full",
  enabled: boolean = true,
) =>
  useQuery({
    enabled,
    queryKey: ["transactions", { fields, transactionIds }],
    queryFn: async () => {
      const { data } = await axios.post(
        `https://api.kaspa.org/transactions/search`,
        {
          transactionIds,
        },
        {
          params: {
            fields,
            resolve_previous_outpoints,
          },
        },
      );
      return data as Transaction[];
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
