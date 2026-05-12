import { LaunchItemProps } from "./types";

export const projects: LaunchItemProps[] = [
  {
    type: "Token",
    title: "3Twenty Coin",
    symbol: "$3TWENTY",
    price: "$0.03",
    progress: 78,
    totalRaised: "21,000,000 $3TWENTY",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1000",
    fullDescription:
      "3Twenty Coin is the utility backbone of the Capitronix ecosystem. It powers cross-chain transactions, community rewards, and allows users to participate in the most exclusive token launches with reduced fees.",
    websiteUrl: "https://capitronix.com/3twenty",
    tokenomics: [
      { label: "Total Supply", value: "210M" },
      { label: "Network Utility", value: "Governance" },
      { label: "Staking APR", value: "Up to 24%" },
    ],
    communityLinks: [
      { platform: "Twitter", url: "#" },
      { platform: "Telegram", url: "#" },
      { platform: "Facebook", url: "#" },
      { platform: "YouTube", url: "#" },
    ],
  },
  {
    type: "NFT",
    title: "Capitronix Genesis",
    price: "Free w/ Activation",
    progress: 42,
    totalRaised: "10,000 Items",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000",
    fullDescription:
      "The Genesis NFT collection represents founding membership in the Capitronix Protocol. Holders receive permanent allocation bonuses in all future launchpad projects and exclusive access to the VIP Ambassador Pool.",
    websiteUrl: "https://capitronix.com/genesis-nft",
    tokenomics: [
      { label: "Mint Type", value: "Free" },
      { label: "Royalty Fee", value: "5%" },
      { label: "Utility", value: "Pool Access" },
    ],
    communityLinks: [
      { platform: "Twitter", url: "#" },
      { platform: "Telegram", url: "#" },
      { platform: "YouTube", url: "#" },
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
    title: "CapiNode Protocol",
    symbol: "$CPNODE",
    price: "TBA",
    progress: 0,
    status: "Upcoming",
    countdown: "03d : 14h : 22m",
    image:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=1000",
    fullDescription:
      "CapiNode is a decentralized node infrastructure layer designed to optimize global marketing bandwidth. It allows the Community Growth Engine to scale infinitely by rewarding node operators for network visibility tasks.",
    websiteUrl: "https://capitronix.com/capinode",
    tokenomics: [
      { label: "Total Supply", value: "500M" },
      { label: "Circulating", value: "Launch Decided" },
      { label: "Pre-Sale", value: "Rank 3 Holders" },
    ],
    communityLinks: [
      { platform: "Twitter", url: "#" },
      { platform: "Telegram", url: "#" },
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
