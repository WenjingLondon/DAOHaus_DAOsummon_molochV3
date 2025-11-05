
// src/components/ProposalButtonTest.tsx
// ProposalButtonTest.tsx
import React, { useState } from "react";
import useDaoContract from "../hooks/useDaoContract";

export default function ProposalButtonTest() {
  const dao = useDaoContract();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!dao) {
      alert("Connect wallet first");
      return;
    }
    try {
      setLoading(true);
      const tx = await dao.submitProposal("Test proposal MVP");
      alert("Proposal submitted: " + tx.hash);
    } catch (err) {
      console.error(err);
      alert("Submit failed, check console");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={submit} disabled={!dao || loading}>
      {loading ? "Submitting..." : "Submit Test Proposal"}
    </button>
  );
}



