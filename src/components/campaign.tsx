// src/components/Campaigns.tsx
import { Campaign } from "../types";
import CampaignCard from "./CampaignCard";

export default function Campaigns({ campaigns }: { campaigns: Campaign[]; setPage: any }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black">Active Campaigns</h1>
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
