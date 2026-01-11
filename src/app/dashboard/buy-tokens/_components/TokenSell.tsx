"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Modal from "react-responsive-modal";
import { showSuccessAlert, showErrorAlert } from "@/components/Toast";
import { ArrowRight } from "lucide-react";

export default function TokenPurchase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  // 📊 Stats
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await api.get("/dashboard/stats");
      return res.data.payload;
    },
  });

  // ✅ Validation
  const schema = z.object({
    amount: z
      .string()
      .min(1, "Amount is required")
      .refine(
        (v) => !isNaN(Number(v)) && Number(v) >= (stats?.minimumSell ?? 0),
        { message: `Minimum ${stats?.minimumSell} 3TWENTY` }
      ),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const amountValue = Number(watch("amount") || 0);

  // 💰 Calculations (UI only)
  const sellChargeAmount = useMemo(() => {
    if (!stats) return 0;
    return (amountValue * stats.sellCharge) / 100;
  }, [amountValue, stats]);

  const netTokens = useMemo(() => {
    return Math.max(amountValue - sellChargeAmount, 0);
  }, [amountValue, sellChargeAmount]);

  const usdtReceive = useMemo(() => {
    if (!stats) return 0;
    console.log(netTokens);
    return netTokens * Number(stats?.TOKEN_PRICE || 0);
  }, [netTokens, stats]);

  // 🔁 Sell mutation
  const sellMutation = useMutation<
    { success: boolean; message: string },
    AxiosError<{ message: string }>,
    FormData
  >({
    mutationFn: (data) => api.post("/tokens/sell", data).then((r) => r.data),
    onSuccess: (res) => {
      reset();
      setIsModalOpen(false);
      showSuccessAlert(res.message);
    },
    onError: (err) => {
      showErrorAlert(err.response?.data?.message || err.message);
    },
  });

  const onSubmit = (data: FormData) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-2xl mx-auto border border-[#2A2A2A] rounded-lg mb-8">
      {/* 🔔 Confirm Modal */}
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
          overlay: { backgroundColor: "#4A4A4AC2" },
        }}
      >
        <div className="bg-[#13171E] px-5 py-3 rounded-t-lg">
          <h2 className="text-xl text-white font-semibold">Confirm Sell</h2>
          <small className="text-[#E6E6E7]">
            Tokens will be converted to USDT
          </small>
        </div>

        <div className="p-4 space-y-4">
          <SellBreakdown
            amount={amountValue}
            charge={sellChargeAmount}
            usdt={usdtReceive}
          />
        </div>

        <div className="p-4">
          <Button
            className="w-full"
            loading={isSubmitting || sellMutation.isPending}
            onClick={() => formData && sellMutation.mutate(formData)}
          >
            Confirm Sell
          </Button>
        </div>
      </Modal>

      {/* 📌 Header */}
      <div className="bg-[#13171E] px-5 py-3 rounded-t-lg">
        <h2 className="text-xl text-white font-semibold">
          Buy USDT (Sell 3TWENTY)
        </h2>
        <small className="text-[#E6E6E7]">Convert your 3TWENTY to USDT</small>
      </div>

      {/* 🧾 Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        <Input
          label="Amount (3TWENTY)"
          type="number"
          step="any"
          placeholder="Enter amount"
          {...register("amount")}
          error={errors.amount?.message}
        />

        <p className="text-[#CFD0D2] text-[11px]">
          MIN: {stats?.minimumSell} 3TWENTY
        </p>

        {/* 🔄 Preview */}
        <SellBreakdown
          amount={amountValue}
          charge={sellChargeAmount}
          usdt={usdtReceive}
        />

        <Button type="submit" size="lg" className="w-full">
          Sell Tokens
        </Button>
      </form>
    </div>
  );
}

/* 🔹 Sell Breakdown UI */
function SellBreakdown({
  amount,
  charge,
  usdt,
}: {
  amount: number;
  charge: number;
  usdt: number;
}) {
  return (
    <div className="bg-[#13171E] rounded-lg p-4 space-y-3">
      <Row label="Sell Amount" value={`${amount || 0} 3TWENTY`} />
      <Row label="Sell Charge" value={`-${charge.toFixed(2)} 3TWENTY`} />
      <div className="border-t border-[#2A2A2A] pt-2" />
      <Row
        label="You Will Receive"
        value={`${usdt.toFixed(2)} USDT`}
        highlight
      />
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-[#CFD0D2]">{label}</p>
      <p
        className={`text-sm font-medium ${
          highlight ? "text-[#FFC200]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
