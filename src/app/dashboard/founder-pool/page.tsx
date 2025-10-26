import Image from "next/image";
import Button from "@/components/ui/Button";

export default function FounderPool() {
  return (
    <section className="p-4 md:px-6 md:py-2">
      <div className="max-w-6xl mx-auto space-y-8 pb-5">
        <div className="bg-[#25262A] rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="space-y-3 me-auto col-span-2 p-5">
              <span className="px-2 py-1 inline-block text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                Exclusive Investment Opportunity
              </span>
              <div className="max-w-lg space-y-3">
                <h1 className="text-3xl font-medium text-white">
                  Join the 3Twenty Founder Pool
                </h1>
                <p className="text-base text-white">
                  Become a founding member and earn exclusive profits from our
                  upcoming{" "}
                  <span className="text-[#FFC200]">
                    {" "}
                    Centralized Exchange (CEX){" "}
                  </span>{" "}
                  revenue sharing program.
                </p>
              </div>
            </div>

            <div className="p-5 flex justify-center lg:justify-end">
              <Image
                src="/founder-vector.png"
                alt="Founder"
                width={250}
                height={200}
              />
            </div>
          </div>
        </div>

        <div className="border border-[#2A2A2A] rounded-lg max-w-xl mx-auto">
          <div className="bg-[#13171E] px-4 py-3 md:px-5 md:py-4 rounded-t-lg">
            <h3 className="text-md md:text-lg text-white font-semibold">
              Founder Investment Package
            </h3>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <div className="divide-y divide-[#2A2A2A]">
              {[
                {
                  icon: "mgc_door_line",
                  label: "Entry Cost:",
                  value: " $1000",
                  highlight: true,
                },
                {
                  icon: "mgc_calendar_line",
                  label: "Tokens Allocated:",
                  value: "100000 3TWENTY",
                  highlight: true,
                },
                {
                  icon: "mgc_trending_up_line",
                  label: "CEX Revenue Share:",
                  value: " 5% monthly",
                  highlight: true,
                },
                {
                  icon: "mgc_user_follow_2_line",
                  label: "Total Pool Size:",
                  value: "320 Founders",
                  highlight: true,
                },
                {
                  icon: "mgc_user_follow_2_line",
                  label: "Total Pool Allocation:",
                  value: "32M 3TWENTY",
                  highlight: true,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-3 md:py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    {idx === 1 || idx === 4 ? (
                      <Image src="/3twenty-coin.png" alt="Coin" width={18} height={18} />
                    ) : (
                      <span
                        className={`${item.icon} text-[#FFC200] text-lg md:text-[20px]`}
                      ></span>
                    )}
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
                <span className="mgc_fullscreen_exit_2_line text-[#FFC200] text-lg md:text-[20px]"></span>
                <h4 className="text-white font-semibold text-sm md:text-md">
                  Projected Returns
                </h4>
              </div>
              <p className="text-[#E6E6E7] text-[11px] md:text-[12px] mt-1 leading-tight">
                Based on conservative CEX trading volume estimates, founders
                could earn $200-500+ monthly from revenue sharing alone.
              </p>
              <div className="flex bg-[#03070D] rounded mt-2 items-center justify-between p-2">
                <div className="flex items-center gap-2">
                  <span className="mgc_calendar_line text-[#FFC200] text-lg"></span>
                  <span className="text-[#CFD0D2] text-sm">ROI</span>
                </div>
                <p className="text-[#FFC200] text-[14px]">24-60% annually</p>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
            >
              <span className="mgc_user_follow_2_line me-2 text-[20px]"></span>
              Join Founder Pool
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
