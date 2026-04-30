"use client";

import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { showErrorAlert, showSuccessAlert } from "@/components/Toast";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Barchart from "@/components/BarChart";
import Modal from "react-responsive-modal";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { LayoutContext } from "@/contexts/layout";

function formatNumber(value: number): string {
  if (value < 1000) return value.toString();

  const suffixes = ["", "K", "M", "B", "T"];
  const tier = Math.floor(Math.log10(value) / 3);

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;

  const formatted = scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1);

  return `${formatted}${suffix}`;
}

export default function Home() {
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const stats = useContext(LayoutContext);

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get("/user/profile").then((res) => res.data),
  });

  const { data: matrixUser = [] } = useQuery({
    queryKey: ["matrix-position"],
    queryFn: () =>
      api.get("/user/dashboard/matrix-position").then((res) => res.data),
  });

  const statItems = [
    {
      icon: "mgc_trending_up_line",
      label: "3Twenty Coin",
      value: Number(profile?.tokenWallet || 0).toFixed(2),
      subValue: `≈$${Number(
        Number(stats?.TOKEN_PRICE) * profile?.tokenWallet || 0,
      ).toFixed(2)}`,
    },
    {
      icon: "mgc_currency_dollar_line",
      label: "Current USDT Balance",
      value: `$${Number(profile?.usdtWallet || 0).toFixed(2)}`,
    },
    {
      icon: "mgc_coin_2_line",
      label: "Current Staked Balance",
      value: `${Number(stats?.stakedBalance || 0).toFixed(2)}`,
    },
    {
      icon: "mgc_award_line",
      label: "Current Reward Balance",
      value: `${Number(profile?.rewardWallet || 0).toFixed(2)}`,
    },
    {
      icon: "mgc_user_add_2_line",
      label: "Referral Earnings",
      value: `$${Number(stats?.referralEarnings || 0).toFixed(2)}`,
    },
    {
      icon: "mgc_card_pay_line",
      label: "Total Withdraw",
      value: `$${Number(stats?.totalWithdraw || 0).toFixed(2)}`,
    },
    {
      icon: "mgc_user_star_line",
      label: "Current Board",
      value: `${profile?.board || "N/A"}`,
    },
    {
      icon: "mgc_chart_bar_2_line",
      label: "Board Earning",
      value: `$${Number(stats?.boardEarnings || 0).toFixed(2)}`,
    },
    {
      icon: "mgc_ferris_wheel_line",
      label: "Lottery",
      value: "Upcoming..",
    },
  ];

  const handleCopy = () => {
    if (profile?.walletAddress) {
      navigator.clipboard.writeText(
        "0x2FfBdfA8638422bF3A5134434387b8Fb5962DA2C",
      );
      showSuccessAlert("Address copied!");
    }
  };

  const closeIcon = (
    <span className="mgc_close_line text-white text-[20px]"></span>
  );

  const activateMutation = useMutation<void, AxiosError<{ message: string }>>({
    mutationFn: () => api.post("/user/profile/activate"),
    onSuccess: () => {
      showSuccessAlert("Account activation successful");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setIsActivationModalOpen(false);
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message.toString() || error.message);
    },
  });

  return (
    <>
      <Modal
        open={isActivationModalOpen}
        onClose={() => setIsActivationModalOpen(false)}
        center
        styles={{
          modal: {
            borderRadius: "8px",
            backgroundColor: "#03070D",
            padding: 0,
          },
          overlay: { backgroundColor: "#4A4A4AC2" },
        }}
        closeIcon={closeIcon}
      >
        {/* Modal Header */}
        <div className="bg-[#13171E] px-5 py-3 rounded-t-lg">
          <h2 className="text-xl text-white font-semibold">
            Confirm Activation
          </h2>
          <small className="text-[#E6E6E7]">
            Activaton will unlock your referral link
          </small>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4">
          {/* Optional: You can keep a breakdown component if needed */}
          {/* For example, showing amount and fees */}
          <div className="text-white">
            <p>
              Activation Fee: <strong>{stats?.ACTIVATION_USDT}$</strong>
            </p>
            <p>This will deduct activation fee from your USDT wallet.</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4">
          <Button
            className="w-full"
            loading={activateMutation.isPending}
            onClick={() => activateMutation.mutate()}
          >
            Confirm Activation
          </Button>
        </div>
      </Modal>

      <section className="p-4 md:px-6 md:py-2 max-w-6xl mx-auto space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statItems.map((stat, index) => (
            <div
              key={index}
              className="p-[0.9px] flex-shrink-0 rounded-lg border border-[#2A2A2A]"
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
                <div className="w-[58px] h-[58px] bg-[#313131] flex items-center justify-center rounded-full shrink-0">
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
                  <small className="text-[#AEAFB2] text-sm line-clamp-1">
                    {stat.label}
                  </small>
                  <p className="text-white text-2xl font-medium">
                    {stat.value}
                  </p>
                  {stat.subValue && (
                    <small className="text-[#FFC200]">{stat.subValue}</small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mb-8">
          {/* Lottery section */}
          <div className="border border-[#2A2A2A] rounded-lg flex flex-col h-full">
            <div className="bg-[#13171E] px-3 py-2 rounded-t-lg flex items-center justify-between">
              <h3 className="text-md text-white font-semibold">
                Spin The Wheel
              </h3>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <Image
                src="/spin-the-wheel.png"
                width={350}
                height={350}
                alt="Spin the wheel"
                className="object-contain"
              />
            </div>
          </div>

          {/* Matrix Section */}

          <div className="border border-[#2A2A2A] rounded-lg">
            <div className="bg-[#13171E] px-3 py-2 rounded-t-lg flex items-center justify-between">
              <h3 className="text-md text-white font-semibold">
                Matrix Position (Level {profile?.level || 0})
              </h3>
            </div>

            {/* Demo Users */}
            <div className="p-3 space-y-3 rounded-b-lg">
              {matrixUser.map((user: any) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-md transition
          ${
            user.isSelf
              ? "bg-[#1A1A12] border border-yellow-500/50"
              : "bg-[#13171E] hover:bg-[#1A1F29]"
          }
        `}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="/default-avatar.png"
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#2A2A2A]"
                    />
                    <div>
                      <p className="text-md text-white font-medium flex items-center gap-2">
                        {user.name}
                        {user.isSelf && (
                          <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-[2px] rounded">
                            You
                          </span>
                        )}
                      </p>
                      {/* <p className="text-xs text-gray-400">Queue #{user.queue}</p> */}
                    </div>
                  </div>

                  <span
                    className={`text-sm ${
                      user.isSelf
                        ? "text-yellow-400 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    #{user.queue}
                  </span>
                </div>
              ))}

              {!isLoadingProfile && !profile?.investedAt && (
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  className="w-full mt-5 h-10"
                  onClick={() => {
                    setIsActivationModalOpen(true);
                  }}
                >
                  <span className="mgc_currency_dollar_line me-2 text-[20px]"></span>
                  Take Entry
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.5fr_1fr] mb-8">
          {/* Card Statistics */}
          <div className="space-y-4">
            <div className="border border-[#2A2A2A] rounded-lg">
              <div className="bg-[#13171E] px-3 py-2 rounded-t-lg flex items-center justify-between">
                <h3 className="text-md text-white font-semibold">
                  Sales Progress
                </h3>
                <p className="text-white text-sm">
                  <span className="text-[#FFC200] font-medium">
                    {formatNumber(
                      Number(stats?.phaseInfo?.totalSupply || 0) -
                        Number(stats?.phaseInfo?.totalAvailable || 0),
                    )}{" "}
                    / {formatNumber(Number(stats?.phaseInfo?.totalSupply) || 0)}
                  </span>{" "}
                  <span className="hidden md:inline-block">Tokens Sold</span>
                </p>
              </div>

              <div className="p-4 pb-0">
                <Barchart />
              </div>
            </div>
            <div
              className="rounded-lg flex items-center justify-between px-4 py-2"
              style={{
                background:
                  "linear-gradient(94.14deg, #322602 1.4%, #13171E 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="mgc_chart_line_line text-[#FFC200] text-[58px]"></span>
                <div>
                  <small className="text-sm text-[#AEAFB2]">
                    Current Price
                  </small>
                  <p className="text-2xl text-white font-medium">
                    ${stats?.TOKEN_PRICE || ""}
                  </p>
                </div>
              </div>
              <p className="text-lg text-[#FFC200] font-medium">
                {stats?.ACTIVE_PHASE || ""} Active
              </p>
            </div>
          </div>

          {/* Card Info */}
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
                  className="w-full mt-5 h-10"
                >
                  <span className="mgc_external_link_line me-2 text-[20px]"></span>
                  Go To Explorer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
