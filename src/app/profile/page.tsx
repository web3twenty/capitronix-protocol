"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProfileForm from "./profile";
import SecurityForm from "./security";

export default function Profile() {
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
      <header className="fixed top-0 h-16 left-0 right-0 z-50 bg-[#13171E] border-b border-[#2A2A2A] flex items-center px-2 py-3">
        <Link
          href="/dashboard"
          className="mr-4 rounded-full text-white hover:bg-[#2A2A2A]"
        >
          <span className="mgc_arrow_left_line text-xl block p-3"></span>
        </Link>
        <h1 className="text-lg font-semibold">Profile Settings</h1>
      </header>

      {/* Page content */}
      <main className="pt-16 md:px-6 py-2 max-w-3xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-[#2A2A2A] mb-6 mt-5">
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
        <div>
          {activeTab === "profile" && <ProfileForm />}
          {activeTab === "security" && <SecurityForm />}
        </div>
      </main>
    </div>
  );
}
