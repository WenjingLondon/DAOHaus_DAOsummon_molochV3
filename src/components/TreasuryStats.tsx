//src/components/TreasuryStats.tsx

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import molochV3Abi from "../abi/molochV3.json";
import { NETWORK } from "../utils/chains";

interface TreasuryStatsProps {
  provider: ethers.BrowserProvider | null;
}

export default function TreasuryStats({ provider }: TreasuryStatsProps) {
  const [treasuryBalance, setTreasuryBalance] = useState<string | null>(null);

  useEffect(() => {
    if (!provider) return;

    const contract = new ethers.Contract(NETWORK.daoAddress, molochV3Abi, provider);

    async function fetchTreasury() {
      try {
        const tokenCount: number = await contract.getTokenCount();
        if (tokenCount > 0) {
          const tokenAddress: string = await contract.approvedTokens(0); // 取第一个代币
          const balance: ethers.BigNumber = await contract.getUserTokenBalance(NETWORK.daoAddress, tokenAddress);
          setTreasuryBalance(ethers.utils.formatEther(balance));
        } else {
          setTreasuryBalance("0");
        }
      } catch (err) {
        console.error("Treasury fetch error:", err);
      }
    }

    fetchTreasury();
  }, [provider]);

  return (
    <div>
      <h3>DAO Treasury Balance</h3>
      <p>{treasuryBalance !== null ? `${treasuryBalance} ETH (mock)` : "Loading..."}</p>
    </div>
  );
}

