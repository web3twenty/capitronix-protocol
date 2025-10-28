"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial tab from URL query, default to 'profile'
  const initialTab =
    searchParams.get("tab") === "security" ? "security" : "profile";
  const [activeTab, setActiveTab] = useState<"profile" | "security">(
    initialTab
  );

  // Update URL when tab changes
  const handleTabChange = (tab: "profile" | "security") => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    // Sync state if URL changes manually
    const currentTab =
      searchParams.get("tab") === "security" ? "security" : "profile";
    if (currentTab !== activeTab) setActiveTab(currentTab);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#0F121A] text-white">
      {/* Fixed Header */}
      <header className="fixed top-0 h-20 left-0 right-0 z-50 bg-[#13171E] border-b border-[#2A2A2A] flex items-center px-4 py-3">
        <Link href="/" className="mr-4 text-white">
          <span className="mgc_arrow_left_line text-xl"></span>
        </Link>
        <h1 className="text-lg font-semibold">Profile Settings</h1>
      </header>

      {/* Page content */}
      <main className="mt-20 p-4 md:px-6 max-w-3xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-[#2A2A2A] mb-6">
          <button
            className={`px-4 py-2 cursor-pointer font-medium ${
              activeTab === "profile"
                ? "border-b-2 border-[#FFC200] text-white"
                : "text-[#A0A0A0]"
            }`}
            onClick={() => handleTabChange("profile")}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 cursor-pointer font-medium ${
              activeTab === "security"
                ? "border-b-2 border-[#FFC200] text-white"
                : "text-[#A0A0A0]"
            }`}
            onClick={() => handleTabChange("security")}
          >
            Security
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-[#13171E] rounded-lg p-6 min-h-[300px]">
          {activeTab === "profile" && (
            <div className="text-[#E6E6E7]">Profile content goes here...</div>
          )}
          {activeTab === "security" && (
            <div className="text-[#E6E6E7]">Security content goes here...</div>
          )}
        </div>
      </main>
    </div>
  );
}
