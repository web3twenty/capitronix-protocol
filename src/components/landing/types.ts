export interface CommunityLink {
  platform: "Telegram" | "Facebook" | "Twitter" | "YouTube";
  url: string;
}

export interface LaunchItemProps {
  type: "Token" | "NFT";
  title: string;
  symbol?: string;
  price: string;
  progress: number;
  totalRaised?: string;
  status: "Active" | "Upcoming" | "Finished";
  image: string;
  countdown?: string;
  fullDescription: string;
  websiteUrl?: string;
  tokenomics?: { label: string; value: string }[];
  communityLinks?: CommunityLink[];
}
