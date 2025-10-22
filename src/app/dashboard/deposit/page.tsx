"use client";

import { QRCodeSVG } from "qrcode.react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "react-toastify";

export default function Deposit() {
  const { data: account } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const response = await api.get("/account");
      return response.data.payload.account;
    },
  });

  const handleCopy = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      toast("Address copied!", { type: "success" });
    }
  };

  return (
    <section className="p-4 md:p-6">
      <div className="max-w-xl border border-[#2A2A2A] rounded-lg mx-auto">
        <div className="bg-[#13171E] px-[20px] py-[10px]">
          <h2 className="text-xl text-white font-semibold">Deposit USDT</h2>
          <small className="text-[#E6E6E7]">
            Receive any amount of USDT fund using BEP-20 network
          </small>
        </div>
        <div className="p-4 space-y-4">
          <div className="p-4 rounded bg-white w-fit mx-auto">
            <QRCodeSVG value="hi" size={150} level="H" />
          </div>
          <small className="text-white text-center block">
            Scan QR code or copy address below
          </small>
          <div className="bg-[#25262A] p-[12px] rounded flex justify-between items-center">
            {/* Address: truncated on small screens, full on md+ */}
            <small className="block text-[14px] text-white">
              <span className="md:hidden">
                {account?.address
                  ? `${account.address.slice(0, 15)}...${account.address.slice(
                      -15
                    )}`
                  : "No Address"}
              </span>
              <span className="hidden md:inline">
                {account?.address || "No Address"}
              </span>
            </small>

            {/* Copy icon with hover effect */}
            <span
              className="mgc_copy_3_line text-[#FFC200] cursor-pointer hover:text-yellow-400 hover:bg-[#3a3b41] transition-colors duration-200 p-1 rounded"
              onClick={handleCopy}
            ></span>
          </div>
          <div className="bg-[#13171E] px-[20px] py-[10px] rounded-lg">
            <div className="flex gap-2 items-center">
              <span className="mgc_light_line text-[#FFC200]"></span>
              <h3 className="text-md text-white font-semibold">Pro Tip</h3>
            </div>
            <small className="text-[#E6E6E7] pt-0">
              Receive any amount of USDT fund using BEP-20 network
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}
