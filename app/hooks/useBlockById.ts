import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useBlockById = (blockId: string) =>
  useQuery({
    queryKey: ["block", { blockId }],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.kaspa.org/blocks/${blockId}?includeColor=true`);
      return data as BlockData;
    },
    enabled: !!blockId,
    retry: false,
  });

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
