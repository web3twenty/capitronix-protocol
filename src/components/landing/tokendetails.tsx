"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const TokenDetailsSection = () => {
  const [copied, setCopied] = useState(false);

  const tokenomicsData = [
    { label: "Presale", percentage: 50, amount: "160M", color: "#ffd700" },
    {
      label: "Liquidity Pool",
      percentage: 20,
      amount: "64M",
      color: "#2c5f5f",
    },
    {
      label: "Team & Development",
      percentage: 15,
      amount: "48M",
      color: "#8b5cf6",
    },
    { label: "Marketing", percentage: 8, amount: "25.6M", color: "#10b981" },
    { label: "Founder Pool", percentage: 5, amount: "16M", color: "#f97316" },
    { label: "Reserve", percentage: 2, amount: "6.4M", color: "#3b82f6" },
  ];

  const createPieChart = () => {
    let cumulativePercentage = 0;
    const radius = 140;
    const centerX = 160;
    const centerY = 160;
    return tokenomicsData.map((segment, index) => {
      const startAngle = (cumulativePercentage * 360) / 100;
      const endAngle =
        ((cumulativePercentage + segment.percentage) * 360) / 100;
      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;
      const largeArcFlag = segment.percentage > 50 ? 1 : 0;
      const x1 = centerX + radius * Math.cos(startAngleRad);
      const y1 = centerY + radius * Math.sin(startAngleRad);
      const x2 = centerX + radius * Math.cos(endAngleRad);
      const y2 = centerY + radius * Math.sin(endAngleRad);
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        "Z",
      ].join(" ");
      cumulativePercentage += segment.percentage;
      return (
        <path
          key={index}
          d={pathData}
          fill={segment.color}
          stroke="#1a2f2a"
          strokeWidth="3"
          opacity="0.9"
        />
      );
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const tokenDetails = [
    { label: "Token Name", value: "3Twenty Coin" },
    { label: "Token Symbol", value: "3TWENTY" },
    { label: "Token Standard", value: "BEP20" },
    { label: "Token Type", value: "Utility" },
    { label: "Blockchain", value: "Binance Smart Chain" },
    { label: "Total Supply", value: "320,000,000" },
    {
      label: "Contract Address",
      value: "0x2ffbdfa8638422bf3a5134434387b8fb5962da2c",
      copyable: true,
      truncate: true,
    },
    {
      label: "Phase 1 Active",
      value: "$0.01 per token",
      highlight: true,
    },
  ];

  return (
    <section
      id="token-presale"
      className="py-12 sm:py-16 lg:py-24 px-4 relative overflow-hidden !pt-0"
    >
      {/* Background Effects */}
      <div className="absolute w-96 h-96 -top-48 -left-48 bg-[#11B97E]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-[#11B97E]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4">
          <div className="inline-block">
            <h2 className="text-[#11B97E] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] bg-[#11B97E]/10 px-4 py-2 rounded-full border border-[#11B97E]/20">
              Token Information
            </h2>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Token Details & Tokenomics
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Complete information about 3Twenty Coin and our token distribution
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Token Details - Left Side */}
          <div className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-2 border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#11B97E]/30 hover:shadow-2xl hover:shadow-[#11B97E]/20">
            {/* Top Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#11B97E] to-transparent"></div>

            <div className="p-6 sm:p-8 lg:p-10">
              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#11B97E] mb-6 sm:mb-8">
                Token Details
              </h3>

              {/* Details List */}
              <div className="space-y-4">
                {tokenDetails.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-3 sm:py-4 border-b border-white/10 transition-all duration-300 hover:border-[#11B97E]/30 ${
                      item.highlight
                        ? "bg-[#11B97E]/5 -mx-4 px-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <span className="text-gray-300 text-sm sm:text-base lg:text-lg flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${
                          item.highlight
                            ? "bg-[#11B97E] shadow-lg shadow-[#11B97E]/50 animate-pulse"
                            : "bg-gray-500"
                        }`}
                      ></div>
                      {item.label}:
                    </span>
                    <span
                      className={`font-bold text-sm sm:text-base lg:text-lg flex items-center gap-2 ${
                        item.highlight ? "text-[#11B97E]" : "text-white"
                      }`}
                    >
                      {item.truncate ? truncateAddress(item.value) : item.value}
                      {item.copyable && (
                        <button
                          onClick={() => handleCopy(item.value)}
                          className="p-1.5 sm:p-2 rounded-lg hover:bg-[#11B97E]/20 transition-colors duration-300"
                          aria-label="Copy contract address"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-[#11B97E]" />
                          )}
                        </button>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#11B97E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Tokenomics Chart - Right Side */}
          <div className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-2 border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#11B97E]/30 hover:shadow-2xl hover:shadow-[#11B97E]/20">
            {/* Top Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#11B97E] to-transparent"></div>

            <div className="p-6 sm:p-8 lg:p-10">
              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#11B97E] mb-6 sm:mb-8 text-center">
                Tokenomics
              </h3>

              <div className="relative flex flex-col items-center">
                {/* Pie Chart */}
                <div className="relative mb-8">
                  <svg
                    width="320"
                    height="320"
                    className="transform -rotate-90 drop-shadow-2xl"
                  >
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    {createPieChart()}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-black/80 backdrop-blur-sm rounded-full w-32 h-32 flex flex-col items-center justify-center border-2 border-[#11B97E]/30 shadow-lg shadow-[#11B97E]/20">
                      <div className="text-3xl font-bold text-[#11B97E] mb-1">
                        320M
                      </div>
                      <div className="text-white text-sm">Total Supply</div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm max-w-md w-full">
                  {tokenomicsData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 bg-black/30 hover:bg-black/50 rounded-xl p-3 border border-white/10 hover:border-[#11B97E]/30 transition-all duration-300 hover:translate-x-1"
                    >
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 shadow-lg"
                        style={{
                          backgroundColor: item.color,
                          boxShadow: `0 0 10px ${item.color}`,
                        }}
                      ></div>
                      <div>
                        <div className="text-gray-300 font-medium text-xs sm:text-sm">
                          {item.label}
                        </div>
                        <div className="text-[#11B97E] text-xs font-semibold">
                          {item.percentage}% ({item.amount})
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#11B97E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenDetailsSection;
