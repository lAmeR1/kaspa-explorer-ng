import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchBlock = async (blockId: string) => {
  const { data } = await axios.get(`https://api.kaspa.org/blocks/${blockId}?includeColor=true`);
  return data as BlockData;
};

export const useBlockById = (blockId: string) =>
  useQuery({
    queryKey: ["block", blockId],
    queryFn: () => fetchBlock(blockId),
    enabled: Boolean(blockId),
    retry: false,
  });

export const useBlocksByIds = (blockIds: string[]) =>
  useQueries({
    queries: blockIds.filter(Boolean).map((blockId) => ({
      queryKey: ["block", blockId] as const,
      queryFn: () => fetchBlock(blockId),
      enabled: Boolean(blockId),
      retry: false,
    })),
  });

export const useBlocksByIdsAggregated = (blockIds: string[]) => {
  const results = useBlocksByIds(blockIds);
  return {
    data: results.map((r) => r.data).filter(Boolean) as BlockData[],
    isLoading: results.some((r) => r.isLoading),
    isError: results.some((r) => r.isError),
    errors: results.map((r) => r.error).filter(Boolean),
  };
};

interface BlockData {
  header: {
    version: number;
    hashMerkleRoot: string;
    acceptedIdMerkleRoot: string;
    utxoCommitment: string;
    timestamp: string;
    bits: number;
    nonce: string;
    daaScore: string;
    blueWork: string;
    parents: {
      parentHashes: string[];
    }[];
    blueScore: string;
    pruningPoint: string;
  };
  transactions: Transaction[];
  verboseData: {
    hash: string;
    difficulty: number[];
    selectedParentHash: string;
    transactionIds: string[];
    blueScore: string;
    childrenHashes: string[];
    mergeSetBluesHashes: string[];
    mergeSetRedsHashes: string[];
    isChainBlock: boolean;
  };
  extra: {
    color: string;
    minerAddress: string;
    minerInfo: string;
  };
}

interface Transaction {
  inputs: {
    previousOutpoint: {
      transactionId: string;
      index: number;
    };
    signatureScript: string;
    sigOpCount: number;
    sequence: number;
  }[];
  outputs: {
    amount: number;
    scriptPublicKey: {
      scriptPublicKey: string;
      version: number;
    };
    verboseData: {
      scriptPublicKeyType: string;
      scriptPublicKeyAddress: string;
    };
  }[];
  subnetworkId: string;
  payload: string;
  verboseData: {
    transactionId: string;
    hash: string;
    computeMass: number;
    blockHash: string;
    blockTime: number;
  };
  lockTime: number;
  gas: number;
  mass: number;
  version: number;
}
