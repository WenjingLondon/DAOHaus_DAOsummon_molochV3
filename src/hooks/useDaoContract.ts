//src/hooks/useDaoContract.ts
// useDaoContract.ts
import { ethers } from "ethers";
import molochAbi from "../abi/molochV3.json";
import useWallet from "./useWallet";
import { NETWORK } from "../utils/chains";

export default function useDaoContract() {
  const { signer } = useWallet();

  if (!signer) return null; // 必须有 signer 才能发交易

  const contract = new ethers.Contract(NETWORK.daoAddress, molochAbi, signer);

  return {
    contract,
    submitProposal: async (details: string) => {
      const tx = await contract.submitProposal(
        "0x0000000000000000000000000000000000000000",
        0,
        0,
        0,
        "0x0000000000000000000000000000000000000000",
        0,
        details
      );
      await tx.wait();
      return tx;
    },
    getTreasuryBalance: async () => {
      const balance = await contract.treasury();
      return ethers.utils.formatEther(balance);
    }
  };
}

