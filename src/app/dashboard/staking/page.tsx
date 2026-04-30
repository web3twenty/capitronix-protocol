"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useContext, useState } from "react";
import Modal from "react-responsive-modal";
import { AxiosError } from "axios";
import { showSuccessAlert, showErrorAlert } from "@/components/Toast";
import { LayoutContext } from "@/contexts/layout";

export default function Staking() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const stats = useContext(LayoutContext);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get("/user/profile").then((res) => res.data),
  });

  const min = stats?.STAKING_DETAILS?.minimum;
  const max = stats?.STAKING_DETAILS?.maximum;
  const apy = stats?.STAKING_DETAILS?.apy;
  const durationDays = stats?.STAKING_DETAILS?.durationDays;

  const amountNum = Number(stakeAmount);
  const isInvalid =
    !stats?.STAKING_DETAILS ||
    !stakeAmount ||
    isNaN(amountNum) ||
    amountNum < Number(min) ||
    amountNum > Number(max);

  interface StakingResponse {
    success: boolean;
    message: string;
  }

  const stakingMutation = useMutation<
    StakingResponse,
    AxiosError<{ message: string }>
  >({
    mutationFn: () =>
      api.post("/user/stakes", { tokenAmount: Number(stakeAmount) }),
    onSuccess: () => {
      showSuccessAlert("Staked successfully");
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setStakeAmount("");
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message.toString() || error.message);
    },
  });

  const closeIcon = (
    <span className="mgc_close_line text-white text-[20px]"></span>
  );

  return (
    <section className="p-4 md:px-6 md:py-2">
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        center
        styles={{
          modal: {
            borderRadius: "8px",
            backgroundColor: "#03070D",
            padding: 0,
          },
          overlay: {
            backgroundColor: "#4A4A4AC2",
          },
        }}
        closeIcon={closeIcon}
      >
        {/* Header */}
        <div className="bg-[#13171E] px-[20px] py-[10px] rounded-tl-lg rounded-tr-lg">
          <h2 className="text-xl text-white font-semibold">Confirm Staking</h2>
          <small className="text-[#E6E6E7]">
            Lock your tokens for 320 days to earn 15% APY with daily rewards
          </small>
        </div>

        {/* Dynamic Details */}
        <div className="bg-[#03070D] space-y-2 p-4">
          {[
            {
              label: "Staking Amount:",
              value: (
                <span className="font-medium text-[#FFC200]">
                  <span className="text-white">{stakeAmount || 0}</span> 3TWENTY
                </span>
              ),
            },
            {
              label: "Duration:",
              value: (
                <span className="font-medium text-[#FFC200]">
                  <span>{durationDays} Days</span>
                </span>
              ),
            },
            {
              label: "APY:",
              value: (
                <span className="font-medium text-[#FFC200]">
                  <span>{apy}%</span>
                </span>
              ),
            },
            {
              label: "Daily Rewards:",
              value: (
                <span className="font-medium text-[#FFC200]">
                  <span className="text-white">
                    {(
                      ((Number(apy) / 100) * Number(stakeAmount)) /
                      Number(durationDays)
                    ).toFixed(2)}
                  </span>{" "}
                  3TWENTY
                </span>
              ),
            },
            {
              label: "Total Rewards:",
              value: (
                <span className="font-medium text-[#FFC200]">
                  <span className="text-white">
                    {((Number(apy) / 100) * Number(stakeAmount)).toFixed(2)}
                  </span>{" "}
                  3TWENTY
                </span>
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center border border-[#13171E] rounded p-2 justify-between"
            >
              <p className="text-[#CFD0D2] text-sm">{item.label}</p>
              <div>{item.value}</div>
            </div>
          ))}

          <div className="bg-[#13171E] px-3 py-2 md:px-4 md:py-3 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="mgc_information_line text-[#FFC200] text-lg md:text-[20px]"></span>
              <h4 className="text-white font-semibold text-sm md:text-md">
                Important Notice
              </h4>
            </div>
            <p className="text-[#E6E6E7] text-[11px] md:text-[12px] mt-1 leading-tight">
              Your tokens will be locked for 320 days. Daily rewards will be
              distributed automatically to your wallet.
            </p>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="p-4 pt-0">
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => stakingMutation.mutate()}
            loading={stakingMutation.isPending}
          >
            <span className="mgc_lock_line me-2 text-[20px]"></span>
            Confirm Staking
          </Button>
        </div>
      </Modal>

      <div className="max-w-5xl mx-auto mb-8 space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-5">
        {/* Staking Details */}
        <div className="border border-[#2A2A2A] rounded-lg">
          <div className="bg-[#13171E] px-4 py-3 md:px-5 md:py-4 rounded-t-lg">
            <h2 className="text-lg md:text-xl text-white font-semibold">
              {durationDays || ""} - Day Staking Plan
            </h2>
            <small className="text-[#E6E6E7] text-[12px] md:text-sm">
              Earn {apy || ""}% APY with daily rewards distribution
            </small>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            {/* Details List */}
            <div className="divide-y divide-[#2A2A2A]">
              {[
                {
                  icon: "mgc_time_line",
                  label: "Duration:",
                  value: `${durationDays || ""} Days (Fixed)`,
                },
                {
                  icon: "mgc_wiper_line",
                  label: "APY:",
                  value: `${apy || ""}%`,
                },
                {
                  icon: "mgc_award_line",
                  label: "Reward Distribution:",
                  value: "Daily",
                },
                {
                  icon: "coin",
                  label: "Available Balance:",
                  value: `${Number(profile?.tokenWallet || 0).toFixed(2)} 3TWENTY`,
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
                type="number"
                placeholder="Enter Amount To Stake"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
              />
              <p className="text-[#CFD0D2] text-[11px] pt-2">
                MIN: {min} 3TWENTY MAX: {max} 3TWENTY
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
                  value: `${stakeAmount || 0} 3TWENTY`,
                  highlight: true,
                },
                {
                  icon: "mgc_calendar_line",
                  label: "Daily Rewards:",
                  value: `${(
                    ((Number(apy) / 100) * Number(stakeAmount)) /
                    Number(durationDays)
                  ).toFixed(2)} 3TWENTY`,
                  highlight: true,
                },
                {
                  icon: "mgc_award_line",
                  label: "Total Rewards (320 days):",
                  value: `${((Number(apy) / 100) * Number(stakeAmount)).toFixed(
                    2,
                  )} 3TWENTY`,
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
              disabled={isInvalid}
              onClick={() => setIsModalOpen(true)}
            >
              <span className="mgc_lock_line me-2 text-[20px]"></span>
              Stake for {durationDays || ""} Days
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
