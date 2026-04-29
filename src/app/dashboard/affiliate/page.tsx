"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { showSuccessAlert } from "@/components/Toast";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function WithdrawCards() {
  const { data: profile } = useQuery({
    queryKey: ["account"],
    queryFn: () => api.get("/user/profile").then((res) => res.data),
  });

  const handleCopy = () => {
    if (profile?.referralCode) {
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/register?ref=${profile?.referralCode}`,
      );
      showSuccessAlert("Referral link copied!");
    }
  };

  const { data: referralStats } = useQuery({
    queryKey: ["referral-stats"],
    queryFn: () => api.get("/user/referrals/stats").then((res) => res.data),
  });

  // Fetch stats for referral hint
  const { data: dashboardStats } = useQuery({
    queryKey: ["stats"],
    queryFn: () => api.get("/user/dashboard/stats").then((res) => res.data),
  });

  const stats = referralStats?.stats ?? [];

  interface ReferralStat {
    level: number;
    total: number;
    active: number;
    inactive: number;
    totalSales: number;
  }

  return (
    <section className="p-4 md:px-6 md:py-2">
      <div className="max-w-7xl mx-auto mb-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mx-auto">
        <div>
          <h2 className="text-white mb-2">Affiliate Program</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="bg-[#13171E] border border-[#2A2A2A] rounded-lg p-4 flex gap-3">
              <div className="w-[58px] h-[58px] bg-[#313131] flex items-center justify-center rounded-full shrink-0">
                <span className="mgc_trending_up_line text-[40px] text-[#FFC200]"></span>
              </div>
              <div>
                <small className="text-[#AEAFB2] text-sm line-clamp-1">
                  Gross Earnings
                </small>
                <p className="text-white text-2xl font-semibold mt-1">
                  ${Number(referralStats?.totalEarnings || 0).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#13171E] border border-[#2A2A2A] rounded-lg p-4 flex gap-3">
              <div className="w-[58px] h-[58px] bg-[#313131] flex items-center justify-center rounded-full shrink-0">
                <span className="mgc_group_3_line text-[40px] text-[#FFC200]"></span>
              </div>
              <div>
                <small className="text-[#AEAFB2] text-sm line-clamp-1">
                  Total Team Size
                </small>
                <p className="text-white text-2xl font-semibold mt-1">
                  {Number(referralStats?.totalReferrals || 0)}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#13171E] border border-[#2A2A2A] rounded-lg p-4 flex gap-3">
              <div className="w-[58px] h-[58px] bg-[#313131] flex items-center justify-center rounded-full shrink-0">
                <span className="mgc_trending_up_line text-[40px] text-[#FFC200]"></span>
              </div>
              <div>
                <small className="text-[#AEAFB2] text-sm line-clamp-1">
                  Tier 1 Commission
                </small>
                <p className="text-white text-2xl font-semibold mt-1">
                  {referralStats?.levelOneCommission || 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white mb-2">Your Referral Link</h2>
          <div
            className="border border-[#2A2A2A] rounded-lg p-4 flex gap-3"
            style={{
              background:
                "linear-gradient(94.14deg, #322602 1.4%, #13171E 100%)",
            }}
          >
            <div className="w-[58px] h-[58px] bg-transparent flex items-center justify-center rounded-full">
              {profile?.isActive === 0 ? (
                <span className="mgc_user_lock_line text-[40px] text-[#FFC200]"></span>
              ) : (
                <span className="mgc_user_add_2_line text-[40px] text-[#FFC200]"></span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-1 flex-wrap">
              {profile?.isActive === 0 ? (
                <small className="text-white text-sm">
                  Have at least {dashboardStats?.ACTIVATION_USDT} USDT in your
                  wallet and click {`"Activate"`} to unlock your referral link.
                </small>
              ) : (
                <>
                  <small className="text-white text-sm break-all flex-1">
                    {`${process.env.NEXT_PUBLIC_APP_URL}/auth/register?ref=${profile?.referralCode || ""}`}
                  </small>
                  <span
                    className="px-2 py-1 text-white text-[24px] cursor-pointer rounded hover:bg-white/10 flex-shrink-0"
                    onClick={handleCopy}
                  >
                    <i className="mgc_copy_3_line"></i>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Referral Stats Table */}
      <div className="max-w-7xl bg-[#13171E] border border-[#2A2A2A] rounded-lg mt-8 mb-8 overflow-hidden mx-auto">
        <div className="flex items-center justify-between px-[20px] py-[10px]">
          <h1 className="text-lg text-white font-medium">
            6-Level Team Overview
          </h1>
          <Link
            href="/dashboard/affiliate/tree"
            className="text-sm text-yellow-400 hover:underline"
          >
            View Tree
          </Link>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="min-w-max">
            <table className="w-full text-sm text-left text-gray-300 bg-[#03070D] divide-y divide-[#2A2A2A] rounded-lg">
              <thead className="bg-[#25262A] text-gray-200">
                <tr>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3 text-center">Total Members</th>
                  <th className="px-4 py-3 text-center">Active</th>
                  <th className="px-4 py-3 text-center">Inactive</th>
                  <th className="px-4 py-3 text-center">
                    Total Sales (3TWENTY)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A2A]">
                {stats.map((item: ReferralStat) => (
                  <tr key={item.level}>
                    <td className="px-4 py-3 text-[#FFC200] whitespace-nowrap">
                      Tier {item.level}
                    </td>
                    <td className="px-4 py-3 text-center">{item.total}</td>
                    <td className="px-4 py-3 text-center text-green-400">
                      {item.active}
                    </td>
                    <td className="px-4 py-3 text-center text-yellow-400">
                      {item.inactive}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {Number(item.totalSales || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
