"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Deposit() {
  return (
    <section className="p-4 md:px-6 md:py-2">
      <div className="max-w-5xl border border-[#2A2A2A] rounded-lg mx-auto mb-8">
        {/* Header */}
        <div className="bg-[#13171E] px-[20px] py-[10px] rounded-tl-lg rounded-tr-lg">
          <h2 className="text-xl text-white font-semibold">
            320 - Day Staking Plan
          </h2>
          <small className="text-[#E6E6E7]">
            Earn 15% APY with daily rewards distribution
          </small>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-5 items-start">
          <div className="space-y-4">
            <div className="border border-[#2A2A2A] rounded-lg">
              <div className="rounded-tl-lg rounded-tr-lg bg-[#13171E] px-[20px] py-[10px]">
                <h3 className="text-lg text-white">Staking Details</h3>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center rounded-lg border border-[#2A2A2A] px-[12px] py-[6px]">
                  <div className="items-center gap-3 flex">
                    <span className="mgc_time_line text-[20px] text-[#FFC200]"></span>
                    <span className="text-[#CFD0D2]">Duration:</span>
                  </div>
                  <p className="text-md text-[#FFC200] font-medium">
                    320 Days (Fixed)
                  </p>
                </div>

                <div className="flex justify-between items-center rounded-lg border border-[#2A2A2A] px-[12px] py-[6px]">
                  <div className="items-center gap-3 flex">
                    <span className="mgc_wiper_line text-[20px] text-[#FFC200]"></span>
                    <span className="text-[#CFD0D2]">Apy:</span>
                  </div>
                  <p className="text-md text-[#FFC200] font-medium">15%</p>
                </div>

                <div className="flex justify-between items-center rounded-lg border border-[#2A2A2A] px-[12px] py-[6px]">
                  <div className="items-center gap-3 flex">
                    <span className="mgc_award_line text-[20px] text-[#FFC200]"></span>
                    <span className="text-[#CFD0D2]">Reward Distribution:</span>
                  </div>
                  <p className="text-md text-[#FFC200] font-medium">Daily</p>
                </div>

                <div className="flex justify-between items-center rounded-lg border border-[#2A2A2A] px-[12px] py-[6px]">
                  <div className="items-center gap-3 flex">
                    <Image
                      src="/3twenty-coin.png"
                      alt="3twenty"
                      width={20}
                      height={20}
                    />
                    <span className="text-[#CFD0D2]">Available Balance:</span>
                  </div>
                  <p className="text-md text-[#FFC200] font-medium">
                    7016.875 3TWENTY
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Input
                label="Stake Amount (3TWENTY Tokens)"
                placeholder="Enter Amount To Stake"
              />
              <small className="text-[#CFD0D2]">
                MIN: 1000 3TWENTY MAX: 500000 3TWENTY
              </small>
            </div>
          </div>

          <div className="border border-[#2A2A2A] rounded-lg">
            <div className="rounded-tl-lg rounded-tr-lg bg-[#13171E] px-[20px] py-[10px]">
              <h3 className="text-lg text-white">Rewards Calculation</h3>
            </div>

            <div className="p-5 space-y-5">
              <div className="space-y-4">
                <div className="flex justify-between items-center rounded-lg border border-[#2A2A2A] px-[12px] py-[6px]">
                  <div className="items-center gap-3 flex">
                    <span className="mgc_coin_2_line text-[20px] text-[#FFC200]"></span>
                    <span className="text-[#CFD0D2]">Staked Amount:</span>
                  </div>
                  <p className="text-md font-medium">
                    <span className="text-white">1000</span>{" "}
                    <span className="text-[#FFC200]">3TWENTY</span>
                  </p>
                </div>

                <div className="flex justify-between items-center rounded-lg border border-[#2A2A2A] px-[12px] py-[6px]">
                  <div className="items-center gap-3 flex">
                    <span className="mgc_calendar_line text-[20px] text-[#FFC200]"></span>
                    <span className="text-[#CFD0D2]">Daily Rewards:</span>
                  </div>
                  <p className="text-md font-medium">
                    <span className="text-white">4.6875</span>{" "}
                    <span className="text-[#FFC200]">3TWENTY</span>
                  </p>
                </div>

                <div className="flex justify-between items-center rounded-lg border border-[#2A2A2A] px-[12px] py-[6px]">
                  <div className="items-center gap-3 flex">
                    <span className="mgc_award_line text-[20px] text-[#FFC200]"></span>
                    <span className="text-[#CFD0D2]">
                      Total Rewards (320 days):
                    </span>
                  </div>
                  <p className="text-md font-medium">
                    <span className="text-white">0.00</span>{" "}
                    <span className="text-[#FFC200]">3TWENTY</span>
                  </p>
                </div>
              </div>

              {/* ℹ️ Transaction Info */}
              <div className="space-y-4">
                <div className="bg-[#13171E] px-[20px] py-[10px] rounded-lg">
                  <div className="flex gap-2 items-center">
                    <span className="mgc_information_line text-[20px] text-[#FFC200]"></span>
                    <h3 className="text-md text-white font-semibold">
                      Daily Distribution
                    </h3>
                  </div>
                  <p className="text-[#E6E6E7] pt-1 text-[12px]">
                    Rewards are automatically distributed to your wallet every
                    24 hours. You can withdraw daily rewards anytime while
                    keeping your principal staked.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                <span className="mgc_lock_line me-2 text-[20px]"></span>
                Stake for 320 Days
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
