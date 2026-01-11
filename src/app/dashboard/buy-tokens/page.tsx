"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TokenPurchase from "./_components/TokenPurchase";
import TokenSell from "./_components/TokenSell";
import TokenExchange from "./_components/TokenExchange";

type TabType = "buy" | "sell" | "exchange";

export default function TokenTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabFromUrl = searchParams.get("tab") as TabType | null;

  const [activeTab, setActiveTab] = useState<TabType>("buy");

  // 🔁 Restore tab from URL on load / change
  useEffect(() => {
    if (tabFromUrl && ["buy", "sell", "exchange"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  // 🔗 Update URL when tab changes
  const changeTab = (tab: TabType) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`, { scroll: false });
  };

  const tabClasses = (tab: TabType) =>
    `px-4 py-2 rounded-t-lg font-semibold cursor-pointer ${
      activeTab === tab ? "bg-[#13171E] text-white" : "bg-[#03070D] text-[#888]"
    }`;

  return (
    <section className="p-4 md:px-6 md:py-2">
      {/* 🏷 Tabs */}
      <div className="max-w-2xl mx-auto mb-4 flex border-b border-[#2A2A2A]">
        <div className={tabClasses("buy")} onClick={() => changeTab("buy")}>
          Buy
        </div>
        <div className={tabClasses("sell")} onClick={() => changeTab("sell")}>
          Sell
        </div>
        <div
          className={tabClasses("exchange")}
          onClick={() => changeTab("exchange")}
        >
          Exchange
        </div>
      </div>

      {/* 🗂 Tab Content */}
      {activeTab === "buy" && <TokenPurchase />}

      {activeTab === "sell" && <TokenSell />}

      {activeTab === "exchange" && <TokenExchange />}
    </section>
  );
}
