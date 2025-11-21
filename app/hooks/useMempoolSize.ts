import { useSocketRoom } from "./useSocketRoom";
import { useCallback, useState } from "react";

export const useMempoolSize = () => {
  const [mempoolSize, setMempoolSize] = useState<number>(0);

  const handleMempoolUpdate = useCallback((mempoolSize: number) => {
    console.log("mempoolSize", mempoolSize);
    setMempoolSize(mempoolSize);
  }, []);

  useSocketRoom<number>({
    room: "mempool",
    eventName: "mempool",
    onMessage: handleMempoolUpdate,
  });

  return {
    mempoolSize: mempoolSize,
  };
};
