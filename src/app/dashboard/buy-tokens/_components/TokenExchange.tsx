"use client";

import { useState } from "react";
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

export default function TokenExchange() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  // ✅ Fetch stats for min purchase / fees
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await api.get("/dashboard/stats");
      return response.data.payload;
    },
  });

  // ✅ Validation
  const schema = z.object({
    amount: z
      .string()
      .min(1, "Amount is required")
      .refine(
        (v) => (!isNaN(Number(v)) && Number(v) >= stats?.minimumExchange) || 0,
        {
          message: `Minimum ${stats?.minimumExchange} 3TWENTY`,
        }
      ),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const amountValue = watch("amount");

  // 🔁 Exchange mutation
  const exchangeMutation = useMutation<
    { success: boolean; message: string },
    AxiosError<{ message: string }>,
    FormData
  >({
    mutationFn: (data) =>
      api.post("/tokens/exchange", data).then((r) => r.data),
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

  const closeIcon = <span className="mgc_close_line text-white text-[20px]" />;

  return (
    <div className="max-w-2xl mx-auto border border-[#2A2A2A] rounded-lg mb-8">
      {/* 🔔 Confirm Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        center
        closeIcon={closeIcon}
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
          <h2 className="text-xl text-white font-semibold">Confirm Transfer</h2>
          <small className="text-[#E6E6E7]">
            This will move tokens between wallets
          </small>
        </div>

        <div className="p-4 space-y-4">
          <WalletFlow amount={amountValue} />
        </div>

        <div className="p-4">
          <Button
            className="w-full"
            loading={isSubmitting || exchangeMutation.isPending}
            onClick={() => formData && exchangeMutation.mutate(formData)}
          >
            Confirm Transfer
          </Button>
        </div>
      </Modal>

      {/* 📌 Header */}
      <div className="bg-[#13171E] px-5 py-3 rounded-t-lg">
        <h2 className="text-xl text-white font-semibold">Token Exchange</h2>
        <small className="text-[#E6E6E7]">
          Exchange your rewards to 3TWENTY wallet
        </small>
      </div>

      {/* 🧾 Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        <div>
          <Input
            label="Amount (3TWENTY)"
            type="number"
            step="any"
            placeholder="Enter amount"
            {...register("amount")}
            error={errors.amount?.message}
          />
          <p className="text-[#CFD0D2] text-[11px] pt-2">
            MIN: {stats?.minimumExchange} 3TWENTY
          </p>
        </div>

        {/* 🔄 Wallet Flow Preview */}
        <WalletFlow amount={amountValue} />

        <Button type="submit" size="lg" className="w-full">
          Transfer to Token Wallet
        </Button>
      </form>
    </div>
  );
}

/* 🔹 Wallet Flow UI */
function WalletFlow({ amount }: { amount?: string }) {
  return (
    <div className="bg-[#13171E] rounded-lg p-4 text-sm text-[#CFD0D2] space-y-3">
      <div className="flex flex-col items-center gap-1 text-[#FFC200]">
        {amount && (
          <span className="break-all text-center font-semibold">{amount} 3TWENTY</span>
        )}
        <span className="mgc_arrow_down_line"></span>
      </div>

      <div className="text-center font-medium">Token Wallet</div>
    </div>
  );
}

function WalletBox({ title }: { title: string }) {
  return (
    <div className="border border-[#2A2A2A] rounded-lg px-4 py-3 text-center w-[140px] shrink-0">
      <p className="text-sm text-[#CFD0D2] truncate">{title}</p>
    </div>
  );
}
