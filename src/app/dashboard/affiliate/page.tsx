"use client";

import { toast } from "react-toastify";

export default function WithdrawCards() {
  const handleCopy = () => {
    toast("Link copied!", { type: "success" });
  };

  return (
    <section className="p-4 md:px-6 md:py-2">
      <div className="max-w-7xl mx-auto mb-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        <div>
          <h2 className="text-white mb-2">Affiliate Program</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="bg-[#13171E] border border-[#2A2A2A] rounded-lg p-4 flex gap-3">
              <div className="w-[58px] h-[58px] bg-[#313131] flex items-center justify-center rounded-full">
                <span className="mgc_trending_up_line text-[40px] text-[#FFC200]"></span>
              </div>
              <div>
                <small className="text-[#AEAFB2] text-sm">Gross Earnings</small>
                <p className="text-white text-2xl font-semibold mt-1">
                  $1234.56
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#13171E] border border-[#2A2A2A] rounded-lg p-4 flex gap-3">
              <div className="w-[58px] h-[58px] bg-[#313131] flex items-center justify-center rounded-full">
                <span className="mgc_group_3_line text-[40px] text-[#FFC200]"></span>
              </div>
              <div>
                <small className="text-[#AEAFB2] text-sm">
                  Total Team Size
                </small>
                <p className="text-white text-2xl font-semibold mt-1">34</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#13171E] border border-[#2A2A2A] rounded-lg p-4 flex gap-3">
              <div className="w-[58px] h-[58px] bg-[#313131] flex items-center justify-center rounded-full">
                <span className="mgc_trending_up_line text-[40px] text-[#FFC200]"></span>
              </div>
              <div>
                <small className="text-[#AEAFB2] text-sm">
                  Tier 1 Commission
                </small>
                <p className="text-white text-2xl font-semibold mt-1">8%</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white mb-2">Your Referral Link</h2>
          <div
            className="border border-[#2A2A2A] rounded-lg p-4 flex gap-3"
            style={{
              background: "linear-gradient(135deg, #322602, #13171E)",
            }}
          >
            <div className="w-[58px] h-[58px] bg-transparent flex items-center justify-center rounded-full">
              <span className="mgc_user_add_2_line text-[40px] text-[#FFC200]"></span>
            </div>
            <div className="flex items-center justify-between w-full">
              <small className="text-white text-sm text-wrap">
                https://www.3twentycoin.com/sign-up?ref=8F1G7Z
              </small>
              <span
                className="px-2 py-1 text-white text-[24px] cursor-pointer rounded hover:bg-white/10"
                onClick={handleCopy}
              >
                <i className="mgc_copy_3_line"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
