// DaoDashboardTest.tsx
import React, { useEffect, useState } from "react";
import useDaoContract from "../hooks/useDaoContract";

export default function DaoDashboardTest() {
  const dao = useDaoContract();
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    if (!dao) return;
    dao.getTreasuryBalance().then(setBalance).catch(console.error);
  }, [dao]);

  return <div>DAO Treasury: {balance} ETH</div>;
}
