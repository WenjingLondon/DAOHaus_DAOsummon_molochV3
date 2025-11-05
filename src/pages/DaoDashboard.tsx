
// src/pages/DaoDashboard.tsx
import { useEffect, useState } from "react";
import useDaoContract from "../hooks/useDaoContract";

interface YieldInfo {
  protocol: string;
  amount: number;
  yield: number;
}

export default function DaoDashboard() {
  const dao = useDaoContract();
  const [treasury, setTreasury] = useState<number>(0);
  const [yieldData, setYieldData] = useState<YieldInfo[]>([]);

  const yieldAllocation: Record<string, number> = { Aave: 0.3, Yearn: 0.5, Treasury: 0.2 };
  const simulatedAPY: Record<string, number> = { Aave: 0.05, Yearn: 0.07 };

  useEffect(() => {
    if (!dao) return;

    const fetchTreasury = async () => {
      try {
        const balanceStr = await dao.getTreasuryBalance();
        setTreasury(parseFloat(balanceStr));
      } catch (err) {
        console.error("Error fetching treasury balance:", err);
      }
    };

    fetchTreasury();
  }, [dao]);

  // 模拟 DeFi yield
  useEffect(() => {
    if (!treasury) return;
    const interval = setInterval(() => {
      setYieldData((prev) => {
        return Object.keys(yieldAllocation).map((protocol) => {
          const amount = treasury * yieldAllocation[protocol];
          const prevYield = prev.find((y) => y.protocol === protocol)?.yield || 0;
          const dailyYield = protocol === "Treasury" ? 0 : (amount * simulatedAPY[protocol]) / 365;
          return { protocol, amount, yield: prevYield + dailyYield };
        });
      });
    }, 1000); // 每秒模拟一天收益

    return () => clearInterval(interval);
  }, [treasury]);

  // 初始化 yieldData
  useEffect(() => {
    setYieldData(
      Object.keys(yieldAllocation).map((protocol) => ({
        protocol,
        amount: treasury * yieldAllocation[protocol],
        yield: 0,
      }))
    );
  }, [treasury]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">DAO Treasury & Automated DeFi Yield</h2>
      <p>Treasury Balance: {treasury.toFixed(2)} ETH</p>

      <div className="flex gap-6 mt-4">
        {yieldData.map((y) => (
          <div key={y.protocol} className="p-4 border rounded w-40 text-center">
            <h3 className="font-semibold">{y.protocol}</h3>
            <p>Allocated: {y.amount.toFixed(2)} ETH</p>
            <p className="text-green-600 font-bold">Yield: {y.yield.toFixed(4)} ETH</p>
          </div>
        ))}
      </div>
    </div>
  );
}

