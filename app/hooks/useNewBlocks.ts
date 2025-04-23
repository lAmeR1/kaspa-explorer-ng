import { useSocketRoom } from "./useSocketRoom";
import { useCallback, useState } from "react";

interface Block {
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

export const useNewBlocks = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const handleBlocks = useCallback((newBlock: Block) => {
    console.log("new block", newBlock);
    setBlocks((prevBlocks) => [newBlock, ...prevBlocks.slice(0, 19)]);
  }, []);

  useSocketRoom<Block>({
    room: "blocks",
    eventName: "new-block",
    onMessage: handleBlocks,
  });

  return {
    blocks,
  };
};
