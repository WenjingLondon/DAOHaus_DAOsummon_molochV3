
import React from "react";
import ConnectWallet from "./components/ConnectWallet";
import ProposalButtonTest from "./components/ProposalButtonTest";
import DaoDashboardTest from "./components/DaoDashboardTest";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DAO MVP Test</h1>
      <ConnectWallet />
      <DaoDashboardTest />
      <ProposalButtonTest />
    </div>
  );
}
