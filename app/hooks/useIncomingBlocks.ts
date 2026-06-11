import { useSocketRoom } from "./useSocketRoom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

  const startTime = useMemo(() => Date.now() + 500, []);
  const [blockCount, setBlockCount] = useState(0);
  const [avgBlockTime, setAvgBlockTime] = useState(0);

  const handleBlocks = useCallback((newBlock: Block) => {
    setBlockCount((prevBlockCount) => prevBlockCount + 1);
    setBlocks((prevBlocks) => [newBlock, ...prevBlocks.slice(0, 19)]);
  }, []);
  const lastThrottleTime = useRef(0);

  useSocketRoom<Block>({
    room: "blocks",
    eventName: "new-block",
    onMessage: handleBlocks,
  });

  useEffect(() => {
    // Throttling logic with `useRef`
    const now = Date.now();
    if (now - lastThrottleTime.current >= 200) {
      setAvgBlockTime(() => blockCount / (Math.max(now - startTime, 500) / 1000));
      lastThrottleTime.current = now;
    }
  }, [blockCount, startTime]);

  const txs = [];

  for (const block of blocks) {
    for (const tx of block.txs) {
      txs.push(tx);
      if (txs.length > 20) break;
    }
    if (txs.length > 20) break;
  }

  return {
    blocks,
    avgBlockTime,
    transactions: txs,
  };
};
