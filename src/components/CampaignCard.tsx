// src/components/CampaignCard.tsx
import { Campaign } from "../types";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const spots = Math.floor(campaign.creditLeft / campaign.rewardPerApproval);

  return (
    <div className="rounded-2xl border border-green-900/40 bg-zinc-950 p-4 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">{campaign.name}</h3>
          <p className="mt-1 text-sm text-zinc-400">{campaign.description}</p>
        </div>
        <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-black">
          {campaign.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-xl bg-black p-3">
          <p className="text-zinc-500">Reward</p>
          <p className="font-bold">€{campaign.rewardPerApproval.toFixed(2)}</p>
        </div>
        <div className="rounded-xl bg-black p-3">
          <p className="text-zinc-500">Credit left</p>
          <p className="font-bold">€{campaign.creditLeft.toFixed(2)}</p>
        </div>
        <div className="rounded-xl bg-black p-3">
          <p className="text-zinc-500">Spots</p>
          <p className="font-bold">{spots}</p>
        </div>
        <div className="rounded-xl bg-black p-3">
          <p className="text-zinc-500">Payment</p>
          <p className="font-bold">PayPal</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-500">{campaign.rewardRule}</p>
    </div>
  );
}
