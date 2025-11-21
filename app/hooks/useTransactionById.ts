import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTransactionById = (transactionId: string) =>
  useQuery({
    queryKey: ["transaction", { transactionId }],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.kaspa.org/transactions/${transactionId}?resolve_previous_outpoints=light`,
      );
      return data as TransactionData;
    },
    enabled: !!transactionId,
    retry: 10,
    retryDelay: 1000,
  });

export interface TransactionData {
  subnetwork_id: string;
  transaction_id: string;
  hash: string;
  mass: string;
  payload: string;
  block_hash: string[];
  block_time: number;
  is_accepted: boolean;
  accepting_block_hash: string;
  accepting_block_blue_score: number;
  accepting_block_time: number;
  inputs: Array<{
    transaction_id: string;
    index: number;
    previous_outpoint_hash: string;
    previous_outpoint_index: string;
    previous_outpoint_resolved: {
      transaction_id: string;
      index: number;
      amount: number;
      script_public_key: string;
      script_public_key_address: string;
      script_public_key_type: string;
      accepting_block_hash: string;
    };
    previous_outpoint_address: string;
    previous_outpoint_amount: number;
    signature_script: string;
    sig_op_count: string;
  }> | null;
  outputs: Array<{
    transaction_id: string;
    index: number;
    amount: number;
    script_public_key: string;
    script_public_key_address: string;
    script_public_key_type: string;
    accepting_block_hash: string;
  }> | null;
}
