"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function Home() {
  const { data: account } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const response = await api.get("/account");
      return response.data.payload.account;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await api.get("/dashboard/stats");
      return response.data.payload;
    },
  });

  const statItems = [
    {
      icon: "mgc_trending_up_line",
      label: "3Twenty Coin",
      value: Number(account?.token || 0).toFixed(2),
      subValue: `≈$${Number(stats?.TOKEN_PRICE * account?.token || 0).toFixed(
        2
      )}`,
    },
    {
      icon: "mgc_currency_dollar_line",
      label: "Current USDT Balance",
      value: `$${Number(account?.usdt || 0).toFixed(2)}`,
    },
    {
      icon: "mgc_user_add_2_line",
      label: "Referral Earnings",
      value: `$${Number(stats?.referralEarnings || 0).toFixed(2)}`,
    },
  ];

  return (
    <section className="p-4 md:px-6 md:py-2">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="p-[0.7px] rounded-[12px] flex-shrink-0 rounded-lg border border-[#2A2A2A]"
            style={{
              background:
                "linear-gradient(110.57deg, #FFC200 -10.98%, #2A2A2A 23.32%)",
            }}
          >
            <div
              className="p-4 flex gap-3 rounded-[8px] h-full items-center"
              style={{
                background:
                  "linear-gradient(288.81deg, #13171E 65.71%, #211900 96.31%)",
                backgroundClip: "padding-box",
              }}
            >
              <div className="w-[58px] h-[58px] bg-[#313131] flex items-center justify-center rounded-full">
                {index === 0 ? (
                  <Image
                    src="/3twenty-coin.png"
                    alt="Coin"
                    width={36}
                    height={36}
                  />
                ) : (
                  <span
                    className={`${stat.icon} text-[40px] text-[#FFC200]`}
                  ></span>
                )}
              </div>
              <div>
                <small className="text-[#AEAFB2] text-sm">{stat.label}</small>
                <p className="text-white text-2xl font-medium">{stat.value}</p>
                {stat.subValue && (
                  <small className="text-[#FFC200]">{stat.subValue}</small>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
