import { useSocketRoom } from "./useSocketRoom";
import { useCallback, useMemo, useState } from "react";

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
  const [blocks, setBlocks] = useState<Block[]>([]);

  const startTime = useMemo(() => Date.now(), []);
  const [blockCount, setBlockCount] = useState(0);

  const handleBlocks = useCallback((newBlock: Block) => {
    setBlockCount((prevBlockCount) => prevBlockCount + 1);
    setBlocks((prevBlocks) => [newBlock, ...prevBlocks.slice(0, 19)]);
  }, []);

  useSocketRoom<Block>({
    room: "blocks",
    eventName: "new-block",
    onMessage: handleBlocks,
  });

  return {
    blocks,
    avgBlockTime: blockCount / ((Date.now() - startTime) / 1000),
  };
};
