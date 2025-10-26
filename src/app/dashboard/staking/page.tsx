"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Staking() {
  return (
    <section className="p-4 md:px-6 md:py-2">
      <div className="max-w-5xl mx-auto mb-8 space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-5">
        {/* Staking Details */}
        <div className="border border-[#2A2A2A] rounded-lg">
          <div className="bg-[#13171E] px-4 py-3 md:px-5 md:py-4 rounded-t-lg">
            <h2 className="text-lg md:text-xl text-white font-semibold">
              320 - Day Staking Plan
            </h2>
            <small className="text-[#E6E6E7] text-[12px] md:text-sm">
              Earn 15% APY with daily rewards distribution
            </small>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            {/* Details List */}
            <div className="divide-y divide-[#2A2A2A]">
              {[
                {
                  icon: "mgc_time_line",
                  label: "Duration:",
                  value: "320 Days (Fixed)",
                },
                { icon: "mgc_wiper_line", label: "APY:", value: "15%" },
                {
                  icon: "mgc_award_line",
                  label: "Reward Distribution:",
                  value: "Daily",
                },
                {
                  icon: "coin",
                  label: "Available Balance:",
                  value: "7016.875 3TWENTY",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-3 md:py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    {item.icon === "coin" ? (
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
                  <p className="text-[#FFC200] font-medium text-sm md:text-md">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Stake Input */}
            <div className="mt-8">
              <Input
                label="Stake Amount"
                placeholder="Enter Amount To Stake"
              />
              <p className="text-[#CFD0D2] text-[11px] pt-2">
                MIN: 1000 3TWENTY MAX: 500000 3TWENTY
              </p>
            </div>
          </div>
        </div>

        {/* Rewards Calculation */}
        <div className="border border-[#2A2A2A] rounded-lg">
          <div className="bg-[#13171E] px-4 py-3 md:px-5 md:py-4 rounded-t-lg">
            <h3 className="text-lg md:text-xl text-white font-semibold">
              Rewards Calculation
            </h3>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <div className="divide-y divide-[#2A2A2A]">
              {[
                {
                  icon: "mgc_coin_2_line",
                  label: "Staked Amount:",
                  value: "1000 3TWENTY",
                  highlight: true,
                },
                {
                  icon: "mgc_calendar_line",
                  label: "Daily Rewards:",
                  value: "4.6875 3TWENTY",
                  highlight: true,
                },
                {
                  icon: "mgc_award_line",
                  label: "Total Rewards (320 days):",
                  value: "0.00 3TWENTY",
                  highlight: true,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-3 md:py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <span
                      className={`${item.icon} text-[#FFC200] text-lg md:text-[20px]`}
                    ></span>
                    <span className="text-[#CFD0D2] text-[12px] md:text-sm">
                      {item.label}
                    </span>
                  </div>
                  <p
                    className={`font-medium text-sm md:text-md ${
                      item.highlight ? "text-white" : ""
                    }`}
                  >
                    {item.value.split(" ")[0]}{" "}
                    <span className="text-[#FFC200]">
                      {item.value.split(" ")[1]}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            {/* Daily Distribution Info */}
            <div className="bg-[#13171E] px-3 py-2 md:px-4 md:py-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="mgc_information_line text-[#FFC200] text-lg md:text-[20px]"></span>
                <h4 className="text-white font-semibold text-sm md:text-md">
                  Daily Distribution
                </h4>
              </div>
              <p className="text-[#E6E6E7] text-[11px] md:text-[12px] mt-1 leading-tight">
                Rewards are automatically distributed to your wallet every 24
                hours. You can withdraw daily rewards anytime while keeping your
                principal staked.
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
            >
              <span className="mgc_lock_line me-2 text-[20px]"></span>
              Stake for 320 Days
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
