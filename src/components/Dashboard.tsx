// src/components/Dashboard.tsx
import { Megaphone, Upload, Wallet, Plus, Settings, Shield } from "lucide-react";

export default function Dashboard({
  user,
  balance,
  paidTotal,
  pending,
  campaigns,
  paypalEmail,
  setPage,
  admin
}: any) {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-700 p-5 text-black">
        <p className="text-sm font-semibold">Welcome back</p>
        <h1 className="text-2xl font-black">{user.firstName}</h1>
        <p className="mt-2 text-sm">Earn PayPal rewards from approved campaign posts.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat label="Balance" value={`€${balance.toFixed(2)}`} />
        <Stat label="Paid total" value={`€${paidTotal.toFixed(2)}`} />
        <Stat label="Pending" value={pending} />
        <Stat label="Active campaigns" value={campaigns.filter((c: any) => c.status === "Active").length} />
      </div>

      <div className="rounded-2xl border border-green-900/40 bg-zinc-950 p-4">
        <p className="text-sm text-zinc-400">PayPal email</p>
        <p className="font-semibold">{paypalEmail || "Not set"}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Action icon={<Megaphone />} label="Start Earning" onClick={() => setPage("campaigns")} />
        <Action icon={<Upload />} label="Submit Proof" onClick={() => setPage("submit")} />
        <Action icon={<Wallet />} label="My Rewards" onClick={() => setPage("rewards")} />
        <Action icon={<Settings />} label="PayPal Setup" onClick={() => setPage("paypal")} />
        <Action icon={<Plus />} label="Create Campaign" onClick={() => setPage("create")} />
        {admin && <Action icon={<Shield />} label="Admin Panel" onClick={() => setPage("admin")} />}
      </div>
    </div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div className="rounded-2xl bg-zinc-950 p-4">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="text-xl font-black text-green-400">{value}</p>
    </div>
  );
}

function Action({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 rounded-2xl bg-zinc-950 p-4 text-left">
      <span className="text-green-400">{icon}</span>
      <span className="font-bold">{label}</span>
    </button>
  );
}
