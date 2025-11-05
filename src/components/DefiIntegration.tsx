//src/components/DefiIntegration.tsx

import { useState } from "react";

interface DefiIntegrationProps {
  treasuryBalance: number; // DAO Treasury 当前金额
}

export default function DefiIntegration({ treasuryBalance }: DefiIntegrationProps) {
  const [invested, setInvested] = useState(false);

  const handleInvest = () => {
    // 模拟投资，不涉及真实转账
    if (treasuryBalance > 0) {
      setInvested(true);
      console.log(`Mock investing ${treasuryBalance} ETH into yield aggregator`);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white max-w-md mx-auto text-center">
      <h3 className="text-xl font-semibold mb-4">DeFi Yield Investment (Mock)</h3>
      {invested ? (
        <p className="text-green-600 font-bold">Funds have been “invested” into DeFi. 📈</p>
      ) : (
        <button
          onClick={handleInvest}
          disabled={!treasuryBalance}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Invest DAO Treasury into Yield (Mock)
        </button>
      )}
    </div>
  );
}
