"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Rocket,
} from "lucide-react";

const RoadmapSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(2);

  const roadmapData = [
    {
      quarter: "Q1 2024",
      title: "Research & Foundation",
      items: [
        "R&D for Decentralized Payment Solution.",
        "Market analysis for 3TwentyPay.",
        "Building prototype",
        "Creating UI/UX for 3TwentyPay",
      ],
      status: "completed",
    },
    {
      quarter: "Q2 2024",
      title: "Integration & Testing",
      items: [
        "BNB Chain integration with 3TwentyPay.",
        "Testing payments with BEP20 tokens.",
        "Extending support to other EVM chains.",
        "Building compatibility to support all EVM chains.",
      ],
      status: "completed",
    },
    {
      quarter: "Q3 2024",
      title: "Beta & Security",
      items: [
        "Beta testing with global clients.",
        "Creating merchant dashboard.",
        "Implementing security updates.",
        "Opening platform for real-world clients.",
      ],
      status: "completed",
    },
    {
      quarter: "Q1 2025",
      title: "Expansion & Planning",
      items: [
        "Seed planning for global expansion.",
        "R&D for Web3Twenty Ecosystem.",
        "Planning to deploy 3TwentyCoin.",
        "Data analysis for 3TwentyCoin.",
      ],
      status: "completed",
    },
    {
      quarter: "Q2 2025",
      title: "Presale & Community",
      items: [
        "Launch of presale.",
        "Strong community-building initiatives.",
        "Smart contract verification.",
        "Smart contract audit.",
      ],
      status: "completed",
    },
    {
      quarter: "Q3 2025",
      title: "Global Launch",
      items: [
        "Grand launch of 3TwentyPay globally.",
        "Updating merchant dashboard.",
        "3rd party token listing.",
        "3TwentyPay Global Campaign.",
      ],
      status: "completed",
    },
    {
      quarter: "Q4 2025",
      title: "Ecosystem & Partnerships",
      items: [
        "Organizing 3Twenty Labs.",
        "Planning for 3Twenty Smart Chain.",
        "Technical research & development.",
        "Strategic partnerships with global enterprises.",
      ],
      status: "current",
    },
    {
      quarter: "Q1 2026",
      title: "Foundation & Infrastructure",
      items: [
        "Advanced R&D for 3Twenty Smart Chain (high scalability & low transaction fees).",
        "Building core architecture of 3Twenty Exchange (DEX + CEX hybrid model).",
        "Development kick-off for 3Twenty Wallet (multi-chain, secure & user-friendly).",
        "Expanding 3Twenty Labs to onboard developers, researchers & blockchain startups.",
      ],
      status: "upcoming",
    },
    {
      quarter: "Q2 2026",
      title: "Development & Testing",
      items: [
        "Testnet launch of 3Twenty Smart Chain with validator onboarding.",
        "Alpha release of 3Twenty Wallet with 3TwentyPay & multi-chain support.",
        "Internal beta testing of 3Twenty Exchange (trading pairs with 3TwentyCoin & stablecoins).",
        "Hackathon programs under 3Twenty Labs to drive innovation & adoption.",
      ],
      status: "upcoming",
    },
    {
      quarter: "Q3 2026",
      title: "Deployment & Adoption",
      items: [
        "Mainnet launch of 3Twenty Smart Chain with staking & validator rewards.",
        "Public beta launch of 3Twenty Exchange (spot trading + liquidity pools).",
        "Global rollout of 3Twenty Wallet on mobile & desktop.",
        "Developer grants & incubation program via 3Twenty Labs to support dApps.",
      ],
      status: "upcoming",
    },
    {
      quarter: "Q4 2026",
      title: "Ecosystem Expansion",
      items: [
        "Integration of 3Twenty Smart Chain with major ecosystems (cross-chain bridges).",
        "Launch of derivatives & advanced trading features on 3Twenty Exchange.",
        "NFT & DeFi support inside 3Twenty Wallet.",
        "Strategic partnerships with global enterprises & blockchain projects.",
        "Annual 3Twenty Global Summit organized by 3Twenty Labs.",
      ],
      status: "upcoming",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setCardsPerSlide(window.innerWidth < 768 ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = [];
  for (let i = 0; i < roadmapData.length; i += cardsPerSlide) {
    slides.push(roadmapData.slice(i, i + cardsPerSlide));
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  return (
    <section
      id="roadmap"
      className="py-6 sm:py-8 lg:py-12 px-4 relative overflow-hidden !pt-0"
    >
      {/* Background Effects */}
      <div className="absolute w-96 h-96 -top-48 -left-48 bg-[#11B97E]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-[#11B97E]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4">
          <div className="inline-block">
            <h2 className="text-[#11B97E] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] bg-[#11B97E]/10 px-4 py-2 rounded-full border border-[#11B97E]/20">
              Our Journey
            </h2>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Roadmap
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Our journey from project kickoff to global adoption
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {slides.map((slideCards, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                >
                  <div
                    className={`grid gap-4 sm:gap-6 lg:gap-8 ${
                      cardsPerSlide === 1 ? "grid-cols-1" : "md:grid-cols-2"
                    }`}
                  >
                    {slideCards.map((phase, index) => (
                      <div
                        key={index}
                        className={`group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-2 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                          phase.status === "current"
                            ? "border-[#11B97E]/50 shadow-xl shadow-[#11B97E]/20"
                            : phase.status === "completed"
                            ? "border-green-500/30 shadow-lg shadow-green-500/10"
                            : "border-white/10 shadow-lg hover:border-[#11B97E]/30 hover:shadow-[#11B97E]/10"
                        }`}
                      >
                        {/* Top Gradient Line */}
                        <div
                          className={`h-1 w-full ${
                            phase.status === "current"
                              ? "bg-gradient-to-r from-transparent via-[#11B97E] to-transparent"
                              : phase.status === "completed"
                              ? "bg-gradient-to-r from-transparent via-green-500 to-transparent"
                              : "bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-50"
                          }`}
                        ></div>

                        <div className="p-6 sm:p-8 lg:p-10">
                          {/* Quarter Badge */}
                          <div className="flex items-center justify-center gap-3 mb-6">
                            <span
                              className={`inline-block text-sm sm:text-base lg:text-lg px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-full border-2 transition-all duration-300 ${
                                phase.status === "completed"
                                  ? "bg-green-500/10 text-green-400 border-green-500/30 shadow-lg shadow-green-500/20"
                                  : phase.status === "current"
                                  ? "bg-[#11B97E]/10 text-[#11B97E] border-[#11B97E]/30 shadow-lg shadow-[#11B97E]/20 animate-pulse"
                                  : "bg-gray-500/10 text-gray-400 border-gray-500/30"
                              }`}
                            >
                              {phase.quarter}
                            </span>
                            {phase.status === "completed" && (
                              <div className="relative">
                                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 animate-pulse" />
                                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md"></div>
                              </div>
                            )}
                            {phase.status === "current" && (
                              <div className="relative">
                                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-[#11B97E] animate-pulse" />
                                <div className="absolute inset-0 bg-[#11B97E]/20 rounded-full blur-md"></div>
                              </div>
                            )}
                            {phase.status === "upcoming" && (
                              <div className="relative">
                                <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                              </div>
                            )}
                          </div>

                          {/* Title */}
                          <h3
                            className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center transition-colors duration-300 ${
                              phase.status === "current"
                                ? "text-[#11B97E]"
                                : phase.status === "completed"
                                ? "text-green-400 group-hover:text-green-300"
                                : "text-white group-hover:text-[#11B97E]"
                            }`}
                          >
                            {phase.title}
                          </h3>

                          {/* Items List */}
                          <div className="space-y-1">
                            {phase.items.map((item, i) => (
                              <div
                                key={i}
                                className="group/item relative bg-black/30 hover:bg-black/50 rounded-xl sm:rounded-2xl p-3 sm:p-3 border border-white/5 hover:border-[#11B97E]/30 transition-all duration-300 hover:translate-x-1"
                              >
                                <div className="flex items-start gap-3 text-gray-300 group-hover/item:text-white transition-colors duration-300">
                                  <div
                                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 ${
                                      phase.status === "completed"
                                        ? "bg-green-400 shadow-lg shadow-green-400/50"
                                        : phase.status === "current"
                                        ? "bg-[#11B97E] shadow-lg shadow-[#11B97E]/50 group-hover/item:scale-125"
                                        : "bg-gray-500 group-hover/item:bg-[#11B97E]"
                                    }`}
                                  ></div>
                                  <span className="text-sm sm:text-base leading-relaxed">
                                    {item}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Accent Line */}
                        <div
                          className={`absolute bottom-0 left-0 right-0 h-1 transition-opacity duration-500 ${
                            phase.status === "current"
                              ? "bg-gradient-to-r from-transparent via-[#11B97E] to-transparent opacity-100"
                              : "bg-gradient-to-r from-transparent via-[#11B97E] to-transparent opacity-0 group-hover:opacity-100"
                          }`}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-[#11B97E]/20 border-2 border-white/10 hover:border-[#11B97E]/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-xl z-20 flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-[#11B97E]/20 border-2 border-white/10 hover:border-[#11B97E]/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-xl z-20 flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-0 gap-2 sm:gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 sm:w-10 h-2.5 sm:h-3 bg-[#11B97E] shadow-lg shadow-[#11B97E]/50"
                    : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
