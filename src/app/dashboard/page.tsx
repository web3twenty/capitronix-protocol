"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { showSuccessAlert } from "@/components/Toast";
import Button from "@/components/ui/Button";
import Link from "next/link";

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

  const handleCopy = () => {
    if (account?.address) {
      navigator.clipboard.writeText(
        "0x2FfBdfA8638422bF3A5134434387b8Fb5962DA2C"
      );
      showSuccessAlert("Address copied!");
    }
  };

  return (
    <section className="p-4 md:px-6 md:py-2 max-w-6xl mx-auto space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="p-[0.8px] rounded-[12px] flex-shrink-0 rounded-lg border border-[#2A2A2A]"
            style={{
              background:
                "linear-gradient(110.57deg, #FFC200 -10.98%, #2A2A2A 23.32%)",
            }}
          >
            <div
              className="p-4 flex gap-3 rounded-[7.5px] h-full items-center"
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.5fr_1fr] mb-8">
        <div></div>
        <div className="border border-[#2A2A2A] rounded-lg">
          <div className="bg-[#13171E] px-3 py-2 rounded-t-lg">
            <h3 className="text-md text-white font-semibold">
              Token Information
            </h3>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <div className="divide-y divide-[#2A2A2A]">
              {[
                {
                  icon: "mgc_coin_3_line",
                  label: "Token Name:",
                  value: "3Twenty Coin",
                  highlight: true,
                },
                {
                  icon: "mgc_calendar_line",
                  label: "Symbol:",
                  value: "3TWENTY",
                  highlight: true,
                },
                {
                  icon: "mgc_omg_line",
                  label: "Total Supply:",
                  value: "320M",
                  highlight: true,
                },
                {
                  icon: "mgc_exchange_dollar_line",
                  label: "Current Price:",
                  value: "$0.01",
                  highlight: true,
                },
                {
                  icon: "mgc_link_line",
                  label: "Blockchain:",
                  value: "BSC",
                  highlight: true,
                },
                {
                  icon: "mgc_contacts_2_line",
                  label: "Contact Address:",
                  value: "0x2FfBdfA8638422bF3A5134434387b8Fb5962DA2C",
                  highlight: true,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-3 md:py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    {idx === 1 ? (
                      <Image
                        src="/3twenty-coin.png"
                        alt="3twenty"
                        width={18}
                        height={18}
                      />
                    ) : (
                      <span
                        className={`${item.icon} text-[#FFC200] text-lg md:text-[20px]`}
                      ></span>
                    )}
                    <span className="text-[#CFD0D2] text-[12px] md:text-sm">
                      {item.label}
                    </span>
                  </div>
                  <p className="font-medium text-sm md:text-md text-[#FFC200]">
                    {idx === 5
                      ? `${item.value.slice(0, 6)}...${item.value.slice(-6)}`
                      : item.value}

                    {idx === 5 && (
                      <span
                        className="px-2 py-1 ms-1 text-white text-[18px] cursor-pointer rounded hover:bg-white/10 flex-shrink-0"
                        onClick={handleCopy}
                      >
                        <i className="mgc_copy_3_line"></i>
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
            <Link href="https://bscscan.com/address/0x2FfBdfA8638422bF3A5134434387b8Fb5962DA2C">
              <Button
                type="button"
                variant="primary"
                size="lg"
                className="w-full mt-2 h-10"
              >
                <span className="mgc_external_link_line me-2 text-[20px]"></span>
                Go To Explorer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
