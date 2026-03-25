import { useKaspadInfo } from "./useKaspadInfo";

export const useMempoolSize = () => {
  const { data: kaspadInfo } = useKaspadInfo();

  return {
    mempoolSize: kaspadInfo?.mempoolSize || 0,
  };
};
