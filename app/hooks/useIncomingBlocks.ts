import { useState } from "react";

export interface Block {
  block_hash: string;
  difficulty: number;
  blueScore: string;
  timestamp: string;
  txCount: number;
  txs: {
    txId: string;
    outputs: [string, string][];
  }[];
}

export const useIncomingBlocks = () => {
  const [blocks] = useState<Block[]>([]);

  const avgBlockTime = 1;

  return {
    blocks,
    avgBlockTime,
    transactions: [],
  };
};
