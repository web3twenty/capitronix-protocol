import { LaunchItemProps } from "./types";

export const projects: LaunchItemProps[] = [
  {
    type: "Token",
    title: "3Twenty Coin",
    symbol: "$3TWENTY",
    price: "$0.01",
    progress: 78,
    totalRaised: "160M 3TWENTY",
    status: "Active",
    image: "/image-01.jpg",
    fullDescription:
      "3Twenty Coin is the utility backbone of the Capitronix ecosystem. It powers cross-chain transactions, community rewards, and allows users to participate in the most exclusive token launches with reduced fees.",
    websiteUrl: "https://capitronix.com/3twenty",
    tokenomics: [
      { label: "Total Supply", value: "160M" },
      { label: "Network Utility", value: "BEP-20" },
      { label: "Staking APR", value: "Up to 25%" },
    ],
    communityLinks: [
      { platform: "Twitter", url: "https://x.com/Capitronix2026" },
      { platform: "Telegram", url: "https://t.me/capitronixglobal" },
      {
        platform: "Facebook",
        url: "https://www.facebook.com/capitronixglobal",
      },
      { platform: "YouTube", url: "https://www.youtube.com/@CapitronixGlobal" },
    ],
  },
  {
    type: "NFT",
    title: "Capitronix NFT",
    price: "Free Activation",
    progress: 42,
    totalRaised: "10,000 Items",
    status: "Active",
    image: "/image-02.jpg",
    fullDescription:
      "The Genesis NFT collection represents founding membership in the Capitronix Protocol. Holders receive permanent allocation bonuses in all future launchpad projects and exclusive access to the VIP Ambassador Pool.",
    websiteUrl: "https://capitronix.com/genesis-nft",
    tokenomics: [
      { label: "Mint Type", value: "Free" },
      { label: "Royalty Fee", value: "5%" },
      { label: "Utility", value: "Pool Access" },
    ],
    communityLinks: [
      { platform: "Twitter", url: "https://x.com/Capitronix2026" },
      { platform: "Telegram", url: "https://t.me/capitronixglobal" },
      {
        platform: "Facebook",
        url: "https://www.facebook.com/capitronixglobal",
      },
      { platform: "YouTube", url: "https://www.youtube.com/@CapitronixGlobal" },
    ],
  },
  {
    type: "Token",
    title: "Alpha Protocol",
    symbol: "$ALPHA",
    price: "$0.01",
    progress: 100,
    totalRaised: "$500,000",
    status: "Finished",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000",
    fullDescription:
      "Alpha Protocol was the first incubation project in our ecosystem, successfully delivering a multi-chain lending platform that now manages over $10M in TVL.",
    websiteUrl: "https://capitronix.com/alpha",
    tokenomics: [
      { label: "Initial Supply", value: "100M" },
      { label: "Current Price", value: "$0.12" },
      { label: "Liquidity", value: "Locked" },
    ],
    communityLinks: [
      { platform: "Twitter", url: "#" },
      { platform: "Telegram", url: "#" },
    ],
  },
  {
    type: "NFT",
    title: "Void Walkers",
    price: "0.1 ETH",
    progress: 100,
    totalRaised: "3,333 Items",
    status: "Finished",
    image:
      "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=1000",
    fullDescription:
      "Void Walkers set the standard for tiered utility in our NFT marketplace. All 3,333 walkers were minted within 4 minutes of launch.",
    websiteUrl: "https://capitronix.com/void-walkers",
    tokenomics: [
      { label: "Supply", value: "3,333" },
      { label: "Floor Price", value: "0.8 ETH" },
      { label: "Royalties", value: "7.5%" },
    ],
    communityLinks: [
      { platform: "Twitter", url: "#" },
      { platform: "Telegram", url: "#" },
    ],
  },
  {
    type: "Token",
    title: "3twenty Stable Coin",
    symbol: "TUSD",
    price: "$1",
    progress: 0,
    status: "Upcoming",
    countdown: "03d : 14h : 22m",
    image: "/image-03.jpg",
    fullDescription:
      "CapiNode is a decentralized node infrastructure layer designed to optimize global marketing bandwidth. It allows the Community Growth Engine to scale infinitely by rewarding node operators for network visibility tasks.",
    websiteUrl: "https://capitronix.com/capinode",
    tokenomics: [
      { label: "Total Supply", value: "500M" },
      { label: "Circulating", value: "Launch Decided" },
      { label: "Pre-Sale", value: "Rank 3 Holders" },
    ],
   communityLinks: [
      { platform: "Twitter", url: "https://x.com/Capitronix2026" },
      { platform: "Telegram", url: "https://t.me/capitronixglobal" },
      {
        platform: "Facebook",
        url: "https://www.facebook.com/capitronixglobal",
      },
      { platform: "YouTube", url: "https://www.youtube.com/@CapitronixGlobal" },
    ],
  },
  {
    type: "Token",
    title: "Nexus Protocol",
    symbol: "$NEXUS",
    price: "TBA",
    progress: 0,
    status: "Upcoming",
    countdown: "08d : 10h : 45m",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    fullDescription:
      "Nexus Protocol leverages artificial intelligence to automate cross-chain liquidity management. It ensures that Capitronix users always get the highest yield with zero manual intervention.",
    websiteUrl: "https://capitronix.com/nexus",
    tokenomics: [
      { label: "Total Supply", value: "100M" },
      { label: "AI Treasury", value: "30%" },
      { label: "Launch Pool", value: "15%" },
    ],
    communityLinks: [
      { platform: "Twitter", url: "#" },
      { platform: "Telegram", url: "#" },
    ],
  },
];
