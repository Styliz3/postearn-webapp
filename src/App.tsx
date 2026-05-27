// src/App.tsx
import { useMemo, useState } from "react";
import { Campaign, Proof } from "./types";
import { starterCampaigns, starterProofs } from "./data";
import { getTelegramUser, isAdmin } from "./telegram";
import BottomNav from "./components/BottomNav";
import Dashboard from "./components/Dashboard";
import Campaigns from "./components/Campaigns";
import SubmitProof from "./components/SubmitProof";
import Rewards from "./components/Rewards";
import Support from "./components/Support";
import PayPalSetup from "./components/PayPalSetup";
import CreateCampaign from "./components/CreateCampaign";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const user = useMemo(() => getTelegramUser(), []);
  const admin = isAdmin(user.username);

  const [page, setPage] = useState("home");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>(starterCampaigns);
  const [proofs, setProofs] = useState<Proof[]>(starterProofs);

  const balance = proofs
    .filter((p) => p.status === "Approved")
    .reduce((sum, p) => sum + p.rewardAmount, 0);

  const paidTotal = proofs
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.rewardAmount, 0);

  const approveProof = (proofId: string) => {
    setProofs((prev) =>
      prev.map((p) =>
        p.id === proofId ? { ...p, status: "Approved" } : p
      )
    );

    const proof = proofs.find((p) => p.id === proofId);
    if (!proof || proof.status !== "Pending review") return;

    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== proof.campaignId) return c;
        const newCredit = Math.max(0, c.creditLeft - proof.rewardAmount);
        return {
          ...c,
          creditLeft: newCredit,
          status: newCredit <= 0 ? "Paused" : c.status
        };
      })
    );
  };

  const rejectProof = (proofId: string) => {
    const proof = proofs.find((p) => p.id === proofId);

    setProofs((prev) =>
      prev.map((p) =>
        p.id === proofId ? { ...p, status: "Rejected" } : p
      )
    );

    if (proof?.status === "Approved" || proof?.status === "Paid") {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === proof.campaignId
            ? {
                ...c,
                creditLeft: Math.min(c.totalCredit, c.creditLeft + proof.rewardAmount),
                status: "Active"
              }
            : c
        )
      );
    }
  };

  const markPaid = (proofId: string) => {
    setProofs((prev) =>
      prev.map((p) =>
        p.id === proofId ? { ...p, status: "Paid" } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#050806] pb-24">
      <div className="mx-auto max-w-md p-4">
        {page === "home" && (
          <Dashboard
            user={user}
            balance={balance}
            paidTotal={paidTotal}
            pending={proofs.filter((p) => p.status === "Pending review").length}
            campaigns={campaigns}
            paypalEmail={paypalEmail}
            setPage={setPage}
            admin={admin}
          />
        )}

        {page === "campaigns" && <Campaigns campaigns={campaigns} setPage={setPage} />}

        {page === "submit" && (
          <SubmitProof
            campaigns={campaigns}
            paypalEmail={paypalEmail}
            setPaypalEmail={setPaypalEmail}
            setProofs={setProofs}
            user={user}
          />
        )}

        {page === "rewards" && <Rewards proofs={proofs} />}

        {page === "support" && <Support />}

        {page === "paypal" && (
          <PayPalSetup paypalEmail={paypalEmail} setPaypalEmail={setPaypalEmail} />
        )}

        {page === "create" && <CreateCampaign />}

        {page === "admin" && admin && (
          <AdminPanel
            campaigns={campaigns}
            setCampaigns={setCampaigns}
            proofs={proofs}
            approveProof={approveProof}
            rejectProof={rejectProof}
            markPaid={markPaid}
          />
        )}
      </div>

      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}
