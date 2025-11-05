
// src/components/DefiIntegrationDemo.tsx
import { useEffect, useState } from "react";

interface YieldData {
  protocol: string;
  amount: number;
  yield: number;
}

export default function DefiIntegrationDemo() {
  // 模拟 Treasury 总额
  const [treasuryBalance, setTreasuryBalance] = useState<number>(10); // ETH
  const [yieldData, setYieldData] = useState<YieldData[]>([]);

  const yieldAllocation: Record<string, number> = { Aave: 0.3, Yearn: 0.5, Treasury: 0.2 };
  const simulatedAPY: Record<string, number> = { Aave: 0.05, Yearn: 0.07 }; // 年化收益

  // 模拟每日收益累积
  useEffect(() => {
    const interval = setInterval(() => {
      setYieldData((prev) => {
        const newData: YieldData[] = Object.keys(yieldAllocation).map((protocol) => {
          const amount = treasuryBalance * yieldAllocation[protocol];
          const dailyYield =
            protocol === "Treasury" ? 0 : (amount * simulatedAPY[protocol]) / 365;
          const prevYield = prev.find((y) => y.protocol === protocol)?.yield || 0;
          return {
            protocol,
            amount,
            yield: prevYield + dailyYield,
          };
        });
        return newData;
      });
    }, 1000); // 每秒模拟一天收益（可调）
    return () => clearInterval(interval);
  }, [treasuryBalance]);

  // 初始化 yieldData
  useEffect(() => {
    const initialData: YieldData[] = Object.keys(yieldAllocation).map((protocol) => ({
      protocol,
      amount: treasuryBalance * yieldAllocation[protocol],
      yield: 0,
    }));
    setYieldData(initialData);
  }, [treasuryBalance]);

  return (
    <div className="mt-16 p-6 border rounded-lg shadow-lg bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-center">DAO Treasury & Automated DeFi Yield</h2>

      <p className="text-center mb-6 text-gray-700">
        A portion of the DAO treasury is automatically allocated to DeFi protocols, generating yield without any user action.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-start gap-6">
        {yieldData.map((y) => (
          <div
            key={y.protocol}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md w-60 text-center transition"
          >
            <h3 className="font-semibold text-lg">{y.protocol}</h3>
            <p className="mt-2">Allocated: {y.amount.toFixed(2)} ETH</p>
            <p className="mt-1 text-green-600 font-bold">Yield: {y.yield.toFixed(4)} ETH</p>
          </div>
        ))}
      </div>

      {/* Pie Chart 模拟 */}
      <div className="mt-8 flex justify-center">
        <svg width="200" height="200" viewBox="0 0 32 32">
          {yieldData
            .reduce<{ start: number; end: number; color: string }[]>((acc, y, idx) => {
              const total = yieldData.reduce((sum, i) => sum + i.amount, 0);
              const start = acc.length ? acc[acc.length - 1].end : 0;
              const percent = (y.amount / total) * 100;
              const end = start + percent;
              const colors = ["#34D399", "#60A5FA", "#FBBF24"];
              acc.push({ start, end, color: colors[idx % colors.length] });
              return acc;
            }, [])
            .map((slice, i) => {
              const radius = 16;
              const startAngle = (slice.start / 100) * 2 * Math.PI;
              const endAngle = (slice.end / 100) * 2 * Math.PI;
              const x1 = 16 + radius * Math.cos(startAngle);
              const y1 = 16 + radius * Math.sin(startAngle);
              const x2 = 16 + radius * Math.cos(endAngle);
              const y2 = 16 + radius * Math.sin(endAngle);
              const largeArc = slice.end - slice.start > 50 ? 1 : 0;
              return (
                <path
                  key={i}

