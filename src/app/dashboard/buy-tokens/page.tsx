"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TokenPurchase from "./_components/TokenPurchase";
import TokenSell from "./_components/TokenSell";
import TokenExchange from "./_components/TokenExchange";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

type TabType = "buy" | "sell" | "exchange";

export default function TokenTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabFromUrl = searchParams.get("tab") as TabType | null;

  const [activeTab, setActiveTab] = useState<TabType>("buy");

  // Restore tab from URL on load / change
  useEffect(() => {
    if (tabFromUrl && ["buy", "sell", "exchange"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  // Update URL when tab changes
  const changeTab = (tab: TabType) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`, { scroll: false });
  };

  const tabClasses = (tab: TabType) =>
    `px-4 py-2 rounded-t-lg font-semibold cursor-pointer ${
      activeTab === tab
        ? "text-white border-b border-[#FFC200]"
        : "bg-[#03070D] text-[#888]"
    }`;

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get("/user/profile").then((res) => res.data),
  });

  return (
    <section className="p-4 md:px-6 md:py-2">
      {/* Tabs */}
      <div className="max-w-2xl mx-auto mb-6 flex border-b border-[#2A2A2A]">
        <div
          className={`${tabClasses("buy")} flex-1 text-center cursor-pointer`}
          onClick={() => changeTab("buy")}
        >
          Buy
        </div>
        <div
          className={`${tabClasses("sell")} flex-1 text-center cursor-pointer`}
          onClick={() => changeTab("sell")}
        >
          Sell
        </div>
        <div
          className={`${tabClasses(
            "exchange",
          )} flex-1 text-center cursor-pointer`}
          onClick={() => changeTab("exchange")}
        >
          Exchange
        </div>
      </div>

      {/* 🗂 Tab Content */}
      {activeTab === "buy" && (
        <TokenPurchase balance={profile?.usdtWallet || 0} />
      )}

      {activeTab === "sell" && (
        <TokenSell balance={profile?.tokenWallet || 0} />
      )}

      {activeTab === "exchange" && (
        <TokenExchange balance={profile?.rewardWallet || 0} />
      )}
    </section>
  );
}
