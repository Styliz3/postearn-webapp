// src/types.ts
export type CampaignStatus = "Active" | "Paused" | "Completed";
export type ProofStatus = "Pending review" | "Approved" | "Paid" | "Rejected";

export type Campaign = {
  id: string;
  name: string;
  description: string;
  platforms: string[];
  rewardRule: string;
  totalCredit: number;
  creditLeft: number;
  rewardPerApproval: number;
  status: CampaignStatus;
};

export type Proof = {
  id: string;
  campaignId: string;
  campaignName: string;
  user: string;
  postLink: string;
  platform: string;
  platformUsername: string;
  likes: number;
  views: number;
  paypalEmail: string;
  rewardAmount: number;
  status: ProofStatus;
};
